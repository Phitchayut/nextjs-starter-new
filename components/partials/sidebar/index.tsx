'use client';
import React, { useEffect } from 'react';
import { useSidebar, useThemeStore } from '@/store';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import ModuleSidebar from './module';
import PopoverSidebar from './popover';
import ClassicSidebar from './classic';
import MobileSidebar from './mobile-sidebar';
import { useMasterStore } from '@/store/master/masterStore';

const Sidebar = ({ trans }: { trans: string }) => {
  const { sidebarType, collapsed } = useSidebar();
  const menus_list = useMasterStore((state) => state.menus_list);
  const fetchMenus = useMasterStore((state) => state.fetchMenus);

  useEffect(() => {
    fetchMenus();
  }, []);

  
  const { layout } = useThemeStore();

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  let selectedSidebar: JSX.Element | null = null;

  if (!isDesktop && (sidebarType === 'popover' || sidebarType === 'classic')) {
    selectedSidebar = <MobileSidebar trans={trans}/>;
  } else {
    const sidebarComponents: { [key: string]: JSX.Element } = {
      module: <ModuleSidebar trans={trans} menus_list={menus_list}/>,
      popover: <PopoverSidebar trans={trans} menus_list={menus_list} />,
      classic: <ClassicSidebar trans={trans} menus_list={menus_list} />,
    };

    selectedSidebar = sidebarComponents[sidebarType] || (
      <PopoverSidebar trans={trans} menus_list={menus_list} />
    );
  }

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
