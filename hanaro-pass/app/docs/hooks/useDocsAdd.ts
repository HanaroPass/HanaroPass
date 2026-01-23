import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DOC_ID_TO_REQUIREMENT,
  type DocsCardId,
} from '../constants/docsCardItem';
import { addUserDocs } from '../actions/userDocs';

export function useDocsAdd(docId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const upload = async (file: File | null) => {
    if (!file || isSubmitting) return;

    const req = DOC_ID_TO_REQUIREMENT[docId as DocsCardId];
    if (req?.kind !== 'USER_DOC') {
      alert('지원하지 않는 서류 형식입니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', req.docType);

      const result = await addUserDocs(formData);
      if (!result.success) {
        alert(result.message);
        return;
      }
      sessionStorage.setItem('createdAt', result.data.createdAt.toISOString());
      router.push(`/docs/add/${docId}/done`);
    } catch (e) {
      console.error(e);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { upload, isSubmitting };
}
