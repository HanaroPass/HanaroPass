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
    typeof (err as any).message === 'string');

/** * Server Action은 NextResponse를 반환하지 않고
 * 직렬화 가능한 객체를 반환해야 하므로 형식을 맞춥니다.
 */
export const handleActionResult = (err: unknown) => {
  if (err instanceof HttpError) {
    return { success: false, message: err.message, status: err.status };
  }
  if (isErrorWithMessage(err)) {
    return { success: false, message: err.message, status: 500 };
  }
  return {
    success: false,
    message: '알 수 없는 오류가 발생했습니다.',
    status: 500,
  };
};
