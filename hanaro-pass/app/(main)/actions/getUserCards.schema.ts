import { z } from 'zod';
import { CardType } from '@/lib/generated/prisma/client';

export const UserIdSchema = z.number().int().positive();

export const UserCardResponseSchema = z.object({
  id: z.number().int(),
  cardType: z.nativeEnum(CardType),
  balance: z.string(),
  isDefault: z.boolean(),
  imageUrl: z.string(),
});

export type UserCardResponse = z.infer<typeof UserCardResponseSchema>;
