export const COUPON_CATEGORY_TABS = [
  { value: 'all', label: '전체' },
  { value: 'food', label: '푸드' },
  { value: 'fashion', label: '패션' },
  { value: 'beauty', label: '뷰티' },
  { value: 'activity', label: '액티비티' },
  { value: 'trip', label: '여행/숙박' },
] as const;

export type CouponCategory = (typeof COUPON_CATEGORY_TABS)[number]['value'];
