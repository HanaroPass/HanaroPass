import type { Meta, StoryObj } from '@storybook/react';
import { Globe, Hospital } from 'lucide-react';
import SectionHeader from './SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'Medical/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    icon: Globe,
    title: '진료 가능 언어',
  },
  argTypes: {
    title: { control: 'text' },
    icon: { control: false }, // 아이콘은 컴포넌트라 컨트롤 비활성화
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {};

export const HospitalSection: Story = {
  args: {
    icon: Hospital,
    title: '병원 정보',
  },
};

export const LongTitle: Story = {
  args: {
    title: '외국어 진료 가능 언어 등록 및 관리',
  },
};
