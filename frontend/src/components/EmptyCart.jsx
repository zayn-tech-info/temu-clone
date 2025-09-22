import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <div className="mb-6">
          <ShoppingCart
            size={80}
            className="mx-auto text-gray-300 mb-4"
            strokeWidth={1}
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <ShoppingCart size={20} className="mr-2" />
          Start Shopping
        </Link>

        <div className="mt-8 text-sm text-gray-400">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
