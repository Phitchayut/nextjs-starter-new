import { DashBoard,UserIcon } from '@/components/svg';

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: 'blank',
      icon: DashBoard,
      href: '/blank',
    },
    {
      title: 'CRUD',
      icon: UserIcon,
      href: '/user',
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: 'blank',
        icon: DashBoard,
        href: '/blank',
      },
      {
      title: 'CRUD',
      icon: UserIcon,
      href: '/user',
    },
    ],
    classic: [
      {
        isHeader: true,
        title: 'menu',
      },
      {
        title: 'blank',
        icon: DashBoard,
        href: '/blank',
      },
      {
      title: 'CRUD',
      icon: UserIcon,
      href: '/user',
    },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
