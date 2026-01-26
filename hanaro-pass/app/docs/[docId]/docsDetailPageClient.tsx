'use client';

import { useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { deleteUserDocs } from '../actions/userDocs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { ConfirmModal } from '@/components/toast/ConfirmModal';

type Props = {
  docId: string;
  fileUrl: string;
  title: string;
};

export default function DocsDetailPageClient({ docId, fileUrl, title }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { success, actionError } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteUserDocs(docId);

    if (res.success) {
      success(`${title} 삭제 완료!`, '서류가 성공적으로 삭제되었습니다.');
      router.push('/docs');
    } else {
      actionError(res);
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    if (!fileUrl) return;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="mx-auto mt-10 flex w-full max-w-84 gap-4">
        <div className="flex-1 text-black">
          <ActionButton
            text={isDeleting ? '삭제 중...' : '삭제'}
            disabled={isDeleting}
            onClick={() => setShowDeleteModal(true)}
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
      <ConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="서류 삭제"
        description={`'${title}' 서류를 삭제하시겠습니까?`}
        confirmText="삭제"
        variant="danger"
        onConfirm={handleDelete}
      />
    </>
  );
}
