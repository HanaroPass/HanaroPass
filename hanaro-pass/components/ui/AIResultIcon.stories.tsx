import type { Meta, StoryObj } from '@storybook/react';
import AIResultIcon from './AIResultIcon';

const meta: Meta<typeof AIResultIcon> = {
  title: 'Icon/AIResultIcon',
  component: AIResultIcon,
};

export default meta;
type Story = StoryObj<typeof AIResultIcon>;

export const Large: Story = {
  args: { size: 'lg' },
};

export const Small: Story = {
  args: { size: 'sm' },
};
