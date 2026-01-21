import type { Meta, StoryObj } from '@storybook/react';
import { DOCS_CARD_ITEMS } from '../constants/docsCardItem';
import BottomSelectList from './BottomSelectList';

const meta: Meta<typeof BottomSelectList> = {
  title: 'Docs/BottomSelectList',
  component: BottomSelectList,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof BottomSelectList>;

export const Default: Story = {
  args: {
    items: DOCS_CARD_ITEMS,
    onSelect: (id) => {
      console.log('selected:', id);
    },
  },
};
