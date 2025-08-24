import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { aongaHighStreetPrintRetroImg } from "../constants";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
const Cart = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-16">
      <PageHeader pagename="cart" />
      <div className="md:grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="flex justify-between rounded-md bg-green-600 font-medium text-white py-2 px-3">
            <div className="flex gap-3">
              <Check />
              <p>Free shipping for you</p>
            </div>
            <p>Limited-time offer</p>
          </div>
          <div>
            <div className="py-5 space-y-3">
              <div className="flex items-center justify-between border p-4">
                <div className="flex items-center gap-4">
                  <input type="checkbox" />
                  <p>Select all (1)</p>
                </div>
                <div className="text-gray-500">
                  <p>Delete</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border p-4">
                <input type="checkbox" />
                <img
                  src={aongaHighStreetPrintRetroImg}
                  alt="Product"
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Aonga High-StreetPrint Retro</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-red-600 text-lg font-medium">₦17,601</p>

                    <div className="flex gap-2 items-center">
                      <p>Qty</p>
                      <select className="border px-2">
                        {[...Array(100)].map((_, index) => (
                          <option key={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
