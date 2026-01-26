import { z } from 'zod';

const CardNumberSchema = z
  .string()
  .trim()
  .min(8, 'cardNumber가 너무 짧습니다.')
  .max(32, 'cardNumber가 너무 깁니다.')
  .regex(/^[0-9]+$/, 'cardNumber는 숫자 문자열이어야 합니다.');

const CouponIdSchema = z
  .number()
  .int('couponId는 정수여야 합니다.')
  .positive('couponId는 양수여야 합니다.');

export const PaymentRequestSchema = z
  .object({
    cardNumber: CardNumberSchema.optional(),
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
});

export type PaymentResponse = z.infer<typeof PaymentResponseSchema>;
