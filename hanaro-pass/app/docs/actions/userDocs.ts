'use server';

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import { revalidatePath } from 'next/cache';

import { getUserId } from '@/app/docs/actions/user';
import {
  handleActionResult,
  HttpError,
  type ActionResult,
} from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';

import {
  DOC_ID_TO_REQUIREMENT,
  type DocsCardId,
  type UserDocType,
} from '../constants/docsCardItem';

// *
// 서류 조회
// *
export async function getUserDocs(docId: string) {
  const userId = await getUserId();
  if (!userId) return null;

  // docId로 DB ENUM 타입찾기
  const req = DOC_ID_TO_REQUIREMENT[docId as DocsCardId];
  if (!req || req.kind !== 'USER_DOC') return null;

  return await prisma.userDocument.findFirst({
    where: {
      userId,
      docType: req.docType,
    },
  });
}

// *
// 서류 추가
// *
export async function addUserDocs(
  formData: FormData,
): Promise<ActionResult<{ createdAt: Date }>> {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new HttpError('로그인이 필요합니다.', 401);
    }

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

    // 파일 확장자 추출 및 경로 설정
    const uuid = crypto.randomUUID();
    const ext = MIME_TO_EXT[file.type];
    const relativePath = `uploads/${userId}/${docType}/${uuid}.${ext}`;

    const uploadDir = path.join(
      process.cwd(),
      'public',
      'uploads',
      String(userId),
      docType,
    );
    const fullPath = path.join(process.cwd(), 'public', relativePath);

    // 파일 저장
    await fs.mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(fullPath, buffer);

    // DB 저장에 파일 경로 저장
    let created: { createdAt: Date };
    try {
      created = await prisma.userDocument.create({
        data: {
          userId,
          docType,
          fileUrl: `/${relativePath}`,
        },
        select: {
          createdAt: true,
        },
      });
    } catch (dbError) {
      // DB 실패 시 파일 정리
      await fs.unlink(fullPath).catch(() => {});
      throw dbError;
    }

    revalidatePath('/docs');

    return { success: true, data: { createdAt: created.createdAt } };
  } catch (error) {
    return handleActionResult(error);
  }
}

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
// 서류 삭제
// *
export async function deleteUserDocs(
  docId: string,
): Promise<ActionResult<{ deleted: true }>> {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new HttpError('로그인이 필요합니다.', 401);
    }

    const req = DOC_ID_TO_REQUIREMENT[docId as DocsCardId];
    if (!req || req.kind !== 'USER_DOC') {
      throw new HttpError('유효하지 않은 서류입니다.', 400);
    }

    // DB에서 기존 서류 조회
    const userDoc = await prisma.userDocument.findFirst({
      where: {
        userId,
        docType: req.docType,
      },
    });

    if (!userDoc) {
      throw new HttpError('삭제할 서류가 없습니다.', 404);
    }

    // 실제 파일 경로
    const filePath = path.join(
      process.cwd(),
      'public',
      userDoc.fileUrl.replace(/^\//, ''),
    );

    // 파일 삭제 (없어도 에러 안 나게)
    try {
      await fs.unlink(filePath);
    } catch {
      console.warn('파일 삭제 실패 (무시됨):', filePath);
    }

    // DB 삭제
    await prisma.userDocument.delete({
      where: {
        id: userDoc.id,
      },
    });

    revalidatePath('/docs');

    return { success: true, data: { deleted: true } };
  } catch (error) {
    return handleActionResult(error);
  }
}
