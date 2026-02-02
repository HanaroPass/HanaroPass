import { z } from 'zod';

const BarcodeTokenSchema = z
  .string()
  .trim()
  .min(20, 'barcodeToken이 너무 짧습니다.')
  .max(200, 'barcodeToken이 너무 깁니다.');

const CouponIdSchema = z
  .number()
  .int('couponId는 정수여야 합니다.')
  .positive('couponId는 양수여야 합니다.');

export const PaymentRequestSchema = z
  .object({
    barcodeToken: BarcodeTokenSchema.optional(),
    couponId: CouponIdSchema.optional(),
  })
  .strict();

export type PaymentRequest = z.infer<typeof PaymentRequestSchema>;

export const PaymentResponseSchema = z.object({
  code: z.literal(200),
  chargedCardId: z.number().int().positive(),
  paidAmount: z.number().int().nonnegative(),
  message: z.string(),
  success: z.literal(true),
  listPrice: z.number().int().positive(),
  discountRate: z.number().int().nonnegative(),
  savedAmount: z.number().int().nonnegative(),
});

export type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

export const TopUpCardRequestSchema = z
  .object({
    cardId: z.number().int().positive(),
    amount: z.number().int().positive().min(1_000).max(1_000_000),
  })
  .strict();

export type TopUpCardRequest = z.infer<typeof TopUpCardRequestSchema>;

export const TopUpCardResponseSchema = z
  .object({
    code: z.literal(200),
    chargedCardId: z.number().int().positive(),
    amount: z.number().int().positive(),
    message: z.string(),
    success: z.literal(true),
  })
  .strict();

export type TopUpCardResponse = z.infer<typeof TopUpCardResponseSchema>;
