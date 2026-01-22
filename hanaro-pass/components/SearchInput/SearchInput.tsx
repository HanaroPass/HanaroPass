'use client';

import { Search, XCircle } from 'lucide-react';
import { useRef, useState } from 'react';

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput({
  placeholder = '내용을 입력하세요',
  onChange,
  value: controlledValue,
  defaultValue,
  ...props
}: SearchInputProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? '',
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    const el = inputRef.current;
    if (!el) return;

    el.value = '';

    if (!isControlled) {
      setUncontrolledValue('');
    }

    el.focus();
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };

  return (
    <div className="flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-3">
      <Search size={20} className="shrink-0 text-black-400" />

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-base text-black-900 outline-none placeholder:text-black-400"
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="text-black-400 transition-colors hover:text-black-600"
          aria-label="입력 내용 삭제"
        >
          <XCircle
            size={20}
            className="cursor-pointer fill-black-400 text-gray-200"
          />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
