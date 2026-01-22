import { type FC, useCallback, useEffect, useRef } from 'react';

interface CameraCaptureProps {
  type?: 'passport' | 'alien' | null;
}

const CameraCapture: FC<CameraCaptureProps> = ({ type: _type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('카메라 접근 실패:', error);
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
          className="h-72 w-full max-w-sm rounded-xl bg-gray-700 object-cover"
        >
          <track kind="captions" />
        </video>
      </div>
    </div>
  );
};

export default CameraCapture;
