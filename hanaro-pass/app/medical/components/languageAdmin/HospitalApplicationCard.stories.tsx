import type { Meta, StoryObj } from '@storybook/react';
import type { StatusType } from '../../constants/statusConfig';
import { HospitalApplicationCard } from './HospitalApplicationCard';

const meta: Meta<typeof HospitalApplicationCard> = {
  title: 'Medical/LanguageAdmin/HospitalApplicationCard',
  component: HospitalApplicationCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 1,
    name: '강남 병원',
    status: 'pending' as StatusType,
    langCount: 3,
    languages: ['영어', '중국어', '일본어'],
    date: '2026.01.19',
  },
};

export default meta;

type Story = StoryObj<typeof HospitalApplicationCard>;

export const Pending: Story = {};

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

export const ManyLanguages: Story = {
  args: {
    langCount: 6,
    languages: ['영어', '중국어', '일본어', '베트남어', '태국어', '몽골어'],
  },
};
