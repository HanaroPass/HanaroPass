import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmModal, type ConfirmModalProps } from './ConfirmModal';
import { useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/PopUp/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'danger', 'success'],
    },
    onConfirm: { action: 'confirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

const ModalTemplate = (args: ConfirmModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActionButton
        text={`${args.variant} 모달 열기`}
        onClick={() => setOpen(true)}
      />
      <ConfirmModal
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => alert('확인 클릭')}
      />
    </>
  );
};

export const Primary: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    title: '정보 수정',
    description: '입력하신 정보로 수정을 완료하시겠습니까?',
    confirmText: '수정',
    variant: 'primary',
  },
};

export const Danger: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    title: '서류 삭제',
    description:
      '정말 이 서류를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
    confirmText: '삭제',
    variant: 'danger',
  },
};

export const Success: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    title: '등록 완료',
    description: '모든 절차가 끝났습니다. 메인 화면으로 이동할까요?',
    confirmText: '이동하기',
    variant: 'success',
  },
};
