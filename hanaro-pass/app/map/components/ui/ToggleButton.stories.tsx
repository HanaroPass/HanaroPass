import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CircleDollarSign } from 'lucide-react';
import { useState } from 'react';
import { ToggleButton } from './ToggleButton';

const meta = {
  title: 'Map/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Map 화면에서 사용되는 토글 버튼 컴포넌트입니다.

지도 위에서 특정 기능(예: 환전소, 병원 등)의 **활성 / 비활성 상태를 전환**하는 용도로 사용됩니다.

## Variants
- **icon**  
  아이콘만 표시되는 원형 버튼입니다.  
  지도 위 플로팅 버튼, 퀵 액션에 사용됩니다.

- **pill**  
  아이콘 + 라벨이 함께 표시되는 pill 형태의 버튼입니다.  
  현재 선택된 기능을 명확하게 보여줄 때 사용합니다.

## Interaction
- \`active\` 값에 따라 버튼의 배경색과 테두리가 변경됩니다.
- 클릭 시 \`onClick\` 이벤트를 통해 상태를 토글할 수 있습니다.
        `,
      },
    },
  },

  // 필수 props 기본값
  args: {
    onClick: () => {},
    active: false,
  },

  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['icon', 'pill'],
      description: '버튼의 표시 형태를 결정합니다.',
      table: {
        type: { summary: `'icon' | 'pill'` },
        defaultValue: { summary: 'icon' },
      },
    },
    active: {
      control: 'boolean',
      description: '버튼의 활성화 상태를 나타냅니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    colorVariant: {
      control: 'inline-radio',
      options: ['green', 'red'],
      description: '활성 상태일 때 버튼의 테마 색상입니다.',
      table: {
        type: { summary: `'green' | 'red'` },
        defaultValue: { summary: 'green' },
      },
    },
    iconColorVariant: {
      control: 'inline-radio',
      options: ['green', 'red', 'blue', 'yellow', 'gray'],
      description: '아이콘 색상을 설정합니다.',
      table: {
        type: {
          summary: `'green' | 'red' | 'blue' | 'yellow' | 'gray'`,
        },
        defaultValue: { summary: 'green' },
      },
    },
    label: {
      description: 'pill 타입에서 표시되는 텍스트입니다.',
      table: {
        type: { summary: 'string' },
      },
      if: { arg: 'variant', eq: 'pill' },
    },
    ariaLabel: {
      description: 'icon 타입에서 사용하는 접근성 라벨입니다.',
      table: {
        type: { summary: 'string' },
      },
      if: { arg: 'variant', eq: 'icon' },
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 호출되는 이벤트 핸들러입니다.',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);

    return (
      <ToggleButton
        {...args}
        active={active}
        onClick={() => setActive((prev) => !prev)}
      />
    );
  },
  args: {
    variant: 'pill',
    icon: <CircleDollarSign size={16} />,
    label: '환전소',
  },
  parameters: {
    docs: {
      description: {
        story:
          '지도 화면에서 환전소 토글을 제어하는 예시입니다. 버튼을 클릭하면 활성 상태가 토글됩니다.',
      },
    },
  },
};
