import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { aongaHighStreetPrintRetroImg } from "../constants";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
const Cart = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-16">
      <PageHeader pagename="cart" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
        {/* Cart Items Section */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Promo Banner */}
          <div className="flex justify-between items-center rounded-2xl bg-gradient-to-r from-green-500 via-green-400 to-green-600 font-medium text-white py-4 px-6 shadow-lg border-2 border-green-300">
            <div className="flex gap-3 items-center">
              <Check
                className="bg-white text-green-600 rounded-full p-1"
                size={28}
              />
              <span className="text-lg tracking-wide">
                Free shipping for you
              </span>
            </div>
            <span className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-bold shadow">
              Limited-time offer
            </span>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-between border-2 border-orange-100 rounded-xl p-5 bg-orange-50 shadow-sm">
            <div className="flex items-center gap-4">
              <input type="checkbox" className="accent-orange-500 scale-110" />
              <span className="font-semibold text-orange-600">
                Select all (1)
              </span>
            </div>
            <button className="text-gray-500 hover:text-red-500 font-semibold transition-colors">
              Delete
            </button>
          </div>

          {/* Cart Item */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 border-2 border-orange-100 rounded-2xl p-6 bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <span className="absolute -top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
              Best Seller
            </span>
            <input
              type="checkbox"
              className="accent-orange-500 self-start md:self-center scale-110"
            />
            <div className="relative">
              <img
                src={aongaHighStreetPrintRetroImg}
                alt="Product"
                className="w-32 h-32 object-cover rounded-2xl border-2 border-orange-200 shadow-md"
              />
              <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
                In Stock
              </span>
            </div>
            <div className="flex-1 w-full">
              <p className="font-bold text-xl mb-1 text-gray-900">
                Aonga High-StreetPrint Retro
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 mt-2 w-full">
                <span className="text-orange-500 text-2xl font-extrabold drop-shadow">
                  ₦17,601
                </span>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold">Qty</span>
                  <select className="border-2 border-orange-200 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium">
                    {[...Array(50)].map((_, index) => (
                      <option key={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </div>
                <button className="text-orange-500 font-bold hover:underline px-4 py-2 rounded-lg border border-orange-100 bg-orange-50 shadow hover:bg-orange-100 transition sm:ml-4 w-full sm:w-auto">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
