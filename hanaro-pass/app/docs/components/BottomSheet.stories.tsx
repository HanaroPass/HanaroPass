import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Docs/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <BottomSheet isOpen={open} onClose={() => setOpen(false)}>
        <ul className="space-y-4 py-4">
          <li className="rounded-lg bg-gray-100 p-4">모바일 여권</li>
          <li className="rounded-lg bg-gray-100 p-4">외국인 신분증</li>
          <li className="rounded-lg bg-gray-100 p-4">학생증</li>
        </ul>
      </BottomSheet>
    );
  },
};
