import { z } from 'zod';
import { type LanguageId, NAME_TO_ID } from '../constants/language';
import { LanguageInfoSchema } from './adminApplication.schema';

export const IdSchema = z.number().int().positive(); // ID는 양의 정수
export const SubmitSchema = z.object({
  hospitalId: IdSchema,
  languageIds: z
    .array(z.string())
    .min(1, '최소 하나의 언어를 선택해야 합니다.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
});
export const SearchSchema = z.string().max(50);
export const LanguageTransformSchema = z
  .array(z.string())
  .transform((langs) =>
    langs
      .map((name) => NAME_TO_ID[name])
      .filter((id): id is LanguageId => !!id),
  );

export const RegistrationDetailSchema = z.object({
  hospitalId: z.number(),
  applicantEmail: z.string(),
  hospitalName: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  requestLangs: z.array(LanguageInfoSchema),
  createdAt: z.date(),
  processedAt: z.date().nullable(),
  history: z.array(
    z.object({
      id: z.number(),
      status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
      createdAt: z.date(),
      processedAt: z.date().nullable(),
    }),
  ),
});

export type RegistrationDetailResponse = z.infer<
  typeof RegistrationDetailSchema
>;
