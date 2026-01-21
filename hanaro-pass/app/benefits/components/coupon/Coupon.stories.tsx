import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Coupon from './Coupon';

const meta = {
  title: 'Components/Coupon',
  component: Coupon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Coupon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandName: 'GS25',
    tag: '#편의점',
    category: 'food',
    discount: 3,
    description: '최대 5천원 할인',
    brandPic:
      'https://blog.kakaocdn.net/dna/lMgCJ/btqVvPDO1IB/AAAAAAAAAAAAAAAAAAAAAMppshZ7hQfAA8C0R-uK8w62V9O4BJYwNvifeBrHKjK8/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=rXZhIFRLxIpT%2FxAqf7MMHNb%2Bdgc%3D',
  },
};
