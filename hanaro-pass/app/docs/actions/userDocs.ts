'use server';

import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';
import {
  handleActionResult,
  HttpError,
  type ActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import {
  DOC_ID_TO_REQUIREMENT,
  type DocsCardId,
  type UserDocType,
} from '../constants/docsCardItem';
import { getUserIdFromSession } from '@/lib/session';
import { supabaseServer } from '@/lib/supabase';

const DOCS_BUCKET = 'hanaropass-images';

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const MIME_TO_EXT: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// *
// 서류 조회
// *
export async function getUserDocs(docId: string) {
  const userId = await getUserIdFromSession();
  if (!userId) return null;

  const req = DOC_ID_TO_REQUIREMENT[docId as DocsCardId];
  if (!req || req.kind !== 'USER_DOC') return null;

  const row = await prisma.userDocument.findFirst({
    where: { userId, docType: req.docType },
  });

  if (!row) return null;

  const { data } = supabaseServer.storage
    .from(DOCS_BUCKET)
    .getPublicUrl(row.fileUrl);

  return {
    ...row,
    fileUrl: data.publicUrl, // 클라이언트에는 public URL만 노출
  };
}

// *
// 서류 추가
// *
export async function addUserDocs(
  formData: FormData,
): Promise<ActionResult<{ createdAt: Date }>> {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) throw new HttpError('로그인이 필요합니다.', 401);

    const docType = formData.get('docType') as UserDocType | null;
    const file = formData.get('file') as File | null;

    if (!docType || !file) {
      throw new HttpError('필수 정보가 누락되었습니다.', 400);
    }

    const ALLOWED_DOC_TYPES = new Set(
      Object.values(DOC_ID_TO_REQUIREMENT)
        .filter((r) => r.kind === 'USER_DOC')
        .map((r) => r.docType),
    );
    if (!ALLOWED_DOC_TYPES.has(docType)) {
      throw new HttpError('유효하지 않은 서류 형식입니다.', 400);
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      throw new HttpError('지원하지 않는 파일 형식입니다.', 400);
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new HttpError('파일 크기는 5MB를 초과할 수 없습니다.', 400);
    }

    // storage path 생성
    const uuid = crypto.randomUUID();
    const ext = MIME_TO_EXT[file.type];
    const storagePath = `uploads/${userId}/${docType}/${uuid}.${ext}`;

    // Supabase 업로드
    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await supabaseServer.storage
      .from(DOCS_BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (upload.error) {
      throw new HttpError(`업로드 실패: ${upload.error.message}`, 500);
    }

    let created: { createdAt: Date };
    try {
      created = await prisma.userDocument.create({
        data: {
          userId,
          docType,
          fileUrl: storagePath,
        },
        select: { createdAt: true },
      });
    } catch (dbError) {
      // DB 실패 시 업로드 파일 롤백
      await supabaseServer.storage.from(DOCS_BUCKET).remove([storagePath]);
      throw dbError;
    }

    revalidatePath('/docs');
    return { success: true, data: { createdAt: created.createdAt } };
  } catch (error) {
    return handleActionResult(error);
  }
}

// *
// 서류 삭제
// *
export async function deleteUserDocs(
  docId: string,
): Promise<ActionResult<{ deleted: true }>> {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) throw new HttpError('로그인이 필요합니다.', 401);

    const req = DOC_ID_TO_REQUIREMENT[docId as DocsCardId];
    if (!req || req.kind !== 'USER_DOC') {
      throw new HttpError('유효하지 않은 서류입니다.', 400);
    }

    const userDoc = await prisma.userDocument.findFirst({
      where: { userId, docType: req.docType },
    });
    if (!userDoc) throw new HttpError('삭제할 서류가 없습니다.', 404);

    // Supabase 파일 삭제
    const rm = await supabaseServer.storage
      .from(DOCS_BUCKET)
      .remove([userDoc.fileUrl]);

    if (rm.error) {
      console.warn('Supabase 파일 삭제 실패(계속 진행):', rm.error.message);
    }

    // DB 삭제
    await prisma.userDocument.delete({ where: { id: userDoc.id } });

    revalidatePath('/docs');
    return { success: true, data: { deleted: true } };
  } catch (error) {
    return handleActionResult(error);
  }
}
