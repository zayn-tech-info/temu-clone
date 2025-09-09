import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  isAddingProduct: false,
  products: [],
  addProduct: async (productData) => {
    set({ isAddingProduct: true });
    try {
      console.log("Original productData:", productData);
      console.log("Images array:", productData.images);

      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        if (key !== "images" && key !== "imagePreview") {
          formData.append(key, productData[key]);
        }
      });

      if (productData.images && productData.images.length > 0) {
        console.log("Adding images to FormData:", productData.images);
        productData.images.forEach((file, index) => {
          console.log(`File ${index}:`, file);
          formData.append("images", file);
        });
      } else {
        console.log("No images found in productData");
      }

      // Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axiosInstance.post("products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", res.data);

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
