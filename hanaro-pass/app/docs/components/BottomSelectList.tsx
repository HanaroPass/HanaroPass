'use client';

import { ChevronRight, CreditCard } from 'lucide-react';
import type { DocsCardItem } from '../constants/docsCardItem';

type DocsSelectListProps = {
  items: DocsCardItem[];
  onSelect: (id: DocsCardItem['id']) => void;
};

export default function DocsSelectList({
  items,
  onSelect,
}: DocsSelectListProps) {
  return (
    <ul className="divide-y divide-black/5">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className="flex w-full items-center gap-4 py-4 text-left active:opacity-70"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-black/5">
              <CreditCard size={25} className="text-green-ez" />
            </div>
            {/* 서류 이름 */}
            <p className="flex-1 font-medium font-sans text-[16px] text-black-900">
              {item.title}
            </p>
            <ChevronRight size={22} className="text-black/40" />
          </button>
        </li>
      ))}
    </ul>
  );
}
