import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as auth from "@/services/auth/auth.service";

interface AuthStore {
  user: any;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((set) => ({
    user: null,
    loading: false,
    error: null,
    fetchUser: async () => {
      set({ loading: true, error: null });
      try {
        const res = await auth.getUser();
        set({ user: res, loading: false });
      } catch (err) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false });
        } else {
          set({ error: "An unexpected error occurred", loading: false });
        }
      }
    },
  }))
);
