import { type FC, useCallback, useEffect, useRef, useState } from 'react';

interface CameraCaptureProps {
  type?: 'passport' | 'alien' | null;
}

const CameraCapture: FC<CameraCaptureProps> = ({ type: _type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState('');

  const startCamera = useCallback(async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setError('카메라 접근에 실패했습니다.');
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
    <div
      style={{
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 24px',
          marginBottom: '24px',
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: '100%',
            maxWidth: 400,
            height: 300,
            background: '#333',
            borderRadius: 12,
            objectFit: 'cover',
          }}
        >
          <track kind="captions" />
        </video>
      </div>

      <div style={{ padding: '0 24px 24px 24px' }}>
        {error && (
          <div
            style={{
              color: 'red',
              textAlign: 'center',
              fontSize: 14,
              marginTop: 8,
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
