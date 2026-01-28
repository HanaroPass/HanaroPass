'use client';

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialogProvider, useAlert } from './alertProvider';

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-md space-y-3 rounded-xl border bg-background p-4 shadow-sm">
      <div className="font-semibold text-sm">{title}</div>
      <div>{children}</div>
    </div>
  );
}

type DemoShellProps = {
  title: string;
  buttonLabel?: string;
  onOpen: (alert: ReturnType<typeof useAlert>['alert']) => void;
};

function DemoShell({ title, buttonLabel = '열기', onOpen }: DemoShellProps) {
  const { alert } = useAlert();

  return (
    <div className="flex w-full justify-center p-6">
      <Card title={title}>
        <Button onClick={() => onOpen(alert)}>{buttonLabel}</Button>
      </Card>
    </div>
  );
}

const meta = {
  title: 'Components/AlertProvider',
  component: DemoShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <AlertDialogProvider>
        <Story />
      </AlertDialogProvider>
    ),
  ],
} satisfies Meta<typeof DemoShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicConfirm: Story = {
  name: '1) 기본 Confirm',
  args: {
    title: '1) 기본 Confirm',
    onOpen: (alert) =>
      alert({
        title: '저장할까요?',
        description: '변경사항을 저장합니다.',
        actionLabel: '저장',
        cancelLabel: '취소',
        onAction: async () => {
          await new Promise((r) => setTimeout(r, 400));
        },
      }),
  },
  render: (args) => <DemoShell {...args} />,
};

export const DestructiveNoAutoClose: Story = {
  name: '2) Destructive + closeOnAction=false',
  args: {
    title: '2) Destructive + closeOnAction=false',
    onOpen: (alert) =>
      alert({
        title: '정말 삭제할까요?',
        description: '삭제하면 되돌릴 수 없습니다.',
        actionLabel: '삭제',
        cancelLabel: '취소',
        variant: 'destructive',
        closeOnAction: false,
        onAction: async () => {
          await new Promise((r) => setTimeout(r, 400));
        },
      }),
  },
  render: (args) => <DemoShell {...args} />,
};

export const SingleButton: Story = {
  name: '3) 단일 버튼 (hideCancel)',
  args: {
    title: '3) 단일 버튼 (hideCancel)',
    onOpen: (alert) =>
      alert({
        title: '완료',
        description: '작업이 성공적으로 끝났습니다.',
        actionLabel: '확인',
        hideCancel: true,
      }),
  },
  render: (args) => <DemoShell {...args} />,
};

export const ContentSlot: Story = {
  name: '4) content 슬롯',
  args: {
    title: '4) content 슬롯',
    onOpen: (alert) =>
      alert({
        title: '추가 정보',
        description: '아래 내용을 확인해 주세요.',
        content: (
          <div className="mt-2 w-full rounded-lg bg-muted p-3 text-sm">
            <div className="font-medium">주의</div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground">
              <li>모달은 전역으로 하나만 떠요</li>
              <li>버튼은 footer 슬롯으로 교체 가능</li>
            </ul>
          </div>
        ),
      }),
  },
  render: (args) => <DemoShell {...args} />,
};

export const FooterSlot: Story = {
  name: '5) footer 슬롯 교체',
  args: {
    title: '5) footer 슬롯 교체',
    onOpen: (alert) =>
      alert({
        title: '커스텀 Footer',
        description: 'Footer를 통째로 바꿔봅니다.',
        footer: ({ close }) => (
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={close}>
              닫기
            </Button>
            <Button onClick={close}>확인하고 닫기</Button>
          </div>
        ),
      }),
  },
  render: (args) => <DemoShell {...args} />,
};

export const RenderSlot: Story = {
  name: '6) render 슬롯 (전체 레이아웃 교체)',
  args: {
    title: '6) render 슬롯 (전체 레이아웃 교체)',
    onOpen: (alert) =>
      alert({
        render: ({ close }) => (
          <div className="space-y-4">
            <div className="text-center font-semibold text-lg">
              완전 커스텀 레이아웃
            </div>
            <div className="text-center text-muted-foreground text-sm">
              title/description/header/footer 다 무시하고, 여기서 원하는 구조로
              만듭니다.
            </div>

            <div className="rounded-lg bg-muted p-3 text-sm">
              여기에 폼, 리스트, 이미지 등 뭐든 넣을 수 있어요.
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={close}>
                닫기
              </Button>
              <Button onClick={close}>확인</Button>
            </div>
          </div>
        ),
      }),
  },
  render: (args) => <DemoShell {...args} />,
};

export const SrOnlyA11y: Story = {
  name: '7) title/description 없이도 a11y 유지 (srTitle/srDescription)',
  args: {
    title: '7) title/description 없이도 a11y 유지',
    onOpen: (alert) =>
      alert({
        srTitle: '접근성 타이틀',
        srDescription: '스크린리더용 설명입니다.',
        content: (
          <div className="text-sm">
            화면에는 title/description이 없지만 경고는 안 떠야 해요.
          </div>
        ),
        hideCancel: true,
      }),
  },
  render: (args) => <DemoShell {...args} />,
};
