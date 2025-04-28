import * as setting from "@/services/setting/setting.service";
import { create } from "zustand";


export const useSettingStore = create<SettingStore>(set => ({
  settings: [],
  setting: null,
  loading: false,
  error: null,

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
}));
