import type { Meta, StoryObj } from '@storybook/react';
import ActionButton from './ActionButton';

const meta: Meta<typeof ActionButton> = {
  title: 'Medical/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    text: '저장하기',
    disabled: false,
  },
  argTypes: {
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'onClick' }, // 클릭 시 Actions 패널 로그
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    text: '선택해주세요',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    text: '외국어 진료 가능 언어 정보를 저장합니다',
  },
};

export const WithCustomClass: Story = {
  args: {
    text: '다음으로',
    className: 'max-w-[360px]',
  },
};
