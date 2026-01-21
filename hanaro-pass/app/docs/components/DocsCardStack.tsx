'use client';

import { useState } from 'react';
import DocsCard from './DocsCard';
import { DOCS_CARD_ITEMS } from '../constants/docsCardItem';
import { cn } from '@/lib/utils';

export default function DocsCardStack() {
  const [openId, setOpenId] = useState<string>('');

  return (
    <div className="flex flex-col">
      {DOCS_CARD_ITEMS.map((item, idx) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn('relative', idx === 0 ? 'mt-0' : '-mt-6')}
          >
            <DocsCard
              title={item.title}
              color={item.color}
              initialOpen={isOpen}
              onToggle={() =>
                setOpenId((prev) => (prev === item.id ? '' : item.id))
              }
            />
          </div>
        );
      })}
    </div>
  );
}
