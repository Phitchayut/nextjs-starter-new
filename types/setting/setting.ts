interface Settings {
  id: number;
  user?: {
    name: string;
    avatar: string;
    title?: string;
    email: string;
  };
  role?: {
    id: number;
    name: string;
    scope: number;
  }
  amount?: number;
  status?: string;
  email?: string;
  roles?: string[];
}
interface Role {
  scopeId?: number;
  roles?: string;
}


type SettingStore = {
  settings: Settings[];
  setting: Settings | null;
  roles: any[];
  role: Role | null;
  loading: boolean;
  error: string | null;
  getUsersSetting: () => Promise<void>;
  getRolesSetting: (scopeId: number) => Promise<void>;
  createUsersSetting: (data: Settings) => Promise<void>;
  editUsersSetting: (data: Settings, id: number) => Promise<void>;
  deleteUsersSetting: (id: number) => Promise<void>;
  // fetchUser: (id: number) => Promise<void>;
  // createUser: (data: User) => Promise<void>;
  // updateUser: ({ data, id }: { data: User; id: number }) => Promise<void>;
  // deleteUser: (id: number) => Promise<void>;
};
