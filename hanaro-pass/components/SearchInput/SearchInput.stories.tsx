import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';
import { useState } from 'react';
import SearchInput from './SearchInput';

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '쿠폰 이름을 검색해보세요',
  },
};

export const WithInitialValue: Story = {
  args: {
    defaultValue: 'gs25',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('부모가 가지고 있는 값');

    return (
      <div className="flex w-100 flex-col gap-4">
        <SearchInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="text-gray-500 text-sm">
          부모가 들고 있는 실제 데이터:{' '}
          <span className="font-bold text-black-900">{value}</span>
        </div>
      </div>
    );
  },
};

export const ExternalControl: Story = {
  render: (args) => {
    const [query, setQuery] = useState('');

    return (
      <div className="flex w-100 flex-col gap-4">
        <SearchInput
          {...args}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="추천 검색어를 눌러보세요"
        />
        <div className="flex gap-2">
          {['하나로패스', '쿠폰혜택', 'gs25'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200"
            >
              #{tag}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setQuery('')}
            className="rounded-full bg-red-50 px-3 py-1 text-red-500 text-xs hover:bg-red-100"
          >
            강제 초기화
          </button>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '검색이 불가능합니다',
  },
};
