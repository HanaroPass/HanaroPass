'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import { postSymptomForm } from '../actions/symptoms';

export default function useSymptomResult() {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isImageCntOK, setImageCntOK] = useState(true);

  const router = useRouter();

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') ?? 'translate';
  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);

      if (images.length + newImages.length > 3) {
        setImageCntOK(false);
      } else setImageCntOK(true);

      setImages(() => {
        const totalImages = [...images, ...newImages].slice(0, 3);

        const urls = totalImages.map((i) => URL.createObjectURL(i));
        setImageUrls(urls);

        return totalImages;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      localStorage.setItem(
        'written-symptom',
        formData.get('description') as string,
      );

      const imageDataArray = await Promise.all(
        images
          .filter((image) => image && image.size > 0)
          .map(async (image) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  name: image.name,
                  type: image.type,
                  base64: reader.result,
                });
              };
              reader.readAsDataURL(image);
            });
          }),
      );
      localStorage.setItem('symptom-images', JSON.stringify(imageDataArray));
      const response = await postSymptomForm(formData);
      console.log(response);
      localStorage.setItem('symptom-result', response);
      router.push(`/medical/symptoms/result?mode=${mode}`);
    } catch (err) {
      console.error('증상 분석 요청 실패', err);
      alert('증상 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const clearImages = () => {
    setImages([]);
    imageUrls.forEach((i) => {
      URL.revokeObjectURL(i);
    });
    setImageUrls([]);
  };

  return {
    images,
    imageUrls,
    isLoading,
    isImageCntOK,
    handleImages,
    handleSubmit,
    clearImages,
  };
}
