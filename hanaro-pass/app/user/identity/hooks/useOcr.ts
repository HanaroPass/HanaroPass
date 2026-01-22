import { useCallback, useRef } from 'react';

// 임시로 기본 OCR 구현 (실제 mediapipe 대신)
export function useOcr() {
  const isInitialized = useRef(false);

  // OCR 엔진 초기화 (최초 1회)
  const initOcr = useCallback(async () => {
    if (!isInitialized.current) {
      // TODO: 실제 mediapipe 연동 시 여기에 구현
      console.log('OCR 엔진 초기화 중...');
      isInitialized.current = true;
    }
  }, []);

  // 이미지에서 텍스트 추출
  const recognizeText = useCallback(
    async (image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => {
      await initOcr();

      // 임시 구현: 실제로는 mediapipe로 OCR 수행
      console.log('OCR 수행 중...', image);

      // 테스트용 더미 텍스트 반환
      return '임시 OCR 결과: 신분증 텍스트 추출됨';
    },
    [initOcr],
  );

  return { recognizeText };
}
