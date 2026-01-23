'use client';

import { useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { deleteUserDocs } from '../actions/userDocs';
import { useRouter } from 'next/navigation';

type Props = {
  docId: string;
  fileUrl: string;
  title: string;
};

export default function DocsDetailPageClient({ docId, fileUrl, title }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

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
    <div className="mx-auto mt-10 flex w-full max-w-84 gap-4">
      <div className="flex-1 text-black">
        <ActionButton
          text={isDeleting ? '삭제 중...' : '삭제'}
          disabled={isDeleting}
          onClick={async () => {
            const ok = confirm('정말 이 서류를 삭제할까요?');
            if (!ok) return;
            setIsDeleting(true);
            const res = await deleteUserDocs(docId);

            if (!res.success) {
              alert(res.message);
              setIsDeleting(false);
              return;
            }

            alert('서류가 삭제되었습니다.');
            router.push('/docs');
          }}
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
