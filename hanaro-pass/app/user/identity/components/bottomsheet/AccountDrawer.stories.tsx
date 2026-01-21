import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AccountDrawer } from "./AccountDrawer";

const meta: Meta<typeof AccountDrawer> = {
  title: "Components/Bottomsheet/AccountDrawer",
  component: AccountDrawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "출입계좌를 선택할 수 있는 바텀시트 드로어 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "드로어 열림/닫힘 상태",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "드로어 상태 변경 콜백",
    },
    onSubmit: {
      action: "onSubmit",
      description: "계좌 선택 완료 콜백",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (닫힌 상태)
export const Default: Story = {
  args: {
    open: false,
    onOpenChange: (open: boolean) => console.log("onOpenChange:", open),
    onSubmit: (data: Record<string, string>) => console.log("onSubmit:", data),
  },
};

// 열린 상태 스토리
export const Open: Story = {
  args: {
    open: true,
    onOpenChange: (open: boolean) => console.log("onOpenChange:", open),
    onSubmit: (data: Record<string, string>) => console.log("onSubmit:", data),
  },
};

// 인터랙티브 스토리 (실제로 열고 닫을 수 있음)
export const Interactive: Story = {
  render: (args: typeof Default.args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          출입계좌 선택
        </button>

        <AccountDrawer
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={(data) => {
            console.log("선택된 계좌:", data);
            alert(`계좌가 선택되었습니다: ${data.selectedAccount}`);
          }}
        />
      </div>
    );
  },
};

// 커스텀 스타일 스토리
export const CustomStyle: Story = {
  args: {
    open: true,
    className: "max-w-lg",
    onOpenChange: (open: boolean) => console.log("onOpenChange:", open),
    onSubmit: (data: Record<string, string>) => console.log("onSubmit:", data),
  },
};
