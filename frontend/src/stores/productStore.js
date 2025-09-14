import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  product: null,
  error: null,
  isLoading: false,

  fetchProduct: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("api/v1/products");
      set({ products: res.data.data.products });
      console.log(res);
    } catch (error) {
      console.log("An error occured :", error);
      set({ error: error.message || "Failed to fetch products" });
    } finally {
      set({ isLoading: false });
    }
  },

  singleProduct: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance(`api/v1/products/${id}`);
      console.log(res);
      set({ product: res.data.data.product });
    } catch (error) {
      console.log("An error occured");
      set({ error: error.message || "Failed to fetch product" });
      toast.error(error.message || "Failed to fetch product");
    } finally {
      set({ isLoading: false });
    }
  },
}));
