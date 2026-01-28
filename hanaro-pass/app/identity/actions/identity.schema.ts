import { z } from 'zod';

const ISODateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.');

const PassportIdentitySchema = z.object({
  passportNumber: z.string().min(1),
  gender: z.string().min(1),
  issueDate: ISODateSchema,
  expiryDate: ISODateSchema,
  userPhotoUrl: z.string(),
  nationality: z.string().min(1),
});

const ArcIdentitySchema = z.object({
  arcNumber: z.string().min(1),
  residenceStatus: z.string().min(1),
  issueDate: ISODateSchema,
  userPhotoUrl: z.string(),
  nationality: z.string().min(1),
});

export const IdentityDataSchema = z.object({
  passport: PassportIdentitySchema.nullable(),
  arc: ArcIdentitySchema.nullable(),
});

export type IdentityData = z.infer<typeof IdentityDataSchema>;
