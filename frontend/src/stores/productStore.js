import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  error: null,
  isLoading: false,

  fetchProduct: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("api/v1/products");
      set({ products: res.data.data.products });
      console.log(res.data.dat.products);
    } catch (error) {
      console.log("An error occured");
      set({ error: error.message || "Failed to fetch products" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
