import { ShoppingCart, Plus } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import { useProductStore } from "../stores/productStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const { products, fetchProduct, isLoading, error } = useProductStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12 px-2">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-orange-100 rounded-2xl p-5 flex flex-col shadow-sm"
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={224}
              className="mb-3 rounded-xl"
            />
            <Skeleton variant="text" width="75%" height={20} className="mb-2" />
            <Skeleton variant="text" width="50%" height={16} className="mb-4" />
            <div className="flex flex-col items-center w-full mt-auto">
              <Skeleton
                variant="rectangular"
                width={128}
                height={28}
                className="mb-3 rounded-md"
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                className="rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20">
        <div className="bg-white border border-red-200 rounded-xl shadow-md p-8 flex flex-col items-center">
          <span className="text-3xl mb-2 text-red-500">&#9888;</span>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Error loading products
          </h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={fetchProduct}
            className="px-4 py-2 rounded bg-orange-500 text-white font-medium hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12 px-2">
      {products.map((productItem) => {
        return (
          <div
            key={productItem.name}
            className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-orange-500 rounded-2xl flex flex-col items-stretch p-5 relative"
          >
            <img
              className="md:object-fill  object-cover w-full h-56 rounded-xl mb-3 border border-gray-200"
              src={productItem.images[0]}
              alt={productItem.name}
            />
            <p className="text-gray-900 font-semibold text-base mb-2 truncate">
              {productItem.name}
            </p>
            <div className="flex justify-between text-sm items-center mt-auto mb-2">
              <div className="flex justify-between w-full gap-2">
                <div className="font-bold text-lg text-orange-500">
                  {productItem.currency}
                  {productItem.discount.priceAfterDiscount}
                </div>
                {productItem.discount.percentage !== 0 ? (
                  <div className="font-bold text-lg text-gray-400 line-through">
                    {productItem.currency}
                    {productItem.basePrice}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              <Link to={`productdetails/${productItem._id}`}>
                <button className="mb-3 px-3 py-1 rounded-md border border-orange-200 text-orange-500 text-xs font-medium hover:bg-orange-50 transition-colors duration-200 shadow-sm w-32">
                  View Details
                </button>
              </Link>
              <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-colors duration-200 w-full">
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
