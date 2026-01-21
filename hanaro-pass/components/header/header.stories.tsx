import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Bell, X } from 'lucide-react';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    leftType: {
      control: 'inline-radio',
      options: ['back', 'none'],
    },
    leftHref: {
      control: 'text',
      description: '이동할 경로입니다. 미지정 시 router.back()',
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

export const CustomPath: Story = {
  args: {
    title: '메인으로 이동',
    leftHref: '/main',
  },
};

export const ComplexAction: Story = {
  args: {
    title: '글쓰기',
    leftElement: (
      <button
        onClick={() => alert('나가면 작성 중인 내용이 사라집니다!')}
        className="-ml-2 p-2"
      >
        <X size={24} />
      </button>
    ),
  },
};

export const WithNotification: Story = {
  args: {
    title: '알림 설정',
    rightElement: (
      <button className="p-2 text-black-900">
        <Bell size={24} />
      </button>
    ),
  },
};
