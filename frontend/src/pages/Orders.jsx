import { Fragment } from "react";
import PageHeader from "../components/PageHeader";

const Orders = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-5 lg:px-8">
      <PageHeader pagename="Order Tracking" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Your Orders</h2>
        <div className="flex flex-col gap-6">
          {/* Example order card, you can map over real orders here */}
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://res.cloudinary.com/dbmwlsuam/image/upload/v1757610473/products/pk3bolemholb38u0bjny.jpg"
              alt="Product"
              className="w-24 h-24 object-cover rounded-lg border"
            />
            <div className="flex-1 w-full">
              <p className="font-semibold text-lg">
                Dior Sauvage Eau de Parfum
              </p>
              <p className="text-green-600 text-sm">Order #123456789</p>
              <div className="flex gap-4 mt-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                  Delivered
                </span>
                <span className="text-orange-500 font-bold">₦150</span>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg shadow">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
