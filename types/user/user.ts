type User = {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
};

type UserStore = {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: number) => Promise<void>;
  createUser: (data: User) => Promise<void>;
  updateUser: ({ data, id }: { data: User; id: number }) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};
