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
}

interface Role {
  scopeId: number;
  scopeName: string;
}

interface Partner {
  partner_id: number;
  partner_name: string;
  partner_email: string;
  password_hash: string;
  api_key: string;
  status: string;
  create_date: string;
  update_date: string;
  role_id: number;
  role: {
    role_id: number;
    role_name: string;
    role_status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
}

interface PartnersResponse {
  data: Partner[];
  total?: number;
}

type SettingStore = {
  settings: Settings[];
  setting: Settings | null;
  roles: Role[];
  role: Role | null;
  partners: Partner[];
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  sort: string;
  setSort: (sort: string) => void;

  getRolesSetting: (scopeId: number) => Promise<void>;
  getUsersSetting: () => Promise<void>;
  createUsersSetting: (data: Settings) => Promise<void>;
  editUsersSetting: (data: Settings, id: number) => Promise<void>;
  deleteUsersSetting: (id: number) => Promise<void>;
  getPartnersSetting: () => Promise<void>;
  createPartnersSetting: (data: Settings) => Promise<void>;
  editPartnersSetting: (data: Settings, id: number) => Promise<void>;
  deletePartnersSetting: (id: number) => Promise<void>;
  getMembersSetting: () => Promise<void>;
  createMembersSetting: (data: Settings) => Promise<void>;
  editMembersSetting: (data: Settings, id: number) => Promise<void>;
  deleteMembersSetting: (id: number) => Promise<void>;
};
