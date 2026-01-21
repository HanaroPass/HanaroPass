import type { Meta, StoryObj } from '@storybook/react';
import LanguageCard, { type Language } from './LanguageCard';

const SAMPLE_LANG: Language = {
  id: 'en',
  name: '영어',
  sub: 'English',
  flag: '🇺🇸',
};

const meta: Meta<typeof LanguageCard> = {
  title: 'Medical/LanguageCard',
  component: LanguageCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    lang: SAMPLE_LANG,
    isSelected: false,
  },
  argTypes: {
    isSelected: { control: 'boolean' },
    onToggle: { action: 'onToggle' }, // ✅ 클릭 시 Actions 패널에 id 찍힘
    lang: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof LanguageCard>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const DifferentLanguage: Story = {
  args: {
    lang: {
      id: 'jp',
      name: '일본어',
      sub: '日本語',
      flag: '🇯🇵',
    },
  },
};

export const Playground: Story = {
  render: (args) => (
    <div className="w-90">
      <LanguageCard {...args} />
    </div>
  ),
};
