import { useState } from "react";
import { CreditCard, Logs, Shield, ShieldQuestionMark, UserRound } from "lucide-react";

const orderOptions = [
  "All Orders",
  "Processing", 
  "Shipped",
  "Delivered",
  "Returns"
];

const OrdersSideBar = () => {
  const [selectedOption, setSelectedOption] = useState("All Orders");

  console.log("OrdersSideBar rendered, selectedOption:", selectedOption); // Debug log

  return (
    <div className="border p-4">
      <div className="flex gap-2 items-center mb-4">
        <Logs />
        <p className="text-lg font-medium">Your Orders</p>
      </div>
      
      <div className="mb-6">
        {orderOptions.map((option) => (
          <div 
            key={option}
            className={`p-2 cursor-pointer mb-2 rounded ${
              selectedOption === option 
                ? "bg-orange-500 text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              console.log("Clicked:", option); // Debug log
              setSelectedOption(option);
            }}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
          <UserRound />
          <span>Your Profile</span>
        </div>
        <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
          <Shield />
          <span>Account Security</span>
        </div>
        <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
          <CreditCard />
          <span>Your payment methods</span>
        </div>
        <div className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
          <ShieldQuestionMark/>
          <span>Permission</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersSideBar;
