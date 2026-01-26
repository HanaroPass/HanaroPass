'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';

// 인식 결과 데이터의 타입 정의
interface OCRResult {
  id: string;
  text: string;
}

export default function TesseractScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<OCRResult[]>([]); // 고유 ID를 포함한 객체 배열로 변경
  const [status, setStatus] = useState('카메라 연결...');
  const [isScanning, setIsScanning] = useState(false);

  // 카메라 시작 로직
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStatus('✅ 신분증을 비춰주세요!');
      }
    } catch {
      setStatus('❌ 카메라 권한이 필요합니다.');
    }
  }, []);

  // 공통 OCR 처리 함수 (canvas 또는 file)
  const runOCR = async (image: HTMLCanvasElement | File) => {
    setIsScanning(true);
    setStatus('⚡ 텍스트 읽는 중...');
    try {
      const { data } = await Tesseract.recognize(image, 'kor+eng', {
        logger: (m) => console.log(m),
      });
      console.log('Tesseract data:', data);
      const recognizedData = data as any;
      const words = recognizedData.words || [];
      let lines: OCRResult[] = words
        .filter((w: any) => w.confidence > 0)
        .map((w: any) => ({
          id: `ocr-${Math.random().toString(36).substring(2, 11)}`,
          text: w.text.trim(),
        }))
        .filter((item: OCRResult) => item.text.length > 1)
        .slice(0, 15);
      if (
        lines.length === 0 &&
        typeof data.text === 'string' &&
        data.text.trim().length > 0
      ) {
        lines = [
          {
            id: `ocr-${Math.random().toString(36).substring(2, 11)}`,
            text: data.text.trim(),
          },
        ];
      }
      setResult(lines);
      setStatus(`인식 완료 (신뢰도: ${Math.round(data.confidence)}%)`);
    } catch (e) {
      console.error('OCR 에러:', e);
      setStatus('인식에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsScanning(false);
    }
  };

  // 카메라 프레임 OCR
  const scanImage = async () => {
    if (!canvasRef.current || !videoRef.current?.videoWidth) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    ctx.filter = 'contrast(1.3) brightness(1.1)';
    await runOCR(canvas);
  };

  // 파일 업로드 OCR
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await runOCR(file);
  };

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-center font-bold text-3xl text-emerald-600">
        🔍 신분증 OCR 스캐너
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 왼쪽: 카메라 영역 */}
        <div className="flex flex-col gap-4 rounded-3xl bg-gray-50 p-4 shadow-xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border-4 border-emerald-400 bg-black">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              muted
            />
          </div>
          <canvas ref={canvasRef} className="hidden" />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={scanImage}
                disabled={isScanning}
                className="flex-1 rounded-xl bg-emerald-500 py-4 font-bold text-white transition-all hover:bg-emerald-600 disabled:opacity-50"
              >
                {isScanning ? '인식 중...' : '📸 스캔하기'}
              </button>
              <button
                type="button"
                onClick={() => setResult([])}
                className="rounded-xl bg-gray-200 px-6 font-semibold text-gray-700 hover:bg-gray-300"
              >
                초기화
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isScanning}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm file:mr-3 file:rounded-lg file:border-none file:bg-emerald-100 file:px-4 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-200"
            />
          </div>
        </div>

        {/* 오른쪽: 결과 출력 영역 */}
        <div className="flex flex-col gap-4 rounded-3xl border-2 border-emerald-100 bg-white p-6 shadow-lg">
          <p className="text-center font-bold text-emerald-700">{status}</p>

          <div className="max-h-[400px] flex-1 space-y-2 overflow-y-auto">
            {result.length > 0 ? (
              result.map((item) => (
                <button
                  key={item.id} // 고유 ID를 key로 사용 (경고 해결)
                  type="button"
                  className="w-full rounded-lg border border-gray-100 bg-gray-50 p-3 text-left text-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                  onClick={() => {
                    navigator.clipboard.writeText(item.text);
                    alert('복사되었습니다!');
                  }}
                >
                  <code className="font-mono">{item.text}</code>
                </button>
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400 text-sm italic">
                스캔 결과가 여기에 표시됩니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
