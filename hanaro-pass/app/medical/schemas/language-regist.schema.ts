import { z } from 'zod';
import { type LanguageId, NAME_TO_ID } from '../constants/language';

export const IdSchema = z.number().int().positive(); // ID는 양의 정수
export const SubmitSchema = z.object({
  hospitalId: IdSchema,
  languageIds: z
    .array(z.string())
    .min(1, '최소 하나의 언어를 선택해야 합니다.'),
});
export const SearchSchema = z.string().max(50);
export const LanguageTransformSchema = z
  .array(z.string())
  .transform((langs) =>
    langs
      .map((name) => NAME_TO_ID[name])
      .filter((id): id is LanguageId => !!id),
  );

export const ApplicationHistorySchema = z.object({
  id: z.number(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  createdAt: z.coerce.date(),
  processedAt: z.coerce.date().nullable(),
});

export const RegistrationDetailSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable().optional(),
  hospitalName: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  requestLangs: z.array(z.string()),
  createdAt: z.coerce.date(),
  processedAt: z.coerce.date().nullable(),
  allApplications: z.array(ApplicationHistorySchema),
});

export type RegistrationDetailResponse = z.infer<
  typeof RegistrationDetailSchema
>;

export type ApplicationHistoryItem = z.infer<typeof ApplicationHistorySchema>;
