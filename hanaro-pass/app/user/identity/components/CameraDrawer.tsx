import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { useOcr } from '../hooks/useOcr';

interface CameraDrawerProps {
  open: boolean;
  onClose: () => void;
  type?: 'passport' | 'alien' | null;
}

const CameraDrawer: FC<CameraDrawerProps> = ({ open, onClose, type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { recognizeText } = useOcr();
  const [ocrResult, setOcrResult] = useState('');
  const [error, setError] = useState('');

  // 카메라 시작
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

  // 촬영 및 OCR
  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);
    const text = await recognizeText(canvasRef.current);
    setOcrResult(text);
  };

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      // 창 닫힐 때 카메라 정지
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
        videoRef.current.srcObject = null;
      }
      setOcrResult('');
      setError('');
    }
  }, [open, startCamera]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#111',
          borderRadius: 16,
          padding: 24,
          width: 360,
          color: '#fff',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: '#fff',
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
          }}
        >
          ×
        </button>
        <h2 style={{ textAlign: 'center', marginBottom: 16 }}>
          {type === 'passport'
            ? '여권 등록'
            : type === 'alien'
              ? '외국인등록증 등록'
              : '신분증 등록'}
        </h2>
        <p
          style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 16 }}
        >
          신분증 앞면을 시각 영역에 맞추면
          <br />
          자동으로 촬영됩니다.
        </p>
        <video
          ref={videoRef}
          width={320}
          height={240}
          style={{ background: '#333', borderRadius: 12 }}
        >
          <track kind="captions" />
        </video>
        <canvas
          ref={canvasRef}
          width={320}
          height={240}
          style={{ display: 'none' }}
        />
        <div style={{ margin: '16px 0', fontSize: 14, color: '#ccc' }}>
          단순하고 어두운 배경 위에서 촬영하면 인식률이 더 좋아집니다.
          <br />빛 반사가 없는 곳에서 촬영하세요.
          <br />
          살짝 기울여 촬영하시면 더욱 좋습니다.
        </div>
        <button
          onClick={handleCapture}
          style={{
            width: '100%',
            padding: 12,
            background: '#01a5ac',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          촬영 및 OCR
        </button>
        {ocrResult && (
          <div
            style={{
              marginTop: 16,
              background: '#222',
              padding: 12,
              borderRadius: 8,
              color: '#0f0',
            }}
          >
            <b>추출된 텍스트:</b>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
              {ocrResult}
            </div>
          </div>
        )}
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  );
};

export default CameraDrawer;
