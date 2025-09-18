import visaLogo from "../assets/images/visa-logo.png";
import verveLogo from "../assets/images/verve.png";
import masterCard from "../assets/images/master-card.png";
import { DeliveryOptions } from "./DeliveryOptions";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const OrderSummary = () => {
  const { cart } = useCartStore();

  return (
    <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 flex flex-col gap-6">
      <h2 className="font-extrabold text-2xl text-orange-500 mb-2 tracking-wide">
        Order Summary
      </h2>
      <div className="flex flex-col gap-4 mt-2">
        {/*         <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Items Total</span>
          <del className="text-gray-400 text-lg">N </del>
        </div> */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Items total</span>
          <span className="text-orange-500 font-bold text-lg">
            {cart.totalPrice?.toLocaleString()}
          </span>
        </div>
        <div className="bg-orange-50 rounded-xl p-3">
          <DeliveryOptions />
        </div>
        <hr className="border-orange-200" />
      </div>
      <div className="flex justify-between items-center mt-4 mb-1 bg-orange-100 rounded-xl px-4 py-3">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-2xl font-extrabold text-orange-500">
          {cart.grandTotal?.toLocaleString()}
        </span>
      </div>
      <i className="text-sm text-gray-500 mb-2">
        Please refer to your final actual payment amount.
      </i>
      <Link to="/checkout">
        <button className="w-full text-center py-4 text-xl my-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200">
          Check Out ({cart.totalQuantity})
        </button>
      </Link>

      <div className="mt-2 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-100 text-green-600 rounded-full px-2 py-1 font-bold">
            ✓
          </span>
          <span className="font-medium">
            You will not be charged until you review this order on the next page
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-600 rounded-full px-2 py-1 font-bold">
            ✓
          </span>
          <span className="font-medium">Safe Payment Options</span>
        </div>
      </div>

      <div className="mt-2 text-sm">
        <p className="text-gray-600">
          Temu is committed to protecting your payment information. We follow
          PCI DSS standards, use strong encryption, and perform regular reviews
          of its system to protect your privacy.
        </p>
      </div>

      <div className="mt-4">
        <div className="flex flex-row space-x-5 justify-center">
          <img
            src={verveLogo}
            alt="Verve"
            className="h-8 object-contain cursor-pointer drop-shadow"
          />
          <img
            src={visaLogo}
            alt="Visa"
            className="h-8 object-contain cursor-pointer drop-shadow"
          />
          <img
            src={masterCard}
            alt="Mastercard"
            className="h-8 object-contain cursor-pointer drop-shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
