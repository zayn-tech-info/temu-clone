import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      console.log(res);
      set({ authUser: res.data });
    } catch (error) {
      console.log("An error occured: " + error, error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    console.log("data recieved:", data);
    try {
      const res = await axiosInstance.post("auth/signup", data);
      console.log(res);
      set({ authUser: res.data });
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
      const res = await axiosInstance.post("auth/login", data);
      console.log(res);
      set({ authUser: res.data });
      toast.success("User logged in");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
