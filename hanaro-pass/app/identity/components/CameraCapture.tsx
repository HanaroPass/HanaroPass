'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { IdentityType } from '../IdentityPageClient';

type CameraCaptureProps = {
  type?: IdentityType | null;
  onClick?: () => void;
  onImageSelect?: (file: File) => void;
};

const CameraCapture = ({
  type: _type,
  onClick,
  onImageSelect,
}: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && onImageSelect) {
        // 이미지 미리보기를 위한 URL 생성
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        onImageSelect(file);
      }
    },
    [onImageSelect],
  );

  const handleVideoClick = useCallback(() => {
    if (onImageSelect && fileInputRef.current) {
      // 이미지 첨부 모드
      fileInputRef.current.click();
    } else if (onClick) {
      // 기존 onClick 동작 (바텀시트)
      onClick();
    }
  }, [onClick, onImageSelect]);
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleVideoClick();
    }
  }, [handleVideoClick]);
  const startCamera = useCallback(async () => {
    // 이미 선택된 이미지가 있으면 카메라를 시작하지 않음
    if (selectedImage) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // 후면 카메라 우선
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(() => {
          // Autoplay 실패 시 사용자 상호작용 필요
        });
      }
    } catch (error) {
      console.error('카메라 접근 실패:', error);
      // TODO: 사용자에게 카메라 권한 요청 실패 알림 표시
    }
  }, [selectedImage]);

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
      }
      // 컴포넌트 언마운트 시 이미지 URL 해제
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [startCamera, selectedImage]);

  return (
    <div className="flex flex-col bg-black text-white">
      <div className="mb-12 flex flex-col items-center px-6">
        {selectedImage ? (
          <button
            type="button"
            className="h-72 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl bg-gray-700 p-0"
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
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
            >
              <track kind="captions" />
            </video>
          </button>
        )}

        {/* Hidden file input for image selection */}
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
