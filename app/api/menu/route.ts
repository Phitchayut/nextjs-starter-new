export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const menus_permission = [
    {
      title: 'dashboard',
      icon: 'duo-icons:dashboard',
      href: '/dashboard',
      canRead: true,
      canCreate: true,
      canUpdate: true,
      canDelete: true,
      group: {
        isHeader: true,
        title: 'application',
      },
    },
    {
      title: 'CRUD',
      icon: 'solar:user-bold-duotone',
      href: '/user',
      canRead: true,
      canCreate: true,
      canUpdate: true,
      canDelete: true,
      group: {
        isHeader: true,
        title: 'application',
      },
    },
    {
      title: 'Settings',
      icon: 'lets-icons:setting-line',
      canRead: true,
      canCreate: true,
      canUpdate: true,
      canDelete: true,
      group: {
        isHeader: true,
        title: 'application',
      },
      child: [
        {
          title: 'Role Settings',
          href: '/settings',
          canRead: true,
          canCreate: true,
          canUpdate: true,
          canDelete: true,
        },
      ],
    },
    // {
    //   title: 'Menu And Submenu',
    //   icon: 'ic:twotone-menu-book',
    //   href: '#',
    //   canRead: true,
    //   canCreate: true,
    //   canUpdate: true,
    //   canDelete: true,
    //   group: {
    //     isHeader: true,
    //     title: 'Menu',
    //   },
    //   child: [
    //     {
    //       title: 'Submenu 1',
    //       href: '/submenu1',
    //       canRead: true,
    //       canCreate: true,
    //       canUpdate: true,
    //       canDelete: true,
    //     },
    //     {
    //       title: 'Submenu 2',
    //       href: '/submenu2',
    //       canRead: true,
    //       canCreate: true,
    //       canUpdate: true,
    //       canDelete: true,
    //     },
    //   ],
    // },
    // {
    //   title: 'Multi Menu',
    //   icon: 'icon-park-twotone:multi-rectangle',
    //   href: '#',
    //   canRead: true,
    //   canCreate: true,
    //   canUpdate: true,
    //   canDelete: true,
    //   group: {
    //     isHeader: true,
    //     title: 'Menu',
    //   },
    //   child: [
    //     {
    //       title: 'Sub Multi Menu',
    //       icon: 'solar:user-bold-duotone',
    //       canRead: true,
    //       canCreate: true,
    //       canUpdate: true,
    //       canDelete: true,
    //       multi_menu: [
    //         {
    //           title: 'Sub Multi Menu 1',
    //           icon: 'heroicons:information-circle',
    //           href: '/submultimenu1',
    //           canRead: true,
    //           canCreate: true,
    //           canUpdate: true,
    //           canDelete: true,
    //         },
    //         {
    //           title: 'Sub Multi Menu 2',
    //           icon: 'heroicons:information-circle',
    //           href: '/submultimenu2',
    //           canRead: true,
    //           canCreate: true,
    //           canUpdate: true,
    //           canDelete: true,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'about',
    //   icon: 'ix:about',
    //   href: '/about',
    //   canRead: true,
    //   canCreate: true,
    //   canUpdate: true,
    //   canDelete: true,
    //   group: {
    //     isHeader: false,
    //     title: 'Menu',
    //   }
    // },
  ];
  return new Response(JSON.stringify(menus_permission), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
