import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  STATUS_CONFIG,
  type StatusType,
} from '@/app/medical/constants/statusConfig';
import { ApplicationStatusTabs } from './ApplicationAdminTabs';

type Counts = Partial<Record<StatusType, number>>;

const statusKeys = Object.keys(STATUS_CONFIG) as StatusType[];

const meta: Meta<typeof ApplicationStatusTabs> = {
  title: 'Medical/LanguageAdmin/ApplicationStatusTabs',
  component: ApplicationStatusTabs,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    activeTab: { control: false },
    onTabChange: { action: 'onTabChange' },
    counts: { control: 'object' },
  },
  args: {
    counts: {} satisfies Counts,
  },
};

export default meta;

type Story = StoryObj<typeof ApplicationStatusTabs>;

export const Interactive: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<StatusType>(statusKeys[0]);

    const counts: Counts = args.counts ?? {};

    const handleChange = (next: StatusType) => {
      setActiveTab(next);
      args.onTabChange?.(next);
    };

    return (
      <div className="w-full">
        <ApplicationStatusTabs
          activeTab={activeTab}
          onTabChange={handleChange}
          counts={counts}
        />

        <div className="px-6 py-4 font-sans text-(--color-black-600) text-sm">
          현재 선택: <b className="text-(--color-black-900)">{activeTab}</b>
        </div>
      </div>
    );
  },
};

export const WithCounts: Story = {
  args: {
    counts: {
      PENDING: 3,
      APPROVED: 12,
      REJECTED: 1,
    } satisfies Counts,
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState<StatusType>(statusKeys[0]);

    return (
      <ApplicationStatusTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={args.counts ?? {}}
      />
    );
  },
};
