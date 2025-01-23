import { create } from "zustand";
import { getCookie, removeCookie } from "../utils/cookie";

const useAuthStore = create((set) => ({
  authenticated: getCookie("access-token") !== undefined,
  setAuthenticated: (value) => {
    if (value) {
      set({ authenticated: true });
    } else {
      removeCookie("access-token");
      set({ authenticated: false });
    }
  },
}));

export default useAuthStore;
