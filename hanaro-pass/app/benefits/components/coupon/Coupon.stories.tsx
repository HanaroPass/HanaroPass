import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Coupon from './Coupon';

const meta = {
  title: 'Components/Coupon',
  component: Coupon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Coupon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
