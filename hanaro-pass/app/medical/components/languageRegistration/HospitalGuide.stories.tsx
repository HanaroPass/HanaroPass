import type { Meta, StoryObj } from '@storybook/react';
import HospitalGuide from './HospitalGuide';

const meta: Meta<typeof HospitalGuide> = {
  title: 'Medical/LanguageRegistration/HospitalGuide',
  component: HospitalGuide,
  parameters: {
    layout: 'centered',
  },
  args: {
    text: '등록하신 정보는 외국인 환자 병원을 검색할 때 표시됩니다.',
  },
  argTypes: {
    text: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof HospitalGuide>;

export const Default: Story = {};

export const Multiline: Story = {
  args: {
    text: '등록하신 정보는 외국인 환자 병원을 검색할 때 표시됩니다.\n필요 시 언제든 수정할 수 있습니다.',
  },
};

export const LongText: Story = {
  args: {
    text: '등록하신 정보는 외국인 환자 병원을 검색할 때 표시됩니다. 문장이 길어졌을 때도 줄바꿈과 행간이 자연스럽게 유지되는지 확인하기 위한 예시입니다.',
  },
};
