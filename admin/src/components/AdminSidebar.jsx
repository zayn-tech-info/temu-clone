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

const adminsidebar = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Analytic",
    icon: <ChartColumnIncreasing />,
  },
  {
    name: "Orders",
    icon: <CircleStar />,
  },
  {
    name: "Customer",
    icon: <UserRound />,
  },
  {
    name: "Reviews",
    icon: <Pen />,
  },
  {
    name: "Wallet",
    icon: <CreditCard />,
  },
  {
    name: "Logout",
    icon: <LogOut size={25} />,
  },
];

export function AdminSidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="h-full">
      <div className="flex flex-col space-y-3 pt-7 px-4 bg-orange-600 text-white h-screen">
        {adminsidebar.map((nav) => {
          const isActive = active === nav.name;
          return (
            <button
              key={nav.name}
              type="button"
              onClick={() => setActive(nav.name)}
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
        })}
      </div>
    </div>
  );
}

export default AdminSidebar;
