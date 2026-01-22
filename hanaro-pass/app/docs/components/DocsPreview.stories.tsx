import type { Meta, StoryObj } from '@storybook/react';
import DocsPreview from './DocsPreview';

const meta: Meta<typeof DocsPreview> = {
  title: 'Docs/DocsPreview',
  component: DocsPreview,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof DocsPreview>;

export const Default: Story = {
  args: {
    name: 'Kelsey Kwon',
  },
};
