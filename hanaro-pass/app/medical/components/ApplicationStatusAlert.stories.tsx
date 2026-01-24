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
    status: 'PENDING' as StatusType,
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

export const PENDING: Story = {
  args: {
    status: 'PENDING' as StatusType,
  },
};

export const APPROVED: Story = {
  args: {
    status: 'APPROVED' as StatusType,
  },
};

export const REJECTED: Story = {
  args: {
    status: 'REJECTED' as StatusType,
  },
};

export const AdminView: Story = {
  args: {
    status: 'PENDING' as StatusType,
    isAdmin: true,
  },
};

export const Playground: Story = {};
