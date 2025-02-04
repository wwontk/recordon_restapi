import { create } from "zustand";
import { getCookie } from "../utils/cookie";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      authenticated: getCookie("access-token") !== undefined,
      userInfo: {}, // 🚀 이 값만 localStorage에 저장
      actions: {
        setAuthenticated: (value) => set({ authenticated: value }),
        setUserInfo: (user) => set({ userInfo: user }),
      },
    }),
    {
      name: "auth",
      getStorage: () => localStorage,
      partialize: (state) => ({ userInfo: state.userInfo }), // 🚀 userInfo만 저장
    }
  )
);

export const useAuthenticated = () =>
  useAuthStore((state) => state.authenticated);
export const useUserInfo = () => useAuthStore((state) => state.userInfo);
export const useAuthAction = () => useAuthStore((state) => state.actions);
