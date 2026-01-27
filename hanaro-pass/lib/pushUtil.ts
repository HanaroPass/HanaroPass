import { saveSubscriptionAction } from '@/app/medical/actions/push.action';

/**
 * VAPID 키 변환 헬퍼 함수
 */
export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

/**
 * 푸시 알림 구독 핵심 로직
 * @returns 'success' | 'denied' | 'error' | 'default'
 */
export async function subscribeUser() {
  const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicVapidKey) {
    console.error('VAPID public key is missing');
    return 'error';
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // 1. 권한 요청 (이미 허용된 상태라면 팝업 없이 바로 진행)
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return permission;

    // 2. 푸시 구독 객체 생성
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // 3. 서버 DB에 저장
    const result = await saveSubscriptionAction(JSON.stringify(subscription));
    return result.success ? 'success' : 'error';
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.warn('[Push] 페이지 이동으로 인해 구독 요청이 중단되었습니다.');
      return 'aborted';
    }
    console.error('[Push] 구독 에러:', error);
    return 'error';
  }
}
