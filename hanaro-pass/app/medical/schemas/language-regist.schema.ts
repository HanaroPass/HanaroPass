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
