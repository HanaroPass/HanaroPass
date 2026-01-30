'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { postSymptomForm } from '../actions/symptoms.action';
import { convertImagesToBase64 } from '../utils/convertImagesToBase64';

export default function useSymptomResult(images: File[]) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') ?? 'translate';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      images.map((file) => formData.append('images', file));

      const imageDataArray = await convertImagesToBase64(images);
      localStorage.setItem('symptom-images', JSON.stringify(imageDataArray));

      const { fromCached, response } = await postSymptomForm(formData);
      console.log(response);
      if (fromCached) {
        await new Promise((r) => setTimeout(r, 2000));
      }

      localStorage.setItem('symptom-result', response);
      router.push(`/medical/symptoms/result?mode=${mode}`);
    } catch (err) {
      console.error('증상 분석 요청 실패', err);
      alert('증상 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
  };
}
