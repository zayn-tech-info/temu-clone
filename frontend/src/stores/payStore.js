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

    try {
      console.log("Initiating payment with data:", data);
      const res = await axiosInstance.post("api/v1/pay/", data);
      console.log("Payment initialization response:", res);

      if (res.data.status === "success") {
        const { authorization_url } = res.data.data.data;

        if (authorization_url) {
          console.log("Redirecting to Paystack:", authorization_url);
          // Add a small delay to ensure state is updated before redirect
          setTimeout(() => {
            window.location.href = authorization_url;
          }, 100);
        } else {
          throw new Error("No authorization URL received from payment service");
        }
      } else {
        throw new Error(res.data.message || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);

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
    // Reset payment status before verification
    set({
      paymentStatus: {
        success: false,
        declined: false,
        noRef: false,
      },
      error: null,
      details: null,
    });

    // Check if reference exists
    if (!reference) {
      set((state) => ({
        paymentStatus: { ...state.paymentStatus, noRef: true },
      }));
      return;
    }

    try {
      const res = await axiosInstance.get(`api/v1/pay/verify/${reference}`);

      if (res.data.status === "success") {
        // Check if the transaction was actually successful
        const transactionData = res.data.data.data;

        if (transactionData.status === "success") {
          set((state) => ({
            paymentStatus: { ...state.paymentStatus, success: true },
          }));
          set({ details: transactionData });
          // Remove toast from here to prevent duplicates - UI will show success message
        } else {
          // Transaction exists but was not successful (failed, abandoned, etc.)
          set((state) => ({
            paymentStatus: { ...state.paymentStatus, declined: true },
          }));
          set({
            error: `Payment ${transactionData.status}: ${
              transactionData.gateway_response ||
              "Transaction was not successful"
            }`,
          });
          // Keep error toast for failed payments
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
      console.error("Payment verification error:", error);

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
