import React from "react";

const CartReview = () => {
  return (
    <div>
      <p className="text-lg font-medium">Review your cart</p>
      <div className="flex items-center gap-4 p-4">
        <img
          src="/path-to-sofa-image.jpg"
          alt="DuoComfort Sofa"
          className="w-16 h-16 object-cover"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">DuoComfort Sofa Premium</h3>
              <p className="text-sm text-gray-500">1x</p>
            </div>
            <span className="font-medium">$20.00</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Subtotal</span>
          <span>$45.00</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Shipping</span>
          <span>$5.00</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Discount</span>
          <span>-$10.00</span>
        </div>
        <div className="flex justify-between py-2 font-medium">
          <span>Total</span>
          <span>$40.00</span>
        </div>
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4">
          Pay Now
        </button>
        <div className="flex items-center gap-2 justify-center mt-4 text-gray-600 text-sm">
          <span>🔒</span>
          <span>Secure Checkout - SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default CartReview;
