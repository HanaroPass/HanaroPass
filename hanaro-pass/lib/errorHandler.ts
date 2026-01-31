import { z } from 'zod';

export type ActionResult<T> =
  | { success: true; data: T; message?: string }
  | { success: false; message: string; status: number };

export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

type WithMessage = { message: string };

export const isErrorWithMessage = (err: unknown): err is WithMessage =>
  err instanceof Error ||
  (typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as Record<string, unknown>).message === 'string');

/** * Server Action은 NextResponse를 반환하지 않고
 * 직렬화 가능한 객체를 반환해야 하므로 형식을 맞춥니다.
 */
export const handleActionResult = (err: unknown): ActionResult<never> => {
  if (err instanceof z.ZodError) {
    return {
      success: false,
      message: err.issues[0]?.message ?? '요청 값이 올바르지 않습니다.',
      status: 400,
    };
  }

  if (err instanceof HttpError) {
    return {
      success: false,
      message: err.message,
      status: err.status,
    };
  }

  if (isErrorWithMessage(err)) {
    console.error('Server System Error:', err.message);
    return {
      success: false,
      message: '처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      status: 500,
    };
  }

  return {
    success: false,
    message: '알 수 없는 오류가 발생했습니다.',
    status: 500,
  };
};
