import { z } from 'zod';

const ISODateSchema = z
  .string()
  .min(10, '날짜를 입력해주세요.')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.');

const NameSchema = {
  lastName: z.string().min(1, '성을 입력해주세요.'),
  firstName: z.string().min(1, '이름을 입력해주세요.'),
};

export const PassportIdentitySchema = z.object({
  passportNumber: z.string().min(1, '여권번호를 입력해주세요.'),
  gender: z.string().min(1, '성별을 선택해주세요.'),
  issueDate: ISODateSchema,
  expiryDate: ISODateSchema,
  userPhotoUrl: z.string().optional().default(''),
  nationality: z.string().min(1, '국적을 선택해주세요.'),
});

export const PassportFormSchema = PassportIdentitySchema.extend(NameSchema);

export const ArcIdentitySchema = z.object({
  arcNumber: z.string().length(14, '외국인 등록번호를 입력해주세요.'),
  residenceStatus: z.string().min(1, '체류 자격을 입력해주세요.'),
  issueDate: ISODateSchema,
  userPhotoUrl: z.string().optional().default(''),
  nationality: z.string().min(1, '국적을 선택해주세요.'),
});

export const ArcFormSchema = ArcIdentitySchema.extend(NameSchema);

export const IdentityDataSchema = z.object({
  passport: PassportIdentitySchema.nullable(),
  arc: ArcIdentitySchema.nullable(),
});

export type IdentityData = z.infer<typeof IdentityDataSchema>;
