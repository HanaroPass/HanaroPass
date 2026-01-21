import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AlienDrawer } from './AlienDrawer';

const meta: Meta<typeof AlienDrawer> = {
  title: 'Components/Bottomsheet/AlienDrawer',
  component: AlienDrawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '외국인 등록증 정보를 입력할 수 있는 바텀시트 드로어 컴포넌트입니다.',
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
      description: '외국인 등록증 정보 제출 콜백',
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
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          외국인 등록증 정보 입력
        </button>

        <AlienDrawer
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={(data) => {
            console.log('외국인 등록증 정보:', data);
            alert('외국인 등록증 정보가 제출되었습니다!');
          }}
        />
      </div>
    );
  },
};

// 폼 검증 스토리
export const FormValidation: Story = {
  render: (args: typeof Default.args) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <AlienDrawer
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={(data) => {
            // 간단한 검증 로직 예시
            if (!data.lastName || !data.firstName) {
              alert('이름을 입력해주세요!');
              return;
            }
            if (!data.registrationNumber) {
              alert('등록번호를 입력해주세요!');
              return;
            }
            console.log('외국인 등록증 정보:', data);
            alert('외국인 등록증 정보가 제출되었습니다!');
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '폼 검증 로직이 포함된 예시입니다. 필수 필드가 비어있으면 알림을 표시합니다.',
      },
    },
  },
};
