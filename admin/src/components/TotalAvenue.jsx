import {
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaListUl,
  FaUserTie,
} from "react-icons/fa";
import { OrderSummary } from "./OrderSummary";

const avenue = [
  {
    id: 1,
    number: "450",
    text: "Total Orders",
    icon: FaShoppingCart,
    bgColor: "#E8F0FF",
    color: "#4169E1",
  },
  {
    id: 2,
    number: "955",
    text: "Total Customers",
    icon: FaUsers,
    bgColor: "#FFF3E6",
    color: "#FFA500",
  },
  {
    id: 3,
    number: "$50K",
    text: "Total Revenue",
    icon: FaDollarSign,
    bgColor: "#E6FFE6",
    color: "#32CD32",
  },
  {
    id: 4,
    number: "250",
    text: "Total Menu",
    icon: FaListUl,
    bgColor: "#FFE6E6",
    color: "#FF4444",
  },
  {
    id: 5,
    number: "30",
    text: "Total workers",
    icon: FaUserTie,
    bgColor: "#E6E6FF",
    color: "#4B0082",
  },
];

export function TotalAvenue() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {avenue.map((item) => (
        <div
          key={item.id}
          className="p-5 rounded-xl flex items-center gap-4 shadow-sm border border-gray-100 bg-white"
          style={{ backgroundColor: item.bgColor }}
        >
          <div
            className="p-3 rounded-full shrink-0"
            style={{ backgroundColor: item.color + "20" }}
          >
            <item.icon size={22} style={{ color: item.color }} />
          </div>    
          <div>
            <h2 className="text-xl font-semibold text-gray-900 leading-tight">
              {item.number}
            </h2>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
