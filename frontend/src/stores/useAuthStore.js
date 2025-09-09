import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const token = Cookies.get("token");
      console.log("checkAuth - Token from cookies:", token);

      if (!token) {
        console.log("checkAuth - No token found, setting authUser to null");
        set({ authUser: null, isCheckingAuth: false });
        return;
      }

      const res = await axiosInstance.get("api/v1/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    console.log("data recieved:", data);
    try {
      const res = await axiosInstance.post("api/v1/auth/signup", data);
      console.log(res);
      if (res.data.token) {
        Cookies.set("token", res.data.token, {
          expires: 7,
          secure: window.location.protocol === "https:",
          sameSite: "lax",
          domain: "localhost", // This allows sharing across different localhost ports
        });
      }

      set({ authUser: res.data });
      if (res.data.user && res.data.user.role === "admin") {
        console.log(
          "Admin user detected during signup, redirecting to admin panel"
        );
        const adminUrl =
          import.meta.env.MODE === "development"
            ? "http://localhost:5174"
            : "https://temu-clone-zayn-admin.vercel.app";
        window.location.href = `${adminUrl}?token=${res.data.token}`;
      }
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("api/v1/auth/login", data);
      if (res.data.token) {
        console.log("Setting cookie with token:", res.data.token);
        Cookies.set("token", res.data.token, {
          expires: 7,
          secure: window.location.protocol === "https:",
          sameSite: "lax",
          domain: "localhost",
        });
      } else {
        console.log("No token in response data");
      }

      set({ authUser: res.data });
      if (res.user && res.user.role === "admin") {
        console.log("Admin user detected, redirecting to admin panel");
        const adminUrl =
          import.meta.env.MODE === "development"
            ? "http://localhost:5174"
            : "https://temu-clone-zayn-admin.vercel.app";
        window.location.href = `${adminUrl}?token=${res.data.token}`;
      } else if (res.data.user && res.data.user.role === "admin") {
        console.log("Admin user detected, redirecting to admin panel");
        const adminUrl =
          import.meta.env.MODE === "development"
            ? "http://localhost:5174"
            : "https://temu-clone-zayn-admin.vercel.app";
        window.location.href = `${adminUrl}?token=${res.data.token}`;
      }
      toast.success("User logged in");
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("api/v1/auth/logout");
      Cookies.remove("token");
      set({ authUser: null });
    } catch (error) {
      console.log(error);
      Cookies.remove("token");
      set({ authUser: null });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during logout");
      }
    }
  },
}));
