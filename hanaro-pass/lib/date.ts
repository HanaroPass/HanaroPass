export function getRelativeTime(date: Date | string) {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const min = 60 * 1000;
  const hour = min * 60;
  const day = hour * 24;

  if (diff < min) return '방금 전';
  if (diff < hour) return `${Math.floor(diff / min)}분 전`;
  if (diff < day) return `${Math.floor(diff / hour)}시간 전`;
  if (diff < day * 7) return `${Math.floor(diff / day)}일 전`;

  // 7일 이상 지난 경우 날짜 형식 표시
  return past.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
