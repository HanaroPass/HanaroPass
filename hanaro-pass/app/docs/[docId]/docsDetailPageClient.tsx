'use client';

import ActionButton from '@/components/ui/ActionButton';

type Props = {
  fileUrl: string;
  title: string;
};

export default function DocsDetailPageClient({ fileUrl, title }: Props) {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-84 gap-4">
      <div className="flex-1 text-black">
        <ActionButton
          text="삭제"
          onClick={() => alert('삭제 기능 연결 예정')}
          className="bg-white text-black hover:bg-black/5 active:bg-black/5"
        />
      </div>

      <div className="flex-1">
        <ActionButton
          text="다운로드"
          disabled={!fileUrl}
          onClick={() => {
            if (!fileUrl) return;

            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        />
      </div>
    </div>
  );
}
