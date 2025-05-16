import * as auth from "@/services/auth/auth.service";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set, get) => ({
  auths: [],
  auth: null,
  callback: "",
  loading: false,
  error: null,

  // TODO: Auth Store
  getUsersAuth: async (data: any) => {
    set({ loading: true, error: null });
    try {
      // const authentication = await auth.getUsersAuth();
      // console.log("authentication: ", authentication);
      set({ callback: "http://backoffice.tfac.or.th:3000/api/auth/user/azure/login", loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },
}));
