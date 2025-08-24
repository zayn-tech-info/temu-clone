import visaLogo from "../assets/images/visa-logo.png";
import verveLogo from "../assets/images/verve.png";
import masterCard from "../assets/images/master-card.png";
import { DeliveryOptions } from "./DeliveryOptions";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  return (
    <div>
      <p className="font-bold text-xl">Order Summary</p>
      <div className="flex flex-col space-y-3 mt-5">
        <div className="flex justify-between">
          <p>items(s) total:</p>
          <del className="text-gray-500">₦335,595</del>
        </div>
        <div className="flex justify-between">
          <p>items(s) discount:</p>
          <p className="text-orange-500 font-medium">₦335,595</p>
        </div>
        <DeliveryOptions />
        <hr />
      </div>
      <div className="flex justify-between mt-8 mb-1">
        <p className="text-xl font-medium">Total</p>
        <p className="text-xl font-medium">₦88,005</p>
      </div>
      <i className="text-sm text-gray-500">
        Please refer to your final actual payment amount.
      </i>
      <Link to="/order">
        <button className="w-full text-center py-3 text-xl my-2 bg-orange-500 text-white font-medium rounded-full">
          Place Order (5)
        </button>
      </Link>

      <div className="mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span className="font-medium">
            You will not be charged until you review this order on the next page
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-green-600">✓</span>
          <span className="font-medium">Safe Payment Options</span>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <p className="text-sm text-gray-600">
          Temu is committed to protecting your payment information. We follow
          PCI DSS standards, use strong encryption, and perform regular reviews
          of its system to protect your privacy.
        </p>
      </div>

      <div className="mt-4">
        <div className="flex flex-row space-x-5">
          <img
            src={verveLogo}
            alt="Verve"
            className="h-6 object-contain cursor-pointer"
          />
          <img
            src={visaLogo}
            alt="Visa"
            className="h-6 object-contain cursor-pointer"
          />
          <img
            src={masterCard}
            alt="Mastercard"
            className="h-6 object-contain cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
