import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  isAddingProduct: false,
  products: [],
  addProduct: async (productData) => {
    set({ isAddingProduct: true });
    try {
      const { images = [], imagePreview, ...rest } = productData;
      const formData = new FormData();

      // Append primitive / top-level fields individually so backend receives them directly
      if (rest.name) formData.append("name", rest.name);
      if (rest.brand) formData.append("brand", rest.brand);
      if (rest.category) formData.append("category", rest.category);
      if (rest.subCategory) formData.append("subCategory", rest.subCategory);
      if (rest.basePrice !== undefined && rest.basePrice !== null)
        formData.append("basePrice", String(rest.basePrice));
      if (rest.currency) formData.append("currency", rest.currency);
      if (rest.description) formData.append("description", rest.description);
      if (rest.size) formData.append("size", rest.size);
      if (rest.gender) formData.append("gender", rest.gender);

      // Nested objects: stringify each one separately (backend parses them individually)
      if (rest.discount)
        formData.append("discount", JSON.stringify(rest.discount));
      if (rest.stock) formData.append("stock", JSON.stringify(rest.stock));
      if (rest.rating) formData.append("rating", JSON.stringify(rest.rating));
      // NOTE: shipping.options currently collected as array of strings; backend schema expects array of objects {method,cost,estimated_days}
      // TODO: Align backend schema or enrich frontend to send objects. For now we send as-is.
      if (rest.shipping)
        formData.append("shipping", JSON.stringify(rest.shipping));

      images.forEach((file) => formData.append("images", file));

      const res = await axiosInstance.post("products", formData);

      if (res?.data?.data?.product) {
        set((state) => ({
          products: [res.data.data.product, ...state.products],
        }));
      }

      toast.success("New product added");
      return { success: true };
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add product";
      // Duplicate key (e.g., unique product name) handling
      if (
        error?.response?.data?.error?.code === 11000 ||
        /E11000 duplicate key/.test(message)
      ) {
        message = "A product with that name already exists";
      }
      toast.error(message);
      return { success: false, error: message };
    } finally {
      set({ isAddingProduct: false });
    }
  },
}));
