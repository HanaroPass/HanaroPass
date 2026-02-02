'use server';

import crypto from 'node:crypto';
import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import {
  type PaymentRequest,
  PaymentRequestSchema,
  type PaymentResponse,
  PaymentResponseSchema,
} from './payment.schema';

async function getCurrentUserId(): Promise<number> {
  return 1;
}

const LIST_PRICE = 10_000;

function clampRate(rate: number) {
  return Math.min(Math.max(rate, 0), 100);
}

function calcPaidAmountByRate(rate?: number) {
  const r = clampRate(rate ?? 0);
  return Math.floor(LIST_PRICE * (1 - r / 100));
}

function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export async function postPaymentAction(
  raw: PaymentRequest,
): Promise<ActionResult<PaymentResponse>> {
  try {
    const { barcodeToken, couponId } = PaymentRequestSchema.parse(raw);
    const userId = await getCurrentUserId();

    const data = await prisma.$transaction(async (tx) => {
      // 1) 할인율 couponId로 결정
      let discountRate = 0;

      if (couponId != null) {
        const coupon = await tx.coupon.findUnique({
          where: { id: couponId },
          select: { id: true, discount: true },
        });
        if (!coupon) throw new HttpError('쿠폰이 존재하지 않습니다.', 404);
        discountRate = Number(coupon.discount);
      }

      const paidAmount = calcPaidAmountByRate(discountRate);

      // 2) 결제 대상 카드 선택
      // 없으면 대표카드로 결제
      let targetCardId: number;

      if (barcodeToken) {
        const tokenHash = sha256(barcodeToken);
        const now = new Date();

        const consume = await tx.barcodeToken.updateMany({
          where: {
            tokenHash,
            userId,
            usedAt: null,
            expiresAt: { gt: now },
          },
          data: { usedAt: now },
        });

        if (consume.count !== 1) {
          throw new HttpError('바코드가 만료되었거나 유효하지 않습니다.', 400);
        }

        const tokenRow = await tx.barcodeToken.findUnique({
          where: { tokenHash },
          select: { cardId: true },
        });

        if (!tokenRow) {
          throw new HttpError('바코드 토큰을 확인할 수 없습니다.', 400);
        }

        targetCardId = tokenRow.cardId;
      } else {
        const defaultCard = await tx.userCard.findFirst({
          where: { userId, isDefault: true },
          select: { id: true },
        });

        if (!defaultCard) throw new HttpError('대표 카드가 없습니다.', 404);

        targetCardId = defaultCard.id;
      }

      const targetCard = await tx.userCard.findFirst({
        where: { id: targetCardId, userId },
        select: { id: true },
      });

      if (!targetCard) throw new HttpError('해당 카드가 없습니다.', 404);

      // 3) Race condition 방지
      // balance >= paidAmount 조건으로 한 번에 decrement
      const updated = await tx.userCard.updateMany({
        where: {
          id: targetCard.id,
          userId,
          balance: { gte: paidAmount },
        },
        data: {
          balance: { decrement: paidAmount },
        },
      });

      if (updated.count !== 1) {
        throw new HttpError(
          '잔액이 부족합니다. 카드 정보를 다시 확인해주세요.',
          400,
        );
      }

      const res: PaymentResponse = {
        code: 200,
        chargedCardId: targetCard.id,
        paidAmount,
        message: '결제가 완료되었습니다.',
        success: true,

        listPrice: LIST_PRICE,
        discountRate,
        savedAmount: LIST_PRICE - paidAmount,
      };

      return PaymentResponseSchema.parse(res);
    });

    return { success: true, data };
  } catch (err) {
    return handleActionResult(err);
  }
}
