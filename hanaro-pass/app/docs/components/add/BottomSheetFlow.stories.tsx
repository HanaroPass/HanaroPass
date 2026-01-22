import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import BottomSheet from './BottomSheet';
import { DOCS_CARD_ITEMS } from '../../constants/docsCardItem';
import DocsSelectList from './BottomSelectList';

const meta: Meta = {
  title: 'Docs/BottomSheetFlow',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <BottomSheet isOpen={open} onClose={() => setOpen(false)}>
        <DocsSelectList
          items={DOCS_CARD_ITEMS}
          onSelect={(id) => {
            console.log('selected:', id);
            setOpen(false);
          }}
        />
      </BottomSheet>
    );
  },
};
