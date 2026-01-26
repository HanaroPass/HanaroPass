'use client';
import { useCallback, useEffect, useRef } from 'react';
import type { IdentityType } from '../IdentityPageClient';

type CameraCaptureProps = {
  type?: IdentityType | null;
  onClick?: () => void;
};

const CameraCapture = ({ type: _type, onClick }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // 후면 카메라 우선
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(() => {
          // Autoplay 실패 시 사용자 상호작용 필요
        });
      }
    } catch (error) {
      console.error('카메라 접근 실패:', error);
      // TODO: 사용자에게 카메라 권한 요청 실패 알림 표시
    }
  }, []);

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
      }
    };
  }, [startCamera]);

  return (
    <div className="flex flex-col bg-black text-white">
      <div className="mb-12 flex flex-col items-center px-6">
        <video
          ref={videoRef}
          className="h-72 w-full max-w-sm cursor-pointer rounded-xl bg-gray-700 object-cover"
          onClick={onClick}
        >
          <track kind="captions" />
        </video>
      </div>
    </div>
  );
};

export default CameraCapture;
