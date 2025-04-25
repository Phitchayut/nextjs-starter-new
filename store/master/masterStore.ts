import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import * as master from '@/services/master/master.service';

export const useMasterStore = create<MasterStore>()(
  subscribeWithSelector((set) => ({
    menus_list: [],
    loading: false,
    error: null,
    fetchMenus: async () => {
      set({ loading: true, error: null });
      try {
        const res = await master.getMenus();
        set({ menus_list: res, loading: false });
      } catch (err) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false });
        } else {
          set({ error: 'An unexpected error occurred', loading: false });
        }
      }
    },
  }))
);
