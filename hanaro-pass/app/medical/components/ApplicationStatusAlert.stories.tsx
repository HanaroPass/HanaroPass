import type { Meta, StoryObj } from '@storybook/react';
import type { StatusType } from '@/app/medical/constants/statusConfig';
import { ApplicationStatusAlert } from './ApplicationStatusAlert';

const meta: Meta<typeof ApplicationStatusAlert> = {
  title: 'Medical/ApplicationStatusAlert',
  component: ApplicationStatusAlert,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    status: 'pending' as StatusType,
    isAdmin: false,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['PENDING', 'APPROVED', 'REJECTED'] as StatusType[],
    },
    isAdmin: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ApplicationStatusAlert>;

export const Pending: Story = {
  args: {
    status: 'pending' as StatusType,
  },
};

export const Approved: Story = {
  args: {
    status: 'approved' as StatusType,
  },
};

export const Rejected: Story = {
  args: {
    status: 'rejected' as StatusType,
  },
};

export const AdminView: Story = {
  args: {
    status: 'pending' as StatusType,
    isAdmin: true,
  },
};

export const Playground: Story = {};
