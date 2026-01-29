import { useCallback, useRef } from 'react';

export function useOcr() {
  const isInitialized = useRef(false);

  const recognizeText = useCallback(
    async (_image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => {
      if (!isInitialized.current) {
        isInitialized.current = true;
      }
      return '임시 OCR 결과';
    },
    [],
  );

  return { recognizeText };
}
