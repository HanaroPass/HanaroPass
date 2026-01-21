import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BENEFIT_BANNER_VARIANTS } from '@/constants/benefitBanner';
import BenefitBanner from './BenefitBanner';

const meta = {
  title: 'Components/BenefitBanner',
  component: BenefitBanner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    countryCode: 'HK',
    name: 'Chan',
    className: 'w-full',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(BENEFIT_BANNER_VARIANTS),
    },
    countryCode: { control: 'text' },
    name: { control: 'text' },
  },
} satisfies Meta<typeof BenefitBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ski: Story = {
  args: {
    variant: BENEFIT_BANNER_VARIANTS.SKI,
    countryCode: 'HK',
    name: 'Chan',
  },
};

export const IceFestival: Story = {
  args: {
    variant: BENEFIT_BANNER_VARIANTS.ICE_FESTIVAL,
    countryCode: 'TH',
    name: 'Pim',
  },
};

export const WinterCamping: Story = {
  args: {
    variant: BENEFIT_BANNER_VARIANTS.WINTER_CAMPING,
    countryCode: 'TW',
    name: 'Wang',
  },
};

export const HotSpring: Story = {
  args: {
    variant: BENEFIT_BANNER_VARIANTS.HOT_SPRING,
    countryCode: 'RU',
    name: 'Dmitry',
  },
};
