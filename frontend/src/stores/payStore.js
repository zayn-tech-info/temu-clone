import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePayStore = create((set) => ({
  error: null,
  details: null,
  isLoading: false,
  success: false,
  paymentStatus: {
    success: false,
    declined: false,
    noRef: false,
  },

  resetPaymentState: () => {
    set({
      error: null,
      details: null,
      isLoading: false,
      success: false,
      paymentStatus: {
        success: false,
        declined: false,
        noRef: false,
      },
    });
  },

  makePayment: async (data) => {
    set({ isLoading: true, error: null });
    console.log("Data received :", data);
    try {
      const res = await axiosInstance.post("api/v1/pay/", data);
      console.log("Payment initialization response:", res);

      if (res.data.status === "success") {
        const authData = res.data.data;
        const authorization_url = authData?.data?.authorization_url;
        if (authorization_url) {
          if (typeof window !== "undefined") {
            setTimeout(() => {
              window.location.href = authorization_url;
            }, 100);
          } else {
            throw new Error("Unable to redirect to payment page");
          }
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.details?.message ||
        error.message ||
        "Failed to make payment";

      set({
        error: errorMessage,
        isLoading: false,
      });
      toast.error(errorMessage);
    }
  },

  verifyPayment: async (reference) => {
    set({
      paymentStatus: {
        success: false,
        declined: false,
        noRef: false,
      },
      error: null,
      details: null,
    });

    if (!reference) {
      set((state) => ({
        paymentStatus: { ...state.paymentStatus, noRef: true },
      }));
      return;
    }
    try {
      const res = await axiosInstance.get(`api/v1/pay/verify/${reference}`);
      if (res.data.status === "success") {
        const transactionData = res.data.data.data;
        if (transactionData.status === "success") {
          set((state) => ({
            paymentStatus: { ...state.paymentStatus, success: true },
          }));
          set({ details: transactionData });
        } else {
          set((state) => ({
            paymentStatus: { ...state.paymentStatus, declined: true },
          }));
          set({
            error: `Payment ${transactionData.status}: ${
              transactionData.gateway_response ||
              "Transaction was not successful"
            }`,
          });
          toast.error(`Payment ${transactionData.status}`);
        }
      } else {
        set((state) => ({
          paymentStatus: { ...state.paymentStatus, declined: true },
        }));
        set({ error: res.data.message || "Payment verification failed" });
        toast.error(res.data.message || "Payment verification failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.details?.message ||
        error.message ||
        "Failed to verify payment";
      set({ error: errorMessage });
      set((state) => ({
        paymentStatus: { ...state.paymentStatus, declined: true },
      }));
      toast.error(errorMessage);
    }
  },
}));
