export function filterHour(openHours: string) {
  const [openTime, closeTime] = openHours.split(' - ');
  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);

  const now = new Date();
  const openDate = new Date();
  openDate.setHours(openH, openM, 0, 0);

  const closeDate = new Date();
  closeDate.setHours(closeH, closeM, 0, 0);

  const status: '진료 중' | '진료 종료' =
    now < openDate || now > closeDate ? '진료 종료' : '진료 중';

  return { openTime, closeTime, status };
}
