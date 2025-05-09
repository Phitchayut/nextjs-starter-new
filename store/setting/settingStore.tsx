import * as setting from "@/services/setting/setting.service";
import { create } from "zustand";

export const useSettingStore = create<SettingStore>((set, get) => ({
  settings: [],
  setting: null,
  roles: [],
  role: null,
  loading: false,
  error: null,
  partners: [],
  page: 1,
  sort: "partner_id:ASC",
  setPage: page => set({ page }),
  setSort: sort => set({ sort }),

  getRolesSetting: async (scpoeId: number) => {
    set({ loading: true, error: null });
    try {
      const scopes = await setting.getRolesSetting(scpoeId);

      console.log("sssss: ", scopes);

      set({ roles: scopes.roles, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  // TODO: Users Store
  getUsersSetting: async () => {
    set({ loading: true, error: null });
    try {
      const settings = await setting.getUsersSetting();
      set({ settings: settings, loading: false });
      console.log(settings);
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  createUsersSetting: async (data: Settings) => {
    set({ loading: true, error: null });
    try {
      await setting.createUsersSetting(data);
      const settings = await setting.getUsersSetting();
      set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  editUsersSetting: async (data: Settings, id: number) => {
    set({ loading: true, error: null });
    try {
      await setting.updateUsersSetting(data, id);
      const settings = await setting.getUsersSetting();
      set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  deleteUsersSetting: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await setting.deleteUsersSetting(id);
      const settings = await setting.getUsersSetting();
      set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  // TODO: Partners Store
  getPartnersSetting: async () => {
    set({ loading: true, error: null });
    try {
      const { page, sort } = get();
      const data = await setting.getPartnersSetting({ page, sort });
      set({ partners: data, loading: false });
    } catch (err: any) {
      console.log(err);
      set({ error: err.message || "Unknown error" });
    } finally {
      set({ loading: false });
    }
  },

  createPartnersSetting: async (data: Settings) => {
    set({ loading: true, error: null });
    try {
      await setting.createPartnersSetting(data);
      // const settings = await setting.getPartnersSetting();
      // set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  editPartnersSetting: async (data: Settings, id: number) => {
    set({ loading: true, error: null });
    try {
      await setting.updatePartnersSetting(data, id);
      // const settings = await setting.getPartnersSetting();
      // set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  deletePartnersSetting: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await setting.deletePartnersSetting(id);
      // const settings = await setting.getPartnersSetting();
      // set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  // TODO: Members Store
  getMembersSetting: async () => {
    set({ loading: true, error: null });
    try {
      const settings = await setting.getMembersSetting();
      set({ settings: settings, loading: false });
      console.log(settings);
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },

  createMembersSetting: async (data: Settings) => {
    set({ loading: true, error: null });
    try {
      await setting.createMembersSetting(data);
      const settings = await setting.getMembersSetting();
      set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  editMembersSetting: async (data: Settings, id: number) => {
    set({ loading: true, error: null });
    try {
      await setting.updateMembersSetting(data, id);
      const settings = await setting.getMembersSetting();
      set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
  deleteMembersSetting: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await setting.deleteMembersSetting(id);
      const settings = await setting.getMembersSetting();
      set({ settings, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
}));
