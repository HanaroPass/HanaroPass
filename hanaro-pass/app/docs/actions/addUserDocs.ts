'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/app/docs/actions/user';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';
import {
  handleActionResult,
  HttpError,
  type ActionResult,
} from '@/lib/error-handler';

type UserDocType = 'PHOTO' | 'COPY' | 'STUDENT_ID';

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

    // 파일 확장자 추출 및 경로 설정
    const uuid = crypto.randomUUID();
    const ext =
      file.type === 'application/pdf'
        ? 'pdf'
        : file.type.split('/')[1] || 'bin';
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
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(fullPath, buffer);

    // DB 저장에 파일 경로 저장
    const created = await prisma.userDocument.create({
      data: {
        userId,
        docType,
        fileUrl: `/${relativePath}`,
      },
      select: {
        createdAt: true, // 저장 일시만 가져오기
      },
    });

    revalidatePath('/docs');

    // 4. 클라이언트에 필요한 데이터만 반환
    return { success: true, data: { createdAt: created.createdAt } };
  } catch (error) {
    return handleActionResult(error);
  }
}
