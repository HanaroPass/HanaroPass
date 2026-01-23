import { MenuList, PrimaryMenuList } from './MenuList';

function Service() {
  return (
    <div className="flex flex-col gap-4">
      <PrimaryMenuList type="service" />
      <MenuList type="service" />
    </div>
  );
}

export default Service;
