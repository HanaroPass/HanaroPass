// HospitalItem.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import HospitalItem from './HospitalItem';

const meta: Meta<typeof HospitalItem> = {
  title: 'Medical/HospitalItem',
  component: HospitalItem,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: '서울 중앙 병원',
    address: '서울특별시 광진구 능동로 120',
  },
  argTypes: {
    name: { control: 'text' },
    address: { control: 'text' },
    onSelect: { action: 'onSelect' }, // QQQ : action으로 라우팅 하기
  },
};

export default meta;

type Story = StoryObj<typeof HospitalItem>;

export const Default: Story = {};

export const LongNameAndAddress: Story = {
  args: {
    name: '아주아주 긴 이름을 가진 종합병원 서울센터',
    address:
      '서울특별시 광진구 능동로 120번길 45-12 아주 긴 주소 테스트용 문장입니다.',
  },
};

export const ManyItemsPreview: Story = {
  render: (args) => (
    <div className="w-[360px] space-y-3">
      <HospitalItem {...args} onSelect={() => {}} />
      <HospitalItem
        name="건대 스타 병원"
        address="서울특별시 광진구 화양동"
        onSelect={() => {}}
      />
      <HospitalItem
        name="광진 메디컬 클리닉"
        address="서울특별시 광진구 자양로"
        onSelect={() => {}}
      />
    </div>
  ),
};
