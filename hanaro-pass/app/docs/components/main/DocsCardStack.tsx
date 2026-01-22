'use client';

import { useMemo, useState } from 'react';
import DocsCard from './DocsCard';
import { cn } from '@/lib/utils';
import type { CardColor } from '../../constants/cardColor';

interface DocItem {
  id: string;
  title: string;
  color: CardColor;
}

type DocCardProps = {
  userName: string;
  items: DocItem[];
};

export default function DocsCardStack({ userName, items }: DocCardProps) {
  const [openId, setOpenId] = useState('');
  const openIndex = useMemo(
    () => items.findIndex((v) => v.id === openId),
    [items, openId],
  );
  return (
    <div className="flex flex-col">
      {items.map((item, idx) => {
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
              userName={userName}
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
