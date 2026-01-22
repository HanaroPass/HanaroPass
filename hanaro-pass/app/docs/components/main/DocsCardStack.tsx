'use client';

import { useState } from 'react';
import DocsCard from './DocsCard';
import { DOCS_CARD_ITEMS } from '../../constants/docsCardItem';
import { cn } from '@/lib/utils';

export default function DocsCardStack() {
  const [openId, setOpenId] = useState('');
  const openIndex = DOCS_CARD_ITEMS.findIndex((v) => v.id === openId);

  return (
    <div className="flex flex-col">
      {DOCS_CARD_ITEMS.map((item, idx) => {
        const isOpen = openId === item.id;

        const extraOffset =
          openIndex !== -1 && idx > openIndex
            ? 'translate-y-8'
            : 'translate-y-0';

        return (
          <div
            key={item.id}
            className={cn(
              'relative transition-transform duration-300 ease-in-out',
              idx === 0 ? 'mt-0' : '-mt-13',
              extraOffset,
            )}
          >
            <DocsCard
              docId={item.id}
              title={item.title}
              color={item.color}
              isOpen={isOpen}
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
