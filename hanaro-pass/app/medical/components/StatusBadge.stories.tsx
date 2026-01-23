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
    status: 'pending' as StatusType,
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
  args: { status: 'pending' as StatusType },
};

export const Approved: Story = {
  args: { status: 'approved' as StatusType },
};

export const Rejected: Story = {
  args: { status: 'rejected' as StatusType },
};

export const Playground: Story = {};
