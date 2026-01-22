import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DocsCardStack from './DocsCardStack';

const meta: Meta<typeof DocsCardStack> = {
  title: 'Docs/DocsCardStack',
  component: DocsCardStack,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DocsCardStack>;

export const Default: Story = {};
