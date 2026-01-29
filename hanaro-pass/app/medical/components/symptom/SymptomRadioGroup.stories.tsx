import type { Meta, StoryObj } from '@storybook/react';
import SymptomRadioGroup from './SymptomRadioGroup';

const meta: Meta<typeof SymptomRadioGroup> = {
  title: 'Medical/SymptomRadioGroup',
  component: SymptomRadioGroup,
};

export default meta;
type Story = StoryObj<typeof SymptomRadioGroup>;

export const Default: Story = {
  args: {},
};
