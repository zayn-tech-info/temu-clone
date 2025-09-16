import { Fragment, useState } from "react";
import { useCartStore } from "../stores/cartStore";
import dayjs from "dayjs";

const calculateDeliveryDate = (estimated_days) => {
  const deliveryDate = dayjs().add(Number(estimated_days), "day");
  return deliveryDate.format("dddd D, MMMM");
};

const Options = ({
  deliveryType,
  deliveryOptionValue,
  deliveryDate,
  selected,
  onChange,
  price,
}) => {
  return (
    <>
      <label
        className="flex justify-between items-center cursor-pointer"
        onClick={() => onChange(deliveryType)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onChange(deliveryType);
        }}
      >
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="deliveryOption"
            checked={selected === deliveryType}
            onChange={() => onChange(deliveryType)}
            onClick={(e) => e.stopPropagation()}
          />
          <p>{deliveryType}:</p>
        </div>
        <p className="text-green-600 font-medium">{deliveryOptionValue}</p>
      </label>
      <p
        className={`bg-gray-300 p-2 rounded-md ${
          selected === deliveryType ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between">
          <span className="font-medium text-base">
            {deliveryDate || "No delivery date"}
          </span>
          <span className="text-orange-500 font-medium">{price}</span>
        </div>
      </p>
    </>
  );
};

// ✅ Main component wrapper
export  function DeliveryOptions() {
  const [selectedOption, setSelectedOption] = useState("");
  const { cart, updateShipping } = useCartStore();

  // Defensive checks for cart, items, and product
  const shippingOptions =
    cart &&
    Array.isArray(cart.items) &&
    cart.items.length > 0 &&
    cart.items[0].product &&
    cart.items[0].product.shipping &&
    Array.isArray(cart.items[0].product.shipping.options)
      ? cart.items[0].product.shipping.options
      : [];

  const handleChange = async (deliveryType) => {
    setSelectedOption(deliveryType);
    if (typeof updateShipping === "function") {
      await updateShipping(deliveryType);
    }
  };

  return (
    <div>
      <p className="text-base font-medium my-2">Delivery Options</p>
      <div className="flex flex-col space-y-3">
        {!shippingOptions || shippingOptions.length === 0 ? (
          <p className="text-gray-500">No delivery options available.</p>
        ) : (
          shippingOptions.map((opt) => (
            <Fragment key={opt.method}>
              <Options
                deliveryType={opt.method}
                deliveryOptionValue={`After ${opt.estimated_days} day${
                  parseInt(opt.estimated_days, 10) > 1 ? "s" : ""
                }`}
                deliveryDate={calculateDeliveryDate(opt.estimated_days)}
                selected={selectedOption}
                onChange={handleChange}
                price={
                  typeof opt.cost === "number"
                    ? `₦${opt.cost.toLocaleString()}`
                    : opt.cost
                }
              />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
