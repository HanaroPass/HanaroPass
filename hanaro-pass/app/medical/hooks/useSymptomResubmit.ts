'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getTTS,
  type outputType,
  parseOutput,
  postSymptomForm,
} from '../actions/symptoms.action';

export default function useSymptomResubmit(reloadTrigger: number) {
  const [isLoading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [writtenSymptom, setWrittenSymptom] = useState('');
  const [result, setResult] = useState<outputType>();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    console.log('reloadTrigger:', reloadTrigger);
    const parse = async () => {
      setWrittenSymptom(localStorage.getItem('written-symptom') as string);
      const data = localStorage.getItem('symptom-result');
      if (!data) return;

      try {
        const result = await parseOutput(data);
        setResult(result);
      } catch (e) {
        console.error('증상 결과 파싱 실패', e);
      }
    };
    parse();
  }, [reloadTrigger]);

  const handleResubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    e.preventDefault();
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
      localStorage.setItem(
        'written-symptom',
        formData.get('description') as string,
      );
      console.log(response);
    } catch (err) {
      console.error('재제출 실패', err);
      alert('증상 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async () => {
    const base64 = await getTTS(JSON.stringify(result?.번역_내용));
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.play();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result?.번역_내용 || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
  };
}
