import { z } from 'zod';

export const PaymentRequestSchema = z.object({
  cardId: z.number().int().positive().optional(),
  cardNumber: z.string().min(8).max(32).optional(),
  discount: z.number().int().min(0).max(100).optional(),
});

export type PaymentRequest = z.infer<typeof PaymentRequestSchema>;

export type PaymentSuccess = {
  code: 200;
  chargedCardId: number;
  paidAmount: number;
  message: string;
  success: true;
};

export type PaymentFail = {
  code: number;
  message: string;
  success: false;
};

export type PaymentResponse = PaymentSuccess | PaymentFail;
