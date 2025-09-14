import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/productStore";
import Skeleton from "@mui/material/Skeleton";

const ProductDetails = () => {
  const { singleProduct, product, isLoading } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    singleProduct(id);
    return () => {};
  }, [id, singleProduct]);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex items-center justify-center">
            <Skeleton
              variant="rectangular"
              width={320}
              height={320}
              className="rounded-xl"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <Skeleton
                variant="text"
                width={220}
                height={40}
                className="mb-2"
              />
              <Skeleton
                variant="text"
                width={120}
                height={24}
                className="mb-3"
              />
              <Skeleton
                variant="text"
                width={100}
                height={32}
                className="mb-4"
              />
              <Skeleton
                variant="text"
                width={180}
                height={24}
                className="mb-4"
              />
              <Skeleton
                variant="rectangular"
                width={320}
                height={80}
                className="mb-6"
              />
              <Skeleton
                variant="text"
                width={100}
                height={24}
                className="mb-4"
              />
              <Skeleton
                variant="rectangular"
                width={220}
                height={32}
                className="mb-4"
              />
            </div>
            <Skeleton
              variant="rectangular"
              width={320}
              height={48}
              className="mt-6 rounded-xl"
            />
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    brand,
    category,
    subCategory,
    basePrice,
    currency,
    description,
    discount,
    images,
    rating,
    stock,
    shipping,
  } = product;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 self-start flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-200 text-orange-500 font-medium hover:bg-orange-50 transition-colors duration-200 shadow-sm"
      >
        &#8592; Back
      </button>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={images?.[0]}
            alt={name}
            className="w-full max-w-xs h-80 object-cover rounded-xl shadow-md border border-gray-200"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-semibold">
                {brand}
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                {category}
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                {subCategory}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-orange-500">
                ${basePrice}
              </span>
              {discount?.percentage > 0 && (
                <span className="text-sm text-red-500 font-semibold bg-red-100 px-2 py-1 rounded">
                  -{discount.percentage}%
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              {/* Rating stars */}
              <span className="text-yellow-400 text-lg">
                {Array(Math.round(rating?.average || 0))
                  .fill("★")
                  .join("")}
              </span>
              <span className="text-gray-500 text-sm">
                ({rating?.count || 0} reviews)
              </span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
            <div className="mb-4">
              <span
                className={`font-semibold text-sm px-2 py-1 rounded ${
                  stock?.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {stock?.available ? "In Stock" : "Out of Stock"}
              </span>
              {stock?.available && (
                <span className="ml-2 text-gray-500 text-xs">
                  ({stock?.quantity} left)
                </span>
              )}
            </div>
            {shipping?.options?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                  Shipping Options:
                </h3>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {shipping.options.map((opt, idx) => (
                    <li key={idx}>
                      {opt.method} - ₦{opt.cost} ({opt.estimated_days})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg text-lg transition-colors duration-200 disabled:opacity-60"
            disabled={!stock?.available}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
