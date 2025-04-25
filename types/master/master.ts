type MenuPermission = {
  canRead?: boolean;
  canCreate?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
};

type MenuGroup = {
  isHeader: boolean;
  title: string;
};

type MultiMenuItem = {
  title: string;
  icon?: string;
  href?: string;
} & MenuPermission;

type ChildMenuItem = {
  title: string;
  icon?: string;
  href?: string;
  multi_menu?: MultiMenuItem[];
} & MenuPermission;

type Menu = {
  title: string;
  icon?: string;
  href?: string;
  group?: MenuGroup;
  child?: ChildMenuItem[];
} & MenuPermission;

type MasterStore = {
  menus_list: Menu[];
  loading: boolean;
  error: string | null;
  fetchMenus: () => Promise<void>;
};
