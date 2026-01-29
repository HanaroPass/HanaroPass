export function toNumber(v: unknown, fieldName: string) {
  if (typeof v === 'number') {
    if (!Number.isFinite(v)) throw new Error(`${fieldName} is not finite`);
    return v;
  }
  if (typeof v === 'bigint') {
    const n = Number(v);
    if (!Number.isSafeInteger(n)) {
      throw new Error(`${fieldName}가 숫자 범위를 넘었습니다.`);
    }
    return n;
  }
  if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) {
    const n = Number(v);
    if (!Number.isFinite(n)) throw new Error(`${fieldName} is not finite`);
    return n;
  }
  throw new Error(`${fieldName}: unsupported type ${typeof v}`);
}
