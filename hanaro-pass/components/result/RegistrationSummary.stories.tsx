import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from '@/app/medical/components/StatusBadge';
import RegistrationSummary from './RegistrationSummary';

const meta: Meta<typeof RegistrationSummary> = {
  title: 'Components/RegistrationSummary',
  component: RegistrationSummary,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '등록 신청이 완료되었습니다.',
    description:
      '관리자가 확인 후 승인 처리됩니다.\n승인까지 1-2 영업일이 소요될 수 있습니다.',
    items: [
      { label: '병원 정보', value: '강남 병원' },
      { label: '진료 가능 언어', value: '중국어 (中文)' },
      { label: '처리 상태', value: <StatusBadge status="PENDING" /> },
    ],
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    items: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof RegistrationSummary>;

export const Default: Story = {};

export const APPROVED: Story = {
  args: {
    title: '승인이 완료되었습니다.',
    description:
      '승인 후에는 외국인 환자가 귀하의 병원 정보를 확인할 수 있습니다.',
    items: [
      { label: '병원 정보', value: '강남 병원' },
      { label: '진료 가능 언어', value: '영어 (English)' },
      { label: '처리 상태', value: <StatusBadge status="APPROVED" /> },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    title: '등록 신청이 완료되었습니다.',
    description: '입력하신 정보를 확인해주세요.',
    items: [
      { label: '병원 정보', value: '강남 병원' },
      { label: '주소', value: '서울특별시 강남구 테헤란로 123' },
      { label: '진료 가능 언어', value: '영어, 중국어' },
      { label: '신청 일시', value: '2026. 01. 19. 09:43' },
      { label: '처리 상태', value: <StatusBadge status="PENDING" /> },
    ],
  },
};

export const LongText: Story = {
  args: {
    title: '등록 신청이 완료되었습니다.\n승인까지 잠시만 기다려주세요.',
    description:
      '관리자가 확인 후 승인 처리됩니다.\n승인까지 최대 2영업일이 소요될 수 있으며,\n승인 완료 시 알림을 보내드립니다.',
    items: [
      {
        label: '병원 정보',
        value: '아주아주 긴 이름을 가진 강남 종합병원 서울센터',
      },
      {
        label: '진료 가능 언어',
        value: '영어 (English), 중국어 (中文), 일본어 (日本語)',
      },
      { label: '처리 상태', value: <StatusBadge status="PENDING" /> },
    ],
  },
};
