'use client';
import React, { useState } from 'react';
import { cn, isLocationMatch, getDynamicPath } from '@/lib/utils';
import { useSidebar, useThemeStore } from '@/store';
import SidebarLogo from '../common/logo';
import { menusConfig } from '@/config/menus';
import MenuLabel from '../common/menu-label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import SingleMenuItem from './single-menu-item';
import SubMenuHandler from './sub-menu-handler';
import NestedSubMenu from '../common/nested-menus';
const ClassicSidebar = ({
  trans,
  menus_list,
}: {
  trans: string;
  menus_list: Menu[];
}) => {
  const { sidebarBg } = useSidebar();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  const { collapsed, setCollapsed } = useSidebar();
  const { isRtl } = useThemeStore();
  const [hovered, setHovered] = useState<boolean>(false);

  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  React.useEffect(() => {
    let subMenuIndex: number | null = null;
    let multiMenuIndex: number | null = null;
    menus_list?.map((item: any, i: number) => {
      if (item?.child) {
        item.child
          ?.filter((child: any) => child?.canRead !== false)
          .map((childItem: any, j: number) => {
            if (isLocationMatch(childItem.href, locationName)) {
              subMenuIndex = i;
            }
            if (childItem?.multi_menu) {
              childItem.multi_menu
                .filter((m: any) => m?.canRead !== false)
                .map((multiItem: any, k: number) => {
                  if (isLocationMatch(multiItem.href, locationName)) {
                    subMenuIndex = i;
                    multiMenuIndex = j;
                  }
                });
            }
          });
      }
    });
    setActiveSubmenu(subMenuIndex);
    setMultiMenu(multiMenuIndex);
  }, [locationName]);

  const groupedMenus = menus_list
    .filter((item) => item.canRead !== false)
    .reduce((acc: Record<string, any[]>, item) => {
      const groupTitle = item.group?.title || 'default';
      if (!acc[groupTitle]) acc[groupTitle] = [];
      acc[groupTitle].push(item);
      return acc;
    }, {});

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'fixed  z-[999] top-0  bg-card h-full hover:!w-[248px]  border-r  ',
        {
          'w-[248px]': !collapsed,
          'w-[72px]': collapsed,
          'shadow-md': collapsed || hovered,
        }
      )}
    >
      {sidebarBg !== 'none' && (
        <div
          className=" absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${sidebarBg})` }}
        ></div>
      )}

      <SidebarLogo hovered={hovered} />

      <ScrollArea
        className={cn('sidebar-menu  h-[calc(100%-80px)] ', {
          'px-4': !collapsed || hovered,
        })}
      >
        <ul
          dir={isRtl ? 'rtl' : 'ltr'}
          className={cn(' space-y-1', {
            ' space-y-2 text-center': collapsed,
            'text-start': collapsed && hovered,
          })}
        >
          {Object.entries(groupedMenus).map(
            ([groupTitle, items]: [string, any[]], gi) => (
              <React.Fragment key={`group_${gi}`}>
                {!collapsed && (
                  <MenuLabel item={{ title: groupTitle }} trans={trans} />
                )}
                {items.map((item, i) => (
                  <li key={`menu_key_${gi}_${i}`}>
                    {/* single menu  */}
                    {!item.child && !item.isHeader && (
                      <SingleMenuItem
                        item={item}
                        collapsed={collapsed}
                        hovered={hovered}
                        trans={trans}
                      />
                    )}

                    {/* sub menu */}
                    {item.child &&
                      item.child.some((child) => child.canRead !== false) && (
                        <>
                          <SubMenuHandler
                           item={item}
                           toggleSubmenu={toggleSubmenu}
                           index={i}
                           activeSubmenu={activeSubmenu}
                           collapsed={collapsed}
                           hovered={hovered}
                           trans={trans}
                          />
                          {!collapsed && (
                            <NestedSubMenu
                              toggleMultiMenu={toggleMultiMenu}
                              activeMultiMenu={activeMultiMenu}
                              activeSubmenu={activeSubmenu}
                              item={{
                                ...item,
                                child: item.child
                                  .filter(
                                    (child: any) => child?.canRead !== false
                                  )
                                  .map((child: any) => ({
                                    ...child,
                                    multi_menu: child.multi_menu?.filter(
                                      (m: any) => m.canRead !== false
                                    ),
                                  })),
                              }}
                              index={i}
                              trans={trans}
                            />
                          )}
                        </>
                      )}
                  </li>
                ))}
              </React.Fragment>
            )
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default ClassicSidebar;
