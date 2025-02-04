import { create } from "zustand";
import { getCookie } from "../utils/cookie";

const useAuthStore = create((set) => ({
  authenticated: getCookie("access-token") !== undefined,
  userInfo: {},
  actions: {
    setAuthenticated: (value) => set({ authenticated: value }),
    setUserInfo: (user) => set({ userInfo: user }),
  },
}));

export const useAuthenticated = () =>
  useAuthStore((state) => state.authenticated);
export const useUserInfo = () => useAuthStore((state) => state.userInfo);
export const useAuthAction = () => useAuthStore((state) => state.actions);
