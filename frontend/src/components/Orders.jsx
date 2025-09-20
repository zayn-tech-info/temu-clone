import React, { useEffect } from "react";
import PageHeader from "./PageHeader";
import { useOrderStore } from "../stores/orderStore";

const Orders = () => {
  const { order, getMyOrder } = useOrderStore();

  useEffect(() => {
    getMyOrder();
  }, [getMyOrder]);

  useEffect(() => {
    console.log("Order data:", order);
  }, [order]);

  return (
    <>
      <PageHeader pagename="Order Tracking" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Your Orders</h2>
        <div className="flex flex-col gap-6 bg-gray-100 p-10 rounded-xl">
          <div className="flex justify-between items-center">
            <p className="text-base font-medium">Order ID: #{order._id}</p>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-base font-semibold">
              {order.paymentStatus || "Delivered"}
            </span>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg shadow">
              Track Order
            </button>
          </div>
          {order && Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((orderItem, index) => (
              <div
                key={orderItem._id || index}
                className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 "
              >
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <img
                    src={
                      orderItem.image ||
                      "https://res.cloudinary.com/dbmwlsuam/image/upload/v1757610473/products/pk3bolemholb38u0bjny.jpg"
                    }
                    alt={orderItem.name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1 w-full">
                    <p className="font-semibold text-lg">
                      {orderItem.name || "Unknown Product"}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-orange-500 font-bold">
                        {orderItem.product?.currency || "₦"}
                        {orderItem.priceAtTime ||
                          orderItem.product?.price ||
                          "150"}
                      </span>
                      <span className="text-gray-600">
                        Qty: {orderItem.quantity || 5}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No orders found</p>
              <p className="text-sm mt-2">Orders you place will appear here</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
