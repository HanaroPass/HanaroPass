import type { Meta, StoryObj } from '@storybook/react';
import EmergencyBadge from './EmergencyBadge';

const meta: Meta<typeof EmergencyBadge> = {
  title: 'Medical/EmergencyBadge',
  component: EmergencyBadge,
};

export default meta;
type Story = StoryObj<typeof EmergencyBadge>;

export const Low: Story = {
  args: { value: '낮음' },
};

export const Mid: Story = {
  args: { value: '중간' },
};

export const High: Story = {
  args: { value: '높음' },
};

export const Extreme: Story = {
  args: { value: '매우 높음' },
};
