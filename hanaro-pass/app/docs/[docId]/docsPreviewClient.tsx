'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  fileUrl: string;
  title: string;
};

export default function DocsPreviewClient({ fileUrl, title }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, []);

  const isPdf = useMemo(() => {
    try {
      const pathname = new URL(fileUrl, window.location.origin).pathname;
      return pathname.toLowerCase().endsWith('.pdf');
    } catch {
      return fileUrl?.toLowerCase().endsWith('.pdf');
    }
  }, [fileUrl]);

  if (!fileUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-black/50">서류를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {loading && !error && (
        <div className="absolute inset-0 z-10 grid place-items-center">
          <Loader2 size={20} className="animate-spin text-black/60" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
          <p className="text-black/50">미리보기를 불러오지 못했습니다.</p>
        </div>
      )}

      {isPdf ? (
        <div className="relative h-full w-full p-4">
          <iframe
            src={fileUrl}
            title={title}
            className={[
              'h-full w-full border-none',
              loading ? 'opacity-0' : 'opacity-100',
              'transition-opacity duration-200',
            ].join(' ')}
            onLoad={() => setLoading(false)}
          />
        </div>
      ) : (
        <div className="relative h-full w-full p-4">
          <Image
            src={fileUrl}
            alt="preview"
            fill
            unoptimized
            className={[
              'object-contain',
              loading ? 'opacity-0' : 'opacity-100',
              'transition-opacity duration-200',
            ].join(' ')}
            onLoadingComplete={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
