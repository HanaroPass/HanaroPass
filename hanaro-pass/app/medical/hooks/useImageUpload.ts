'use client';
import { ChangeEvent, useState } from 'react';

export function useImageUpload(limit = 3) {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isImageCntOK, setImageCntOK] = useState(true);

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newImages = Array.from(e.target.files);
    const total = [...images, ...newImages];

    if (total.length > limit) {
      setImageCntOK(false);
      return;
    }

    setImageCntOK(true);

    imageUrls.forEach(URL.revokeObjectURL);

    const sliced = total.slice(0, limit);
    setImages(sliced);
    setImageUrls(sliced.map((i) => URL.createObjectURL(i)));
  };

  const clearImages = () => {
    imageUrls.forEach(URL.revokeObjectURL);
    setImages([]);
    setImageUrls([]);
  };

  return { images, imageUrls, isImageCntOK, handleImages, clearImages };
}
