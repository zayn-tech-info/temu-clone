import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const usePayStore = create((set) => ({
  pay: async (data) => {
    try {
      const res = axiosInstance.post("api/v1/pay/", data);
      console.log(res);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  },
}));
