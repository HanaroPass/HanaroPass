import type { Meta, StoryObj } from '@storybook/react';
import Symptom from './Symptom';

const meta: Meta<typeof Symptom> = {
  title: 'Medical/Symptom',
  component: Symptom,
};

export default meta;

type Story = StoryObj<typeof Symptom>;

export const Default: Story = {
  args: { value: '출혈' },
};

export const Long: Story = {
  args: { value: '상복부 통증 및 출혈반' },
};
