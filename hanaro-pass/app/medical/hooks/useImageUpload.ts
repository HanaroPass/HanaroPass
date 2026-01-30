'use client';
import { type ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

export function useImageUpload(limit = 3) {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newImages = Array.from(e.target.files);
    const duplicates = newImages.filter((i) =>
      images.some((img) => img.name === i.name && img.size === i.size),
    );

    if (duplicates.length > 0) {
      toast.error('이미 첨부된 사진입니다.');
    }

    const nonDuplicates = newImages.filter(
      (i) => !images.some((img) => img.name === i.name && img.size === i.size),
    );
    const total = [...images, ...nonDuplicates];

    if (total.length > limit) {
      toast.error('사진은 3개까지만 첨부할 수 있습니다.');
      return;
    }

    imageUrls.forEach(URL.revokeObjectURL);

    const sliced = total.slice(0, limit);
    setImages(sliced);
    setImageUrls(sliced.map((i) => URL.createObjectURL(i)));

    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newUrls = [...imageUrls];

    URL.revokeObjectURL(newUrls[index]);

    newImages.splice(index, 1);
    newUrls.splice(index, 1);

    setImages(newImages);
    setImageUrls(newUrls);
  };

  const clearImages = () => {
    imageUrls.forEach(URL.revokeObjectURL);
    setImages([]);
    setImageUrls([]);
  };

  return { images, imageUrls, handleImages, removeImage, clearImages };
}
