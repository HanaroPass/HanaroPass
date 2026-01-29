import { outputType } from '@/app/medical/symptoms/types';

export function parseAIOutput(output: string): outputType {
  try {
    return JSON.parse(output);
  } catch {
    throw new Error('AI 분석 결과 파싱 실패');
  }
}
