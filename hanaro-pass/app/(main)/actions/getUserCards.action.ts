'use server';

import { z } from 'zod';
import { type ActionResult, handleActionResult } from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import { getCardImageUrl } from '../lib/cardAssets';
import { UserCardResponseSchema, UserIdSchema } from './getUserCards.schema';

async function getCurrentUserId(): Promise<number> {
  return 1;
}

export async function getUserCardsAction(): Promise<
  ActionResult<z.infer<typeof UserCardResponseSchema>[]>
> {
  try {
    const userId = UserIdSchema.parse(await getCurrentUserId());

    const cards = await prisma.userCard.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        cardType: true,
        cardNumber: true,
        balance: true,
        isDefault: true,
      },
    });
    const data = z.array(UserCardResponseSchema).parse(
      cards.map((c) => ({
        id: c.id,
        cardType: c.cardType,
        cardNumber: c.cardNumber,
        balance: c.balance.toString(),
        isDefault: c.isDefault,
        imageUrl: getCardImageUrl(c.cardType),
      })),
    );
    console.log('user', userId);
    console.log('cards', data);
    return { success: true, data };
  } catch (err) {
    return handleActionResult(err);
  }
}
