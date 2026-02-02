'use server';

import crypto from 'node:crypto';
import { z } from 'zod';
import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';

async function getCurrentUserId(): Promise<number> {
  return 1;
}

const IssueTokenRequestSchema = z
  .object({
    cardId: z.number().int().positive(),
  })
  .strict();

function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function randomToken() {
  return crypto.randomBytes(24).toString('base64url');
}

export async function issueBarcodeTokenAction(
  raw: z.infer<typeof IssueTokenRequestSchema>,
): Promise<ActionResult<{ barcodeToken: string; expiresAt: string }>> {
  try {
    const { cardId } = IssueTokenRequestSchema.parse(raw);
    const userId = await getCurrentUserId();

    const card = await prisma.userCard.findFirst({
      where: { id: cardId, userId },
      select: { id: true },
    });
    if (!card) throw new HttpError('해당 카드가 없습니다.', 404);

    const barcodeToken = randomToken();
    const tokenHash = sha256(barcodeToken);
    const expiresAt = new Date(Date.now() + 60 * 1000);

    await prisma.barcodeToken.create({
      data: { userId, cardId, tokenHash, expiresAt },
    });

    return {
      success: true,
      data: { barcodeToken, expiresAt: expiresAt.toISOString() },
    };
  } catch (err) {
    return handleActionResult(err);
  }
}
