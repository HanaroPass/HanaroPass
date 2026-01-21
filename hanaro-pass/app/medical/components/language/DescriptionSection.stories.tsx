import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DescriptionSection from './DescriptionSection';

const meta: Meta<typeof DescriptionSection> = {
  title: 'Sections/DescriptionSection',
  component: DescriptionSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '안내',
    descriptions: [
      '여기에 첫 번째 설명 문장이 들어갑니다.',
      '두 번째 줄 설명입니다.',
      '세 번째 줄 설명입니다.',
    ],
  },
  argTypes: {
    title: { control: 'text' },
    descriptions: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof DescriptionSection>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    title: '유의사항',
    descriptions: [
      '문장이 길어졌을 때도 줄바꿈/행간이 자연스럽게 보이는지 확인합니다. 문장이 길어졌을 때도 줄바꿈/행간이 자연스럽게 보이는지 확인합니다.',
      '또 다른 긴 문장 샘플입니다. 또 다른 긴 문장 샘플입니다.',
    ],
  },
};

export const ManyLines: Story = {
  args: {
    title: '상세 설명',
    descriptions: Array.from(
      { length: 8 },
      (_, i) => `${i + 1}번째 설명 줄입니다.`,
    ),
  },
};

export const EmptyDescriptions: Story = {
  args: {
    title: '빈 상태',
    descriptions: [],
  },
};
