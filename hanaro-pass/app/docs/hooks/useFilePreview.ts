'use client';

import { useEffect, useState } from 'react';

// 파일 업로드 시 파일 크기 검증
// 미리보기용 blob url 생성/해제
// 이미지 or pdf 타입 판별
export function useFilePreview() {
  const maxSizeBytes = 5 * 1024 * 1024; //5MB : 파일 크기 제한

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const isPdf = file?.type === 'application/pdf';
  const isImage = !!file?.type?.startsWith('image/');

  const setSelectedFile = (selected: File | null) => {
    if (selected && selected.size > maxSizeBytes) {
      return {
        ok: false as const,
        error: '파일 크기는 5MB를 초과할 수 없습니다.',
      };
    }
    setFile(selected);
    return { ok: true as const };
  };

  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return {
    file,
    previewUrl,
    isPdf,
    isImage,
    setSelectedFile,
    clear: () => setFile(null),
  };
}
