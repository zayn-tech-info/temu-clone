import { useState } from "react";

const Options = ({
  deliveryType,
  deliveryOptionValue,
  deliveryDate,
  selected,
  onChange,
  price
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="deliveryOption"
            checked={selected === deliveryType}
            onChange={() => onChange(deliveryType)}
          />
          <p>{deliveryType}:</p>
        </div>
        <p className="text-green-600 font-medium">{deliveryOptionValue}</p>
      </div>
      <p
        className={`bg-gray-300 p-2 rounded-md ${
          selected === deliveryType ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between">
          <span className="font-medium text-base">
            {deliveryDate || "No delivery date"}
          </span>
          <span className=" text-orange-500 font-medium">{price}</span>
        </div>
      </p>
    </>
  );
};

export const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div>
      <p className="text-xl font-medium my-2">Delivery Options</p>
      <div className="flex flex-col space-y-3">
        <Options
          deliveryType="Economy"
          deliveryOptionValue="Free Shipping"
          deliveryDate="Tue, May 2026"
          selected={selectedOption}
          onChange={setSelectedOption}
          price="₦0.00"
        />
        <Options
          deliveryType="Express"
          deliveryOptionValue="After 3 days"
          deliveryDate="Fri, May 2026"
          selected={selectedOption}
          onChange={setSelectedOption}
          price="₦1,500"
        />
        <Options
          deliveryType="Standard"
          deliveryOptionValue="After 7 days"
          deliveryDate="Mon, May 2026"
          selected={selectedOption}
          onChange={setSelectedOption}
          price="₦1,000"
        />
      </div>
    </div>
  );
};
