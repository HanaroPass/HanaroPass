'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import {
  type TopUpCardRequest,
  TopUpCardRequestSchema,
  type TopUpCardResponse,
  TopUpCardResponseSchema,
} from './payment.schema';

async function getCurrentUserId(): Promise<number> {
  return 1;
}

function assertDevOnly() {
  if (process.env.NODE_ENV !== 'development') {
    throw new HttpError('DEV 전용 기능입니다.', 404);
  }
}

/**
 * @description 결제 후 다시 금액을 충전할 때 사용하는 함수입니다.
 */
export async function topUpCardAction(
  raw: TopUpCardRequest,
): Promise<ActionResult<TopUpCardResponse>> {
  try {
    assertDevOnly();

    const { cardId, amount } = TopUpCardRequestSchema.parse(raw);
    const userId = await getCurrentUserId();

    const data = await prisma.$transaction(async (tx) => {
      const card = await tx.userCard.findFirst({
        where: { id: cardId, userId },
        select: { id: true },
      });

      if (!card) throw new HttpError('카드를 찾을 수 없습니다.', 404);

      await tx.userCard.update({
        where: { id: card.id },
        data: { balance: { increment: amount } },
      });

      return TopUpCardResponseSchema.parse({
        code: 200,
        chargedCardId: card.id,
        amount,
        message: '충전 완료',
        success: true,
      });
    });

    return { success: true, data };
  } catch (err) {
    return handleActionResult(err);
  }
}
