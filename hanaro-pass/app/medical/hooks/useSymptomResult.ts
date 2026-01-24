'use client';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import { postSymptomForm } from '../actions/symptoms';

export default function useSymptomResult() {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isImageCntOK, setImageCntOK] = useState(true);

  const router = useRouter();
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
        localStorage.setItem('symptom-images', JSON.stringify(urls));

        return totalImages;
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    localStorage.setItem(
      'written-symptom',
      formData.get('description') as string,
    );
    const response = await postSymptomForm(formData);

    setLoading(false);
    console.log(response);
    localStorage.setItem('symptom-result', response);

    router.push('/medical/symptoms/result');
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
