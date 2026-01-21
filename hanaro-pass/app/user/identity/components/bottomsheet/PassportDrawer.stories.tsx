import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PassportDrawer } from './PassportDrawer';

const meta: Meta<typeof PassportDrawer> = {
  title: 'Components/Bottomsheet/PassportDrawer',
  component: PassportDrawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '여권 정보를 입력할 수 있는 바텀시트 드로어 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '드로어 열림/닫힘 상태',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: '드로어 상태 변경 콜백',
    },
    onSubmit: {
      action: 'onSubmit',
      description: '여권 정보 제출 콜백',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (닫힌 상태)
export const Default: Story = {
  args: {
    open: false,
    onOpenChange: (open: boolean) => console.log('onOpenChange:', open),
    onSubmit: (data: Record<string, string>) => console.log('onSubmit:', data),
  },
};

// 열린 상태 스토리
export const Open: Story = {
  args: {
    open: true,
    onOpenChange: (open: boolean) => console.log('onOpenChange:', open),
    onSubmit: (data: Record<string, string>) => console.log('onSubmit:', data),
  },
};

// 인터랙티브 스토리 (실제로 열고 닫을 수 있음)
export const Interactive: Story = {
  render: (args: typeof Default.args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          여권 정보 입력
        </button>

        <PassportDrawer
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={(data) => {
            console.log('여권 정보:', data);
            alert('여권 정보가 제출되었습니다!');
          }}
        />
      </div>
    );
  },
};

// 미리 채워진 데이터 스토리 (개발용)
export const FilledData: Story = {
  render: (args: typeof Default.args) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <PassportDrawer
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={(data) => {
            console.log('여권 정보:', data);
            alert('여권 정보가 제출되었습니다!');
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '개발 시 테스트용으로 사용할 수 있는 미리 채워진 데이터 예시입니다.',
      },
    },
  },
};
