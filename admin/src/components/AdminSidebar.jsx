import {
  ChartColumnIncreasing,
  CircleStar,
  CreditCard,
  Kanban,
  LayoutDashboard,
  LogOut,
  Pen,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

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
    name: "New Product",
    icon: <Kanban />,
    to: "/newproduct",
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
    isLogout: true,
  },
];

export function AdminSidebar({ isOpen = false, onClose }) {
  const location = useLocation();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <div className="h-full">
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`z-50 lg:z-auto fixed lg:static top-0 left-0 h-full w-72 transform bg-orange-600 text-white transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col space-y-3 pt-7 px-4 h-full">
          <div className="lg:hidden flex justify-end">
            <button
              type="button"
              className="p-2 rounded-md hover:bg-white/10"
              aria-label="Close sidebar"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          {adminsidebar.map((nav) => {
            const isActive = nav.to && location.pathname === nav.to;
            const button = (
              <button
                type="button"
                className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors duration-150 ${
                  isActive
                    ? "bg-white text-orange-600 font-semibold shadow-sm"
                    : "text-white/95 hover:bg-orange-500/70"
                }`}
                aria-current={isActive ? "page" : undefined}
                onClick={nav.isLogout ? handleLogout : undefined}
              >
                <span className="shrink-0">{nav.icon}</span>
                <span className="truncate">{nav.name}</span>
              </button>
            );

            return nav.to ? (
              <Link to={nav.to} key={nav.name} onClick={onClose}>
                {button}
              </Link>
            ) : (
              <div key={nav.name}>{button}</div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

export default AdminSidebar;
