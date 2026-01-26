'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { PaymentRequestSchema, type PaymentResponse } from './payment.schema';

async function getCurrentUserId(): Promise<number> {
  return 1;
}

const LIST_PRICE = 10_000;

function calcPaidAmount(discount?: number) {
  const rate = discount ?? 0;
  const clamped = Math.min(Math.max(rate, 0), 100);
  return Math.floor(LIST_PRICE * (1 - clamped / 100));
}

export async function postPaymentAction(
  raw: unknown,
): Promise<ActionResult<PaymentResponse>> {
  try {
    const { cardNumber, discount } = PaymentRequestSchema.parse(raw);
    const userId = await getCurrentUserId();

    const paidAmount = calcPaidAmount(discount);

    const data = await prisma.$transaction(async (tx) => {
      const requestedCard = cardNumber
        ? await tx.userCard.findFirst({
            where: { userId, cardNumber },
            select: { id: true, balance: true },
          })
        : null;

      const defaultCard = !requestedCard
        ? await tx.userCard.findFirst({
            where: { userId, isDefault: true },
            select: { id: true, balance: true },
          })
        : null;

      const target = requestedCard ?? defaultCard;
      if (!target) throw new HttpError('결제 가능한 카드가 없습니다.', 404);

      const balance = Number(target.balance.toString());
      if (balance < paidAmount) throw new HttpError('잔액이 부족합니다.', 400);

      await tx.userCard.update({
        where: { id: target.id },
        data: { balance: { decrement: paidAmount } },
      });

      return {
        code: 200,
        chargedCardId: target.id,
        paidAmount,
        message: '결제가 완료되었습니다.',
        success: true,
      } satisfies PaymentResponse;
    });

    return { success: true, data };
  } catch (err) {
    return handleActionResult(err);
  }
}
