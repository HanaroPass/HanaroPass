import type { Meta, StoryObj } from '@storybook/react';
import type { StatusType } from '../constants/statusConfig';
import StatusBadge from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Medical/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  args: {
    status: 'PENDING' as StatusType,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['PENDING', 'APPROVED', 'REJECTED'] as StatusType[],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Pending: Story = {
  args: { status: 'PENDING' as StatusType },
};

export const Approved: Story = {
  args: { status: 'APPROVED' as StatusType },
};

export const Rejected: Story = {
  args: { status: 'REJECTED' as StatusType },
};

export const Playground: Story = {};
