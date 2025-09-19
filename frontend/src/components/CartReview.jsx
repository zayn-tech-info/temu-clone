import visaLogo from "../assets/images/visa-logo.png";
import verveLogo from "../assets/images/verve.png";
import masterCard from "../assets/images/master-card.png";
import { useCartStore } from "../stores/cartStore";
import { useOrderStore } from "../stores/orderStore";
import { useEffect } from "react";

const CartReview = () => {
  const { paymentMethod, setPaymentMethod } = useOrderStore();
  const { cart, getCart } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const methods = [
    { name: "visa", img: visaLogo },
    { name: "masterCard", img: masterCard },
    { name: "verve", img: verveLogo },
  ];

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div>
      <p className="text-lg mb-3 font-medium">Review your cart</p>
      {cart && Array.isArray(cart.items) && cart.items.length !== 0
        ? cart.items.map((cartItem) => (
            <div
              className="flex border items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 bg-white rounded-lg shadow-sm mb-3"
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
          <span>N {Number(cart?.totalPrice).toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Shipping</span>
          <span>N {Number(cart?.shippingPrice).toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 font-medium">
          <span>Total</span>
          <span>N {Number(cart?.grandTotal).toLocaleString()}</span>
        </div>

        <div className="my-5">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Choose a payment method
          </h4>
        </div>
        <div className="mt-4">
          <div className="flex flex-row space-x-5 justify-between">
            {methods?.map((card, index) => (
              <div
                key={index}
                onClick={() => setPaymentMethod(card.name)}
                className={`flex items-center justify-center w-20 h-12 bg-white rounded-lg cursor-pointer shadow-sm transition border
      ${
        card.name === paymentMethod
          ? "border-orange-500 border-2"
          : "border-gray-200"
      }
      hover:shadow-md`}
                style={{ boxSizing: "border-box" }}
              >
                <img
                  src={card.img}
                  alt={card.name}
                  className="object-contain h-8"
                  style={{ maxWidth: "60px", maxHeight: "32px" }}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4">
          Pay Now
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
