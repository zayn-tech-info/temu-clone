import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  isFetchingCart: false,
  cart: { items: [], totalQuantity: 0, totalPrice: 0, shipping: 0, grandTotal: 0 },
  error: null,

  getCart: async () => {
    set({ isFetchingCart: true });
    try {
      const res = await axiosInstance.get("api/v1/cart");
      const data = res.data?.data || {};
      const normalizedCart = data.cart
        ? data.cart
        : {
            items: data.items || [],
            totalQuantity: data.totalQuantity || 0,
            totalPrice: data.totalPrice || 0,
            shipping: data.shipping || 0,
            grandTotal: data.grandTotal || 0,
          };
      set({ cart: normalizedCart });
      console.log(normalizedCart);
    } catch (error) {
      console.log("An error occured");
      set({ error: error.message || "Failed to fetch product" });
      toast.error(error.message || "Failed to fetch product");
    } finally {
      set({ isFetchingCart: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await axiosInstance.post("api/v1/cart/addToCart", {
        productId,
        quantity,
      });
      const data = res.data?.data || {};
      const updatedCart = {
        items: data.items || [],
        totalQuantity: data.totalQuantity || 0,
        totalPrice: data.totalPrice || 0,
        shipping: data.shipping || 0,
        grandTotal: data.grandTotal || 0,
      };
      set({ cart: updatedCart });
      toast.success("Added to cart");
      await get().getCart();
    } catch (error) {
      console.log("An error occured", error);
      set({ error: error.message || "Failed to fetch product" });
      toast.error(error.message || "Failed to fetch product");
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const res = await axiosInstance.delete(`api/v1/cart/removeFromCart/${itemId}`);
      await get().getCart();
      toast.success("Removed from cart");
    } catch (error) {
      console.log("An error occured");
      set({ error: error.message || "Failed to remove item" });
      toast.error(error.message || "Failed to remove item");
    }
  },
  updateCart: async (productId, quantity = 1) => {
    try {
      const res = await axiosInstance.patch("api/v1/cart/updateCart", {
        productId,
        quantity,
      });
      const data = res.data?.data || {};
      const updatedCart = {
        items: data.items || [],
        totalQuantity: data.totalQuantity || 0,
        totalPrice: data.totalPrice || 0,
        shipping: data.shipping || 0,
        grandTotal: data.grandTotal || 0,
      };
      set({ cart: updatedCart });
      toast.success("Cart updated");
      await get().getCart();
    } catch (error) {
      console.log("An error occured :", error)
      set({ error: error.message || "Failed to fetch product" });
      toast.error(error.message || "Failed to fetch product");
    }
  },
  
}));
