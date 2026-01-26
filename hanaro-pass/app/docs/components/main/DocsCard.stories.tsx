import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DocsCard from './DocsCard';

const meta: Meta<typeof DocsCard> = {
  title: 'Docs/DocsCard',
  component: DocsCard,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DocsCard>;

export const Interactive: Story = {
  args: {
    title: '모바일 외국인 등록증',
    color: 'blueSoft',
    isOpen: true,
    userName: 'somi',
  },
  render: (args) => {
    const [open, setOpen] = useState(args.isOpen);
    return (
      <DocsCard {...args} isOpen={open} onToggle={() => setOpen((v) => !v)} />
    );
  },
};
