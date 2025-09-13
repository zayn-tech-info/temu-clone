import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  isAddingProduct: false,
  products: [],
  addProduct: async (productData) => {
    set({ isAddingProduct: true });
    console.log(productData);

    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key !== "images" && key !== "imagePreview") {
          const value = productData[key];
          if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
          ) {
            formData.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
        console.log(formData);
      });

      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((file) => {
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
