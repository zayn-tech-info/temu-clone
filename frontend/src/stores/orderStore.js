import { create } from "zustand";

export const useOrderStore = create((set) => ({
  shippingAddress: {
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
  },
  paymentMethod: "",

  setShippingAddress: (data) =>
    set((state) => ({ shippingAddress: { ...state.shippingAddress, ...data } })),
  setPaymentMethod: (data) =>
    set(() => ({ paymentMethod: data})),
  reset: () =>
    set({
      shippingAddress: {
        fullName: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
      },
      billing: { paymentMethod: "" },
    }),
}));
