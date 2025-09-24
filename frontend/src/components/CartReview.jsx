import visaLogo from "../assets/images/visa-logo.png";
import verveLogo from "../assets/images/verve.png";
import masterCard from "../assets/images/master-card.png";
import { useCartStore } from "../stores/cartStore";
import { useOrderStore } from "../stores/orderStore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePayStore } from "../stores/payStore";

const CartReview = () => {
  const navigate = useNavigate();
  const { makePayment, isLoading: paymentLoading } = usePayStore();

  const {
    createOrder,
    shippingAddress,
    isPlacingOrder,
    error,
  } = useOrderStore();
  const { cart, getCart } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const validateForm = () => {
    const sa = shippingAddress || {};
    const trimmed = {
      fullName: (sa.fullName ?? "").trim(),
      email: (sa.email ?? "").trim(),
      phoneNumber: String(sa.phoneNumber ?? "").trim(),
      country: (sa.country ?? "").trim(),
      street: (sa.street ?? "").trim(),
      city: (sa.city ?? "").trim(),
      state: (sa.state ?? "").trim(),
      zipCode: (sa.zipCode ?? "").trim(),
    };

    if (!trimmed.fullName) return toast.error("Full name is required"), false;
    if (!trimmed.email) return toast.error("Email is required"), false;
    if (!trimmed.phoneNumber)
      return toast.error("Phone Number is required"), false;
    if (!trimmed.country) return toast.error("Country is required"), false;
    if (!trimmed.street)
      return toast.error("Street address is required"), false;
    if (!trimmed.city) return toast.error("City is required"), false;
    if (!trimmed.state) return toast.error("State is required"), false;
    if (!trimmed.zipCode) return toast.error("Zip code is required"), false;
    return true;
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleMakePayment = async () => {
    const success = validateForm();
    if (success === true && error === null && cart?.grandTotal) {
      const orderCreated = await createOrder(shippingAddress);
      if (orderCreated) {
        await makePayment({
          email: shippingAddress.email,
          amount: cart.grandTotal,
        });
      }
    }
  };

  return (
    <div>
      <p className="text-lg mb-3 font-medium">Review your cart</p>
      {cart && Array.isArray(cart.items) && cart.items.length !== 0
        ? cart.items.map((cartItem) => (
            <div
              className="flex border items-center gap-4 p-4 border-b
              border-gray-100 last:border-b-0 bg-white rounded-lg shadow-sm mb-3"
              key={cartItem._id}
            >
              <img
                src={
                  cartItem.product?.images?.[0] ||
                  "https://via.placeholder.com/128x128?text=Item"
                }
                alt={cartItem.product?.name || "Product"}
                className="w-16 h-16 object-cover rounded-md border border-gray-200"
              />
              <div className="flex-grow flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-base text-gray-900 mb-1">
                      {cartItem.product?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Qty: {cartItem.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-orange-500 text-lg whitespace-nowrap">
                    {cartItem.product?.currency || "N"}
                    {Number(
                      cartItem.priceAtTime * cartItem.quantity || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        : null}

      <div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Subtotal</span>
          <span>N {Number(cart?.totalPrice ?? 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Shipping</span>
          <span>N {Number(cart?.shippingPrice ?? 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 font-medium">
          <span>Total</span>
          <span>N {Number(cart?.grandTotal ?? 0).toLocaleString()}</span>
        </div>

        <div className="my-5">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Choose a payment method
          </h4>
        </div>
 

        <button
          onClick={handleMakePayment}
          className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPlacingOrder || paymentLoading || !cart?.grandTotal}
        >
          {isPlacingOrder || paymentLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {isPlacingOrder ? "Creating order..." : "Redirecting to payment..."}
            </div>
          ) : (
            <p className="text-lg font-bold">
              Pay N{cart?.grandTotal?.toLocaleString() || '0'}
            </p>
          )}
        </button>

        <div className="flex items-center gap-2 justify-center mt-4 text-gray-600 text-sm">
          <div className="mt-4">
            <span>Secure Checkout - SSL Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartReview;
