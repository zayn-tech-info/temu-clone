import {
  ChartColumnIncreasing,
  CircleStar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Pen,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const adminsidebar = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    to: "/",
  },
  {
    name: "Analytic",
    icon: <ChartColumnIncreasing />,
    to: "/analytic",
  },
  {
    name: "Orders",
    icon: <CircleStar />,
    to: "/adminorders",
  },
  {
    name: "Customers",
    icon: <UserRound />,
    to: "/customers",
  },
  {
    name: "Reviews",
    icon: <Pen />,
    to: "/reviews",
  },
  {
    name: "Wallet",
    icon: <CreditCard />,
    to: "/wallet",
  },
  {
    name: "Logout",
    icon: <LogOut size={25} />,
  },
];

export function AdminSidebar() {
  const [active, setActive] = useState("Dashboard");

  let isActive;
  function handleClick(navName) {
    setActive(navName);
    localStorage.setItem("nav", navName);
  }

  return (
    <div className="h-full">
      <div className="flex flex-col space-y-3 pt-7 px-4 bg-orange-600 text-white h-screen">
        {adminsidebar.map((nav) => {
          const currentNav = localStorage.getItem("nav");
          isActive = currentNav === nav.name;
          const button = (
            <button
              type="button"
              onClick={() => handleClick(nav.name)}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors duration-150 ${
                isActive
                  ? "bg-white text-orange-600 font-semibold shadow-sm"
                  : "text-white/95 hover:bg-orange-500/70"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="shrink-0">{nav.icon}</span>
              <span className="truncate">{nav.name}</span>
            </button>
          );

          return nav.to ? (
            <Link to={nav.to} key={nav.name}>
              {button}
            </Link>
          ) : (
            <div key={nav.name}>{button}</div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminSidebar;
