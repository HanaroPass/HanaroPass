'use client';

import { Search, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput({
  placeholder = '내용을 입력하세요',
  onChange,
  value: propsValue,
  defaultValue,
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(
    propsValue ?? defaultValue ?? '',
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (propsValue !== undefined) {
      setInternalValue(propsValue);
    }
  }, [propsValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (propsValue === undefined) {
      setInternalValue(e.target.value);
    }
    if (onChange) onChange(e);
  };

  const handleClear = () => {
    setInternalValue('');
    if (inputRef.current) {
      inputRef.current.focus();

      if (onChange) {
        const event = {
          target: { ...inputRef.current, value: '' },
          currentTarget: { ...inputRef.current, value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-3">
      <Search size={20} className="shrink-0 text-black-400" />

      <input
        ref={inputRef}
        type="search"
        value={internalValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-base text-black-900 outline-none placeholder:text-black-400"
        {...props}
      />

      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          className="text-black-400 transition-colors hover:text-black-600"
          aria-label="입력 내용 삭제"
        >
          <XCircle
            size={20}
            fill="currentColor"
            className="cursor-pointer fill-black-400 text-gray-200"
          />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
