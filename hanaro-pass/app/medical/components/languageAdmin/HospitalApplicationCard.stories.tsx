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
    status: 'PENDING' as StatusType,
    langCount: 3,
    languages: [
      { id: 'en', name: '영어', flag: '🇺🇸' },
      { id: 'cn', name: '중국어', flag: '🇨🇳' },
      { id: 'jp', name: '일본어', flag: '🇯🇵' },
    ],
    date: '2026.01.19',
  },
};

export default meta;

type Story = StoryObj<typeof HospitalApplicationCard>;

export const PENDING: Story = {};

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

export const ManyLanguages: Story = {
  args: {
    langCount: 6,
    languages: [
      { id: 'en', name: '영어', flag: '🇺🇸' },
      { id: 'cn', name: '중국어', flag: '🇨🇳' },
      { id: 'jp', name: '일본어', flag: '🇯🇵' },
      { id: 'vn', name: '베트남어', flag: '🇻🇳' },
      { id: 'th', name: '태국어', flag: '🇹🇭' },
      { id: 'mn', name: '몽골어', flag: '🇲🇳' },
    ],
  },
};
