import { z } from 'zod';

const parseLocalDate = (date: string) => {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d)
    return null;
  dt.setHours(0, 0, 0, 0);
  return dt;
};

const PastDateSchema = z
  .string()
  .min(1, '날짜를 선택해주세요.')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.')
  .refine(
    (date) => {
      const selectedDate = parseLocalDate(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !!selectedDate && selectedDate <= today;
    },
    { message: '발급일자를 확인해주세요.' },
  );

const FutureDateSchema = z
  .string()
  .min(1, '날짜를 선택해주세요.')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.')
  .refine(
    (date) => {
      const selectedDate = parseLocalDate(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !!selectedDate && selectedDate >= today;
    },
    { message: '만료일은 오늘 이후여야 합니다.' },
  );

const NameSchema = {
  lastName: z.string().min(1, '성을 입력해주세요.'),
  firstName: z.string().min(1, '이름을 입력해주세요.'),
};

export const PassportIdentitySchema = z.object({
  passportNumber: z.string().min(1, '여권번호를 입력해주세요.'),
  gender: z.string().min(1, '성별을 선택해주세요.'),
  issueDate: PastDateSchema,
  expiryDate: FutureDateSchema,
  userPhotoUrl: z.string().optional().default(''),
  nationality: z.string().min(1, '국적을 선택해주세요.'),
});

export const PassportFormSchema = PassportIdentitySchema.extend(NameSchema);

export const ArcIdentitySchema = z.object({
  arcNumber: z
    .string()
    .min(1, '외국인 등록번호를 입력해주세요.')
    .length(14, '외국인 등록번호 13자리를 정확히 입력해주세요.')
    .regex(/^\d{6}-\d{7}$/, '외국인 등록번호 13자리를 정확히 입력해주세요.'),
  residenceStatus: z.string().min(1, '체류 자격을 입력해주세요.'),
  issueDate: PastDateSchema,
  userPhotoUrl: z.string().optional().default(''),
  nationality: z.string().min(1, '국적을 선택해주세요.'),
});

export const ArcFormSchema = ArcIdentitySchema.extend(NameSchema);

export const IdentityDataSchema = z.object({
  passport: PassportIdentitySchema.nullable(),
  arc: ArcIdentitySchema.nullable(),
});

export type IdentityData = z.infer<typeof IdentityDataSchema>;
