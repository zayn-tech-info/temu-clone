import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  isAddingProduct: false,
  authUser: null,
  addProduct: async (productData) => {
    set({ isAddingProduct: true });
    try {
      const res = await axiosInstance.post("products", productData);
      console.log(res);
      console.log(productData);
      set({ authUser: res.data });
      toast.success("New product added");
    } catch (error) {
      set({ authUser: null });
      console.log("An error occured", error);
      toast.error(error.res.data.message);
    } finally {
      set({ isAddingProduct: false });
    }
  },
}));
