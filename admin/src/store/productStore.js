import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  isAddingProduct: false,
  products: [],
  addProduct: async (productData) => {
    set({ isAddingProduct: true });
    try {
      const res = await axiosInstance.post("products", productData);
      console.log("Response:", res.data);
      console.log("Product Data:", productData);

      /*       const currentProducts = get().products;
      set({ products: [...currentProducts, res.data] }); */

      toast.success("New product added");
    } catch (error) {
      console.log("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add product");
      }
    } finally {
      set({ isAddingProduct: false });
    }
  },
}));
