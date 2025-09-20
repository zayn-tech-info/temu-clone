import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useCartStore } from "./cartStore";

export const useOrderStore = create((set, get) => ({
  order: null,
  error: null,
  isPlacingOrder: false,
  shippingAddress: {
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    state: "",
    zipCode: "",
  },
  paymentMethod: "",

  setShippingAddress: (data) =>
    set((state) => ({
      shippingAddress: { ...state.shippingAddress, ...data },
    })),
  setPaymentMethod: (data) => set(() => ({ paymentMethod: data })),
  reset: () =>
    set({
      shippingAddress: {
        fullName: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        street: "",
        state: "",
        zipCode: "",
      },
      paymentMethod: "",
    }),

  createOrder: async (data) => {
    try {
      set({ isPlacingOrder: true });
      const res = await axiosInstance.post("api/v1/order/createOrder", data);
      set({ order: res.data });
      console.log("Order content :", res);
      toast.success("Order placed successfully");
      try {
        await useCartStore.getState().getCart();
      } catch (e) {
        console.warn("Failed to refresh cart after order:", e);
      }
      get().reset();
    } catch (error) {
      console.log(error);
      console.log("An error occured", error);
      set({ error: error.message || "Failed to fetch product" });
      toast.error(error.message || "Failed to fetch product");
      set({ isPlacingOrder: false });
    } finally {
      set({ isPlacingOrder: false });
      set({error: null})
    }
  },
}));
