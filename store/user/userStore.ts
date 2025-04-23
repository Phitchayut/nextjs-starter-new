import * as user from '@/services/user/user.service';
import { create } from 'zustand';

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  user: null,
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await user.getUsers();
      set({ users: users, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'An unexpected error occurred', loading: false });
      }
    }
  },
  fetchUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await user.getUser(id);
      set({ user: res, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'An unexpected error occurred', loading: false });
      }
    }
  },
  createUser: async (data: User) => {
    set({ loading: true, error: null });
    try {
      await user.createUser(data);
      const users = await user.getUsers();
      set({ users, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'An unexpected error occurred', loading: false });
      }
    }
  },
  updateUser: async ({data, id}: {data: User, id: number}) => {
    set({ loading: true, error: null });
    try {
      await user.updateUser({data, id});
      const users = await user.getUsers();
      set({ users, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'An unexpected error occurred', loading: false });
      }
    }
  },
  deleteUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await user.deleteUser(id);
      const users = await user.getUsers();
      set({ users, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'An unexpected error occurred', loading: false });
      }
    }
  },
}));
