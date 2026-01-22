import {
  MAIN_MENUS,
  type MainPageKey,
  PRIMARY_MENUS,
} from '@/constants/mainMenu';
import { Menu, PrimaryMenuCard } from './Menu';

type MenuListProps = {
  type: MainPageKey;
};

export function MenuList({ type }: MenuListProps) {
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

type Props = {
  type: MainPageKey;
};

export function PrimaryMenuList({ type }: Props) {
  const menus = PRIMARY_MENUS[type];
  if (!menus || menus.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {menus.map((menu) => (
        <PrimaryMenuCard
          key={menu.title}
          title={menu.title}
          description={menu.description}
          icon={menu.icon}
          link={menu.link}
        />
      ))}
    </div>
  );
}
