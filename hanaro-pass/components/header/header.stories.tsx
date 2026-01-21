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
    leftType: {
      control: 'inline-radio',
      options: ['back', 'close', 'none'],
      description: '좌측 버튼의 타입을 결정합니다.',
    },
    onLeftClick: {
      action: 'clicked',
      description:
        '좌측 버튼 클릭 시 실행될 함수입니다. 미지정 시 router.back()이 실행됩니다.',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Hanaro Pass',
    leftType: 'back',
  },
};

export const Main: Story = {
  args: {
    title: '홈',
    leftType: 'none',
  },
};

export const WithNotification: Story = {
  args: {
    title: '알림 설정',
    leftType: 'back',
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
    leftType: 'back',
    rightElement: (
      <button className="flex items-center gap-1 rounded-md p-1 hover:bg-gray-50">
        <Settings size={20} className="text-gray-600" />
        <span className="font-medium text-gray-600 text-sm">설정</span>
      </button>
    ),
  },
};

export const CustomAction: Story = {
  args: {
    title: '글쓰기',
    onLeftClick: () => {
      if (
        window.confirm('작성 중인 내용이 저장되지 않습니다. 나가시겠습니까?')
      ) {
        alert('이탈 로직 실행');
      }
    },
  },
};
