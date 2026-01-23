'use client';

import { ChevronLeft, Delete } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/header/Header';

interface PinInputProps {
  onSuccessAction: () => void;
  onCloseAction: () => void;
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PinInput({
  onSuccessAction,
  onCloseAction,
}: PinInputProps) {
  const [pin, setPin] = useState('');

  const [digits, setDigits] = useState<string[]>(() =>
    shuffle(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
  );

  useEffect(() => {
    if (pin.length !== 6) return;

    // TODO: PIN 어떻게 할지 정하기
    if (pin === '111111') {
      onSuccessAction();
    } else {
      alert('잘못된 번호입니다.');
      setPin('');
    }
  }, [pin, onSuccessAction]);

  const onPressNum = (num: string) => {
    setPin((p) => (p.length >= 6 ? p : p + num));
  };

  const onDelete = () => {
    setPin((p) => p.slice(0, -1));
  };

  const onReorder = () => {
    setDigits((prev) => shuffle(prev));
  };

  const mainDigits = digits.slice(0, 9);
  const centerDigit = digits[9];

  const keys = useMemo(
    () => [...mainDigits, 'reorder', centerDigit, 'delete'] as const,
    [mainDigits, centerDigit],
  );

  return (
    <div
      className="app-shell fixed inset-0 z-100 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="PIN 입력"
    >
      <Header
        title="PIN"
        leftElement={
          <button
            type="button"
            onClick={onCloseAction}
            aria-label="PIN 입력창 닫기"
          >
            <ChevronLeft size={28} className="text-black-800" />
          </button>
        }
      />

      <div className="flex flex-1 flex-col items-center pt-20">
        <p className="mb-10 text-gray-600 text-lg">PIN 번호를 입력해주세요</p>

        <div className="mb-20 flex gap-4">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={`pin-dot-${idx}`}
              className={`h-3.5 w-3.5 rounded-full border transition-all ${
                pin.length > idx
                  ? 'scale-110 border-green-ez bg-green-ez'
                  : 'border-gray-200 bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="grid w-full max-w-xs grid-cols-3 gap-y-10 text-center">
          {keys.map((k) => {
            if (k === 'reorder') {
              return (
                <button
                  key="reorder"
                  type="button"
                  onClick={onReorder}
                  className="font-bold text-green-ez text-sm active:opacity-30"
                >
                  재배열
                </button>
              );
            }

            if (k === 'delete') {
              return (
                <button
                  key="delete"
                  type="button"
                  onClick={onDelete}
                  className="flex items-center justify-center active:opacity-30"
                  aria-label="한 글자 삭제"
                >
                  <Delete size={24} className="text-green-ez" />
                </button>
              );
            }

            return (
              <button
                key={`numpad-${k}`}
                type="button"
                onClick={() => onPressNum(k)}
                className="font-semibold text-2xl text-black-800 active:opacity-30"
                aria-label={`${k} 입력`}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
