import { create } from "zustand";
import { getCookie } from "../utils/cookie";

const useAuthStore = create((set) => ({
  authenticated: getCookie("access-token") !== undefined,
  actions: {
    setAuthenticated: (value) => set({ authenticated: value }),
  },
}));

export const useAuthenticated = () =>
  useAuthStore((state) => state.authenticated);
export const useAuthAction = () => useAuthStore((state) => state.actions);
