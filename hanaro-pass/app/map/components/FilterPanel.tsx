'use client';

import type { ReactNode } from 'react';

type FilterPanelProps = {
  title: string;
  children: ReactNode;
};

export default function FilterPanel({ title, children }: FilterPanelProps) {
  return (
    <div className="rounded-2xl bg-white shadow-md">
      <div className="px-4 pt-4 pb-2 font-medium text-gray-600 text-sm">
        {title}
      </div>

      <div className="max-h-47.5 overflow-y-auto px-2 pb-3">{children}</div>
    </div>
  );
}
