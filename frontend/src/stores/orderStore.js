import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useCartStore } from "./cartStore";

export const useOrderStore = create((set, get) => ({
  order: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    shippingAddress: {},
    paymentMethod: null,
    paymentStatus: null,
    isPaid: null,
    grandTotal: 0,
  },
  error: null,
  isGettingOrder: false,
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
      set({ error: null });
    }
  },

  getMyOrder: async () => {
    set({ isGettingOrder: true });
    try {
      const res = await axiosInstance.get("api/v1/order/getMyOrder");
      const data = res.data?.data || {};
      const normalizedOrder = data.order
        ? data.order
        : {
            items: data.items || [],
            totalQuantity: data.totalQuantity || 0,
            totalPrice: data.totalPrice || 0,
            shippingAddress: data.shippingAddress || 0,
            paymentMethod: data.paymentMethod,
            paymentStatus: data.paymentStatus,
            isPaid: data.isPaid,
            grandTotal: data.grandTotal || 0,
          };
      set({ order: normalizedOrder });
      console.log(normalizedOrder);
    } catch (error) {
      console.log("An error occured");
      set({ error: error.message || "Failed to fetch product" });
      toast.error(error.message || "Failed to fetch product");
    } finally {
      set({ isGettingOrder: false });
    }
  },
}));
