"use client";

import { ReactNode } from "react";

interface FilterPanelLayoutProps {
  title: string;
  children: ReactNode;
}

export default function FilterPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-md">
      {/* 타이틀 */}
      <div className="px-4 pt-4 pb-2 text-sm font-medium text-gray-600">
        {title}
      </div>

      {/* 리스트 */}
      <div className="max-h-47.5 overflow-y-auto px-2 pb-3">
        {children}
      </div>
    </div>
  );
}

