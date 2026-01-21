import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Bell, Settings } from 'lucide-react';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '헤더 중앙에 표시될 제목입니다.',
    },
    showBack: {
      control: 'boolean',
      description: '뒤로가기 버튼 표시 여부를 결정합니다.',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Hanaro Pass',
    showBack: true,
  },
};

export const Main: Story = {
  args: {
    title: '홈',
    showBack: false,
  },
};

export const WithNotification: Story = {
  args: {
    title: '알림 설정',
    showBack: true,
    rightElement: (
      <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
        <Bell size={24} className="text-gray-600" />
      </button>
    ),
  },
};

export const WithSettings: Story = {
  args: {
    title: '마이페이지',
    showBack: true,
    rightElement: (
      <button className="flex items-center gap-1 rounded-md p-1 hover:bg-gray-50">
        <Settings size={20} />
        <span className="font-medium text-sm">설정</span>
      </button>
    ),
  },
};
