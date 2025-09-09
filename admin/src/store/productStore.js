import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  isAddingProduct: false,
  products: [],
  addProduct: async (productData) => {
    set({ isAddingProduct: true });
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key !== "images" && key !== "imagePreview") {
          formData.append(key, productData[key]);
        }
      });

      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((file, index) => {
          formData.append("images", file);
        });
      }
      const res = await axiosInstance.post("products", formData);
      toast.success("New product added");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to add product");
      }
    } finally {
      set({ isAddingProduct: false });
    }
  },
}));
