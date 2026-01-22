import { MAIN_MENUS, type MainPageKey } from '@/constants/mainMennu';
import Menu from './Menu';

type MenuListProps = {
  type: MainPageKey;
};

function MenuList({ type }: MenuListProps) {
  return (
    <div className="flex flex-col gap-2">
      {MAIN_MENUS[type].map((menu) => (
        <Menu
          key={menu.label}
          label={menu.label}
          icon={menu.icon}
          link={menu.link}
        />
      ))}
    </div>
  );
}

export default MenuList;
