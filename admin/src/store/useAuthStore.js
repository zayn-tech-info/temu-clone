import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  
  checkAuth: async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }
      const res = await axiosInstance.get("auth/check");

      if (res.data && res.data.user && res.data.user.role === "admin") {
        set({ authUser: { user: res.data } });
      } else if (res.data && res.data.role === "admin") {
        set({ authUser: { user: res.data } });
      } else {
        Cookies.remove("token");
        window.location.href = "http://localhost:5173/login";
        set({ authUser: null });
      }
    } catch (error) {
      Cookies.remove("token");
      window.location.href = "http://localhost:5173/login";
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: () => {
    Cookies.remove("token");
    window.location.href = "http://localhost:5173/login";
    set({ authUser: null });
  },
}));
