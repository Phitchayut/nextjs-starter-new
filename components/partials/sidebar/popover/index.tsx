'use client';
import React, { useEffect, useState } from 'react';

import { cn, isLocationMatch, getDynamicPath } from '@/lib/utils';
import SidebarLogo from '../common/logo';
// import { menusConfig } from "@/config/menus";
import MenuLabel from '../common/menu-label';
import SingleMenuItem from './single-menu-item';
import SubMenuHandler from './sub-menu-handler';
import NestedSubMenu from '../common/nested-menus';
import { useSidebar, useThemeStore } from '@/store';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';

const PopoverSidebar = ({ trans,menus_list }: { trans: string,menus_list: Menu[] }) => {

  const { collapsed, sidebarBg } = useSidebar();
  const { layout, isRtl } = useThemeStore();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);



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
      className={cn('fixed  top-0  border-r  ', {
        'w-[248px]': !collapsed,
        'w-[72px]': collapsed,
        'm-6 bottom-0   bg-card rounded-md': layout === 'semibox',
        'h-full   bg-card ': layout !== 'semibox',
      })}
    >
      {sidebarBg !== 'none' && (
        <div
          className=" absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${sidebarBg})` }}
        ></div>
      )}
      <SidebarLogo />
      <Separator />
      <ScrollArea
        className={cn('sidebar-menu  h-[calc(100%-80px)] ', {
          'px-4': !collapsed,
        })}
      >
        <ul
          dir={isRtl ? 'rtl' : 'ltr'}
          className={cn(' space-y-1', {
            ' space-y-2 text-center': collapsed,
          })}
        >
          {Object.entries(groupedMenus).map(([groupTitle, items]: [string, any[]], gi) => (
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
                          menuTitle={item.title}
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
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default PopoverSidebar;
