import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';

const meta: Meta = {
  title: 'Components/PopUp/Toast',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <Toaster position="top-center" richColors />
        <Story />
      </>
    ),
  ],
};

export default meta;

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast.success('성공 메시지입니다!', {
            description: '서류 등록이 완료되었습니다.',
          })
        }
      >
        Success
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          toast.error('에러가 발생했습니다.', {
            description: '다시 시도해주세요.',
          })
        }
      >
        Error
      </Button>

      <Button
        variant="secondary"
        onClick={() => toast.info('알림 정보입니다.')}
      >
        Info
      </Button>

      <Button
        variant="outline"
        className="border-yellow-500 text-yellow-600"
        onClick={() => toast.warning('경고: 세션이 만료될 예정입니다.')}
      >
        Warning
      </Button>
    </div>
  ),
};
