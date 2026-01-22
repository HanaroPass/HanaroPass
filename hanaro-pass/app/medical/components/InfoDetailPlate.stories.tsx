import type { Meta, StoryObj } from '@storybook/react';
import { InfoDetailPlate } from './InfoDetailPlate';

const meta: Meta<typeof InfoDetailPlate> = {
  title: 'Medical/InfoDetailPlate',
  component: InfoDetailPlate,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    value: '강남 병원',
  },
  argTypes: {
    value: { control: 'object' }, // ReactNode
  },
};

export default meta;

type Story = StoryObj<typeof InfoDetailPlate>;

export const Default: Story = {};

export const WithEmoji: Story = {
  args: {
    value: (
      <div className="flex items-center gap-2">
        <span className="text-xl">🇨🇳</span>
        <span>중국어 (中文)</span>
      </div>
    ),
  },
};

export const LongText: Story = {
  args: {
    value:
      '아주아주 긴 이름을 가진 강남 종합병원 서울센터 외국어 진료 가능 정보 등록 신청',
  },
};

export const MultipleLines: Story = {
  args: {
    value: (
      <div className="space-y-1">
        <p>영어 (English)</p>
        <p>중국어 (中文)</p>
        <p>일본어 (日本語)</p>
      </div>
    ),
  },
};

export const Playground: Story = {};
