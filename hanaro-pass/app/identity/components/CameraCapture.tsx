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
  const streamRef = useRef<MediaStream | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(() => {});
      }
      return stream;
    } catch (error) {
      console.error('카메라 접근 실패:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    let isEffectActive = true;
    let localStream: MediaStream | null = null;

    const init = async () => {
      if (!selectedImage) {
        const stream = await startCamera();
        if (!isEffectActive && stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
          return;
        }

        if (stream) {
          localStream = stream;
        }
      }
    };

    init();

    return () => {
      isEffectActive = false;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
      }
    };
  }, [startCamera, selectedImage]);

  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [selectedImage]);

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
  return (
    <div className="flex flex-col bg-black text-white">
      <div className="mb-12 flex flex-col items-center px-6">
        {selectedImage ? (
          <button
            type="button"
            className="h-72 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl bg-gray-700"
            onClick={handleVideoClick}
            onKeyDown={handleKeyDown}
            aria-label="Change selected ID card image"
          >
            <Image
              src={selectedImage}
              alt="Selected ID card"
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
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              muted
            >
              <track kind="captions" />
            </video>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && onImageSelect) {
              if (selectedImage) URL.revokeObjectURL(selectedImage);
              setSelectedImage(URL.createObjectURL(file));
              onImageSelect(file);
            }
          }}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default CameraCapture;
