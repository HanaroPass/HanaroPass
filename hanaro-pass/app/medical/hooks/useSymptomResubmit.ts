'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  getTTS,
  parseOutput,
  postSymptomForm,
} from '../actions/symptoms.action';
import type { outputType } from '../symptoms/types';

export default function useSymptomResubmit(reloadTrigger: number) {
  const [isLoading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [writtenSymptom, setWrittenSymptom] = useState('');
  const [result, setResult] = useState<outputType>();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    const parse = async () => {
      reloadTrigger;
      const data = localStorage.getItem('symptom-result');
      if (!data) return;

      try {
        const result = await parseOutput(data);
        setResult(result);
        setWrittenSymptom(result.재출력);
      } catch (e) {
        console.error('증상 결과 파싱 실패', e);
      }
    };
    parse();
  }, [reloadTrigger]);

  const handleResubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const savedImages = localStorage.getItem('symptom-images');
      if (savedImages) {
        const imageDataArray = JSON.parse(savedImages);

        for (const imageData of imageDataArray) {
          const response = await fetch(imageData.base64);
          const blob = await response.blob();
          const file = new File([blob], imageData.name, {
            type: imageData.type,
          });
          formData.append('images', file);
        }
      }

      const { fromCached, response } = await postSymptomForm(formData);
      if (fromCached) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      localStorage.setItem('symptom-result', response);
    } catch (err) {
      console.error('재제출 실패', err);
      alert('증상 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      const text = result?.번역_내용 ?? '';
      const base64 = await getTTS(text);

      const audio = new Audio(`data:audio/mp3;base64,${base64}`);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      await audio.play();
    } catch (e) {
      setIsPlaying(false);
      toast.error('음성 출력에 실패했습니다.');
      console.error('TTS 재생 실패', e);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result?.번역_내용 || '');
      setCopied(true);
      toast.success('복사되었습니다.', { duration: 1500 });
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      toast.error('복사에 실패하였습니다.');
      console.error('클립보드 복사 실패', e);
    }
  };

  return {
    result,
    writtenSymptom,
    copied,
    playAudio,
    handleCopy,
    isLoading,
    handleResubmit,
    mode,
    isPlaying,
  };
}
