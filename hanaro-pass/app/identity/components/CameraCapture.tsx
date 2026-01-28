'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { IdentityType } from '../IdentityPageClient';

type CameraCaptureProps = {
  type?: IdentityType | null;
  onClick?: () => void;
  onImageSelect?: (file: File) => void;
};

const CameraCapture = ({ onClick, onImageSelect }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file && onImageSelect) {
        if (selectedImage) {
          URL.revokeObjectURL(selectedImage);
        }

        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        onImageSelect(file);
      }
    },
    [onImageSelect, selectedImage],
  );

  const handleVideoClick = useCallback(() => {
    if (onImageSelect && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (onClick) {
      onClick();
    }
  }, [onClick, onImageSelect]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleVideoClick();
      }
    },
    [handleVideoClick],
  );

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(() => {});
      }
    } catch (error) {
      console.error('카메라 접근 실패:', error);
    }
  }, []);

  useEffect(() => {
    if (!selectedImage) {
      startCamera();
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();

        for (const track of tracks) {
          track.stop();
        }
      }
    };
  }, [startCamera, selectedImage]);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <div className="flex flex-col bg-black text-white">
      <div className="mb-12 flex flex-col items-center px-6">
        {selectedImage ? (
          <button
            type="button"
            className="p h-72 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl bg-gray-700"
            onClick={handleVideoClick}
            onKeyDown={handleKeyDown}
            aria-label="Change selected document image"
          >
            <Image
              src={selectedImage}
              alt="Selected document"
              width={400}
              height={288}
              className="h-full w-full object-cover"
              unoptimized
              priority
            />
          </button>
        ) : (
          <button
            type="button"
            className="h-72 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl bg-gray-700 p-0"
            onClick={handleVideoClick}
            onKeyDown={handleKeyDown}
            aria-label="Start camera or select image"
          >
            <video ref={videoRef} className="h-full w-full object-cover">
              <track kind="captions" />
            </video>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default CameraCapture;
