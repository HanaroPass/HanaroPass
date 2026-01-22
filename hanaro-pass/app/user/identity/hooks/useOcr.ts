import { FilesetResolver, TextRecognizer } from '@mediapipe/tasks-vision';
import { useRef } from 'react';

export function useOcr() {
  const recognizerRef = useRef<TextRecognizer | null>(null);

  // OCR 엔진 초기화 (최초 1회)
  async function initOcr() {
    if (!recognizerRef.current) {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm',
      );
      recognizerRef.current = await TextRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-tasks/text_recognizer/latin_ocr_v2.tflite',
        },
        // 한글 등 다국어 모델은 별도 경로 필요
      });
    }
  }

  // 이미지에서 텍스트 추출
  async function recognizeText(
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  ) {
    await initOcr();
    if (!recognizerRef.current) return '';
    const result = await recognizerRef.current.recognize(image);
    return result.text || '';
  }

  return { recognizeText };
}
