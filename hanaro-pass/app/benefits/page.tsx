import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Coupon from './components/coupon/Coupon';

function page() {
  return (
    <div className="px-4 pt-2">
      <div className="flex items-center gap-1 bg-gray-100 px-3">
        <Search />
        <Input placeholder="쿠폰 검색" className="border-none outline-none" />
      </div>
      <Coupon />
    </div>
  );
}

export default page;
