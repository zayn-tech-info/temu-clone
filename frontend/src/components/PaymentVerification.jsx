import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePayStore } from "../stores/payStore";
import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Home,
  ShoppingCart,
} from "lucide-react";

const PaymentVerification = () => {
  const { verifyPayment, paymentStatus, error, details } = usePayStore();
  const { success, noRef, declined } = paymentStatus;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownSuccessToast, setHasShownSuccessToast] = useState(false);

  // Paystack sends 'trxref' as the main parameter, but also 'reference'
  const reference = searchParams.get("trxref") || searchParams.get("reference");

  // Get additional parameters from Paystack
  const status = searchParams.get("status");
  const cancelled = status === "cancelled" || status === "failed";

  console.log("Payment callback parameters:", {
    reference,
    status,
    cancelled,
    allParams: Object.fromEntries(searchParams.entries()),
  });

  useEffect(() => {
    const handlePaymentVerification = async () => {
      setIsLoading(true);

      // Handle cancelled payments (may not have reference)
      if (cancelled) {
        // Set declined status directly for cancelled payments
        usePayStore.setState((state) => ({
          paymentStatus: { ...state.paymentStatus, declined: true },
          error: "Payment was cancelled or declined",
        }));
        setIsLoading(false);
        return;
      }

      if (!reference) {
        // No reference found in URL parameters
        setIsLoading(false);
        return;
      }

      try {
        await verifyPayment(reference);
      } catch (err) {
        console.error("Verification error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    handlePaymentVerification();
  }, [reference, verifyPayment, cancelled]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoToOrders = () => {
    navigate("/orders");
  };

  const handleRetryPayment = () => {
    navigate("/cart");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verifying Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment...
          </p>
        </div>
      </div>
    );
  }

  // No reference found
  if (!reference || noRef) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Payment Reference
          </h2>
          <p className="text-gray-600 mb-6">
            No payment reference was found. This might happen if you accessed
            this page directly or the payment was not initiated properly.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleRetryPayment}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Go to Cart
            </button>
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment successful
  if (success && details) {
    // Show success toast only once
    if (!hasShownSuccessToast) {
      toast.success("Payment verified successfully!");
      setHasShownSuccessToast(true);
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full  bg-white rounded-lg shadow p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. Thank you for your
            purchase!
          </p>

          {details && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                Payment Details:
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Reference:</span> {reference}
                </p>
                {details.amount && (
                  <p>
                    <span className="font-medium">Amount:</span> ₦
                    {(details.amount / 100).toLocaleString()}
                  </p>
                )}
                {details.customer?.email && (
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {details.customer.email}
                  </p>
                )}
                {details.paid_at && (
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(details.paid_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleGoToOrders}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              View Orders
            </button>
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment declined or failed
  if (declined || error || cancelled) {
    const isDeclined =
      cancelled || status === "cancelled" || status === "failed";
    const title = isDeclined ? "Payment Cancelled" : "Payment Failed";
    const message = isDeclined
      ? "Your payment was cancelled or declined during processing."
      : "Unfortunately, your payment could not be processed.";

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 mb-4">{message}</p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {reference && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Reference:</span> {reference}
              </p>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            {isDeclined
              ? "You can try the payment again or choose a different payment method."
              : "Please try again or contact support if the problem persists."}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRetryPayment}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Retry Payment
            </button>
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback - show manual verification option
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Payment Status Unknown
        </h2>
        <p className="text-gray-600 mb-4">
          We're having trouble determining your payment status automatically.
        </p>

        {reference && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-blue-800 text-sm">
              <span className="font-medium">Payment Reference:</span>{" "}
              {reference}
            </p>
          </div>
        )}

        <p className="text-gray-600 mb-6">
          If you completed the payment, please click verify to check your
          payment status.
        </p>

        <div className="space-y-3">
          {reference && (
            <button
              onClick={() => {
                setIsLoading(true);
                verifyPayment(reference).finally(() => setIsLoading(false));
              }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Verify Payment
                </>
              )}
            </button>
          )}
          <button
            onClick={handleRetryPayment}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Go to Cart
          </button>
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
