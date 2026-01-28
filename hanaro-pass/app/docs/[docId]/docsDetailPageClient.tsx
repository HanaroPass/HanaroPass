'use client';

import { useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { deleteUserDocs } from '../actions/userDocs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useAlert } from '@/providers/alertProvider';

type Props = {
  docId: string;
  fileUrl: string;
  title: string;
};

export default function DocsDetailPageClient({ docId, fileUrl, title }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { success, actionError, systemError } = useToast();
  const { alert } = useAlert();

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const res = await deleteUserDocs(docId);
      if (res.success) {
        success(`${title} 삭제 완료!`, '서류가 성공적으로 삭제되었습니다.');
        router.push('/docs');
      } else {
        actionError(res);
      }
    } catch {
      systemError('서류 삭제');
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = () => {
    alert({
      title: '서류 삭제',
      description: `'${title}' 서류를 삭제하시겠습니까?`,
      actionLabel: isDeleting ? '삭제 중...' : '삭제',
      cancelLabel: '취소',
      variant: 'destructive',
      contentClassName: '!max-w-[340px]',
      closeOnAction: false,
      actionProps: { disabled: isDeleting },
      cancelProps: { disabled: isDeleting },
      onAction: async () => {
        await handleDelete();
      },
    });
  };

  const handleDownload = async () => {
    if (!fileUrl) return;

    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error(`다운로드 실패 (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = title || 'document.pdf';
      a.click();

      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch {
      systemError('서류 다운로드');
    }
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-84 gap-4">
      <div className="flex-1 text-black">
        <ActionButton
          text={isDeleting ? '삭제 중...' : '삭제'}
          disabled={isDeleting}
          onClick={openDeleteDialog}
          className="bg-white text-black hover:bg-black/5 active:bg-black/5"
        />
      </div>

      <div className="flex-1">
        <ActionButton
          text="다운로드"
          disabled={!fileUrl}
          onClick={handleDownload}
        />
      </div>
    </div>
  );
}
