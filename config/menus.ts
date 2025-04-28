import { DashBoard, UserIcon, SettingsIcon } from '@/components/svg';

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
    {
      title: 'Settings',
      icon: SettingsIcon,
      nested: [
        {
          title: "Role Settings",
          child: [
            {
              title: "Users",
              icon: SettingsIcon,
              href: "/settings/users"
            },
            {
              title: "Members",
              icon: SettingsIcon,
              href: "/settings/members"
            },
            {
              title: "Partners",
              icon: SettingsIcon,
              href: "/settings/partners"
            }
          ]
        }
      ]
    }
    ,
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
      {
        title: 'Settings',
        icon: SettingsIcon,
        child: [
          {
            title: "Role Settings",
            icon: SettingsIcon,
            href: "/settings"
          }
        ]
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
      {
        title: 'Settings',
        icon: SettingsIcon,
        child: [
          {
            title: "Role Settings",
            icon: SettingsIcon,
            href: "/settings"
          }
        ]
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
