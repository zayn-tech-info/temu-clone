import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import { useCartStore } from "../stores/cartStore";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const {
    cart,
    getCart,
    isFetchingCart,
    removeFromCart,
    updateCart,
    toggleItem,
    toggleAll,
    setCartItem,
  } = useCartStore();

  const allSelected =
    cart.items &&
    cart.items.length > 0 &&
    cart.items.every((item) => item.selected);

  const totalSelected =
    cart.items &&
    cart.items.length > 0 &&
    cart.items.filter((item) => item.selected);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (isMounted) {
        await getCart();
      }
    };
    run();
    return () => {
      ``;
      isMounted = false;
    };
  }, [getCart]);

  const handleSelect = (event, productId) => {
    const newQuantity = Number(event.target.value) || 1;
    updateCart(productId, newQuantity);
  };

  const handleToggleItem = (id) => {
    toggleItem(id);
  };

  const handleDeleteMany = async () => {
    if (!totalSelected || totalSelected.length === 0) return;
    const idsToDelete = totalSelected.map((item) => item._id);
    try {
      for (const id of idsToDelete) {
        await removeFromCart(id);
      }
      await getCart();
    } catch (error) {
      console.error("Failed to delete many items:", error);
      toast.error("Failed to delete selected items");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 lg:px-16">
      <PageHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
        <div className="md:col-span-2 flex flex-col gap-8">
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

          <div
            className={`flex items-center justify-between border-2 border-orange-100 rounded-xl p-5 bg-orange-50 shadow-sm ${
              totalSelected?.length > 0 ? "block" : "hidden"
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={!!allSelected}
                onChange={(e) => toggleAll(e.target.checked)}
                className="accent-orange-500 scale-110"
              />
              <span className="font-semibold text-orange-600">
                Select all ({totalSelected.length})
              </span>
            </div>
            <button
              onClick={handleDeleteMany}
              className="text-gray-500 hover:text-red-500 font-semibold transition-colors"
            >
              Delete
            </button>
          </div>

          {isFetchingCart ? (
            <>
              {[...Array(2)].map((_, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-center gap-8 border-2 border-orange-100 rounded-2xl p-6 bg-white"
                >
                  <span className="absolute -top-4 left-4">
                    <Skeleton variant="rectangular" width={80} height={24} />
                  </span>
                  <Skeleton
                    variant="circular"
                    width={28}
                    height={28}
                    className="self-start md:self-center"
                  />
                  <div className="relative">
                    <Skeleton
                      variant="rectangular"
                      width={128}
                      height={128}
                      className="rounded-2xl"
                    />
                    <span className="absolute bottom-2 right-2">
                      <Skeleton variant="rectangular" width={60} height={20} />
                    </span>
                  </div>
                  <div className="flex-1 w-full">
                    <Skeleton variant="text" width="60%" height={32} />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 mt-2 w-full">
                      <Skeleton variant="text" width={120} height={28} />
                      <Skeleton variant="rectangular" width={80} height={36} />
                      <Skeleton variant="rectangular" width={100} height={36} />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : cart && Array.isArray(cart.items) && cart.items.length !== 0 ? (
            cart.items.map((cartItem) => (
              <div
                key={cartItem._id || `${cartItem.product}-${cartItem.quantity}`}
                className="relative flex flex-col md:flex-row items-center gap-8 border-2 border-orange-100 rounded-2xl p-6 bg-white  "
              >
                <span className="absolute -top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  Best Seller
                </span>
                <input
                  type="checkbox"
                  checked={!!cartItem.selected}
                  onChange={() => handleToggleItem(cartItem._id)}
                  className="accent-orange-500 self-start md:self-center scale-110"
                />
                <div className="relative">
                  <img
                    src={
                      cartItem.product?.images?.[0] ||
                      "https://via.placeholder.com/128x128?text=Item"
                    }
                    alt={cartItem.product?.name || "Product"}
                    className="w-32 h-32 object-cover rounded-2xl border-2 border-orange-200 shadow-md"
                  />
                  <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
                    In Stock
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <p className="font-bold text-xl mb-1 text-gray-900">
                    {cartItem.product?.name || "Item"}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 mt-2 w-full">
                    <span className="text-orange-500 text-nowrap text-2xl font-extrabold drop-shadow">
                      {cartItem.product?.currency || "N"}{" "}
                      {Number(
                        cartItem.priceAtTime * cartItem.quantity || 0
                      ).toLocaleString()}
                    </span>
                    <div className="flex gap-2 items-center">
                      <span className="font-semibold">Qty</span>
                      <select
                        value={cartItem.quantity ?? 1}
                        onChange={(e) => handleSelect(e, cartItem.product?._id)}
                        className="border-2 border-orange-200 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                      >
                        {[...Array(50)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem._id)}
                      className="text-orange-500 font-bold hover:underline px-4 py-2 rounded-lg border border-orange-100 bg-orange-50 shadow hover:bg-orange-100 transition sm:ml-4 w-full sm:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyCart />
          )}
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
