import CouponList from './CouponList';
import MenuList from './MenuList';

function Pay() {
  return (
    <div className="flex flex-col gap-5">
      <CouponList />
      <MenuList type="pay" />
    </div>
  );
}

export default Pay;
