'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { postSymptomForm } from '../actions/symptoms';

export default function useSymptomResubmit() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') ?? 'translate';
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

      const response = await postSymptomForm(formData);
      localStorage.setItem('symptom-result', response);
      localStorage.setItem(
        'written-symptom',
        formData.get('description') as string,
      );
      console.log(response);
      router.push(`/medical/symptoms/result?mode=${mode}`);
    } catch (err) {
      console.error('재제출 실패', err);
      alert('증상 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, handleResubmit };
}
