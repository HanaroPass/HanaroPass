import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DocsCard from './DocsCard';

const meta: Meta<typeof DocsCard> = {
  title: 'Docs/DocsCard',
  component: DocsCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DocsCard>;

export const Opened: Story = {
  args: {
    title: '모바일 외국인 신분증',
    color: 'blueSoft',
    initialOpen: true,
  },
};

export const Closed: Story = {
  args: {
    title: '모바일 외국인 신분증',
    color: 'blueSoft',
    initialOpen: false,
  },
};
