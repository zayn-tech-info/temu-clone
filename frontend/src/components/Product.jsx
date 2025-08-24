import { Plus, ShoppingCartIcon } from "lucide-react";
import { products } from "../utils/products";

const Product = () => {
  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10 lg:gap-10 py-10">
      {products.map((productItem) => {
        return (
          <div key={productItem.name} className="h-full border-2 border-gray-400 p-3 rounded-lg flex flex-col items-stretch">
            <img
              className="object-contain w-full h-52 pb-1"
              src={productItem.image}
              alt={productItem.name}
            />
            <p className="text-gray-700 font-medium text-sm">
              {productItem.name}
            </p>
            <div className="flex justify-between items-center mt-auto space-y-3">
              <div className="space-x-3">
                <span className="font-bold">
                  {productItem.price.currentPrice}
                </span>
                <del className="text-orange-600">
                  {productItem.price.oldPrice}
                </del>
              </div>
              <div className="flex border-2 rounded-xl px-3 py-1 border-gray-600 cursor-pointer">
                <ShoppingCartIcon />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
