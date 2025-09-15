import {
  BellPlus,
  Component,
  SearchIcon,
  ShoppingCart,
  SquareStar,
  ThumbsUp,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/cartStore";

const navItem = [
  {
    name: "Best Sellers",
    href: "#",
    icon: <ThumbsUp />,
  },
  {
    name: "Featured",
    href: "#",
    icon: <Component />,
  },
  {
    name: "5-star rated",
    href: "#",
    icon: <SquareStar />,
  },
  {
    name: "New in",
    href: "#",
    icon: <BellPlus />,
  },
  {
    name: "Oders & Account",
    href: "orders-account",
    icon: <User />,
  },
];

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { cart, getCart } = useCartStore();

  useEffect(() => {
    if (authUser) {
      getCart();
    }

  }, [authUser, getCart]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-9 py-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://i.pinimg.com/736x/57/50/ee/5750ee196307e61f0e21a9f442c4fb25.jpg"
            width="60px"
            alt="Temu logo"
          />
        </Link>

        {/* Search bar (hidden on very small screens) */}
        <div className="hidden sm:block relative flex-1 mx-4 max-w-sm">
          <input
            type="text"
            className="outline-0 border-2 border-gray-500 w-full rounded-2xl px-3 py-1 focus:border-gray-600"
            placeholder="Search Temu"
          />
          <SearchIcon className="absolute right-2 top-1.5 bg-black text-white p-1 rounded-full font-bold" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 ml-4">
          {navItem.map((nav, idx) => (
            <div key={idx}>
              <Link
                className="flex items-center space-x-2 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors relative"
                to={`/${nav.href}`}
              >
                <div className="relative">{nav.icon}</div>
                {nav.name && <span>{nav.name}</span>}
              </Link>
            </div>
          ))}

          {/* Cart Icon always visible on desktop */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-orange-600 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {(cart?.totalQuantity || 0) > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
              </span>
            )}
          </Link>

          {/* Login link always visible */}
          {authUser ? (
            " "
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button and Cart Icon side by side */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-orange-600 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {(cart?.totalQuantity || 0) > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 border-t pt-3 my-5">
          {/* Search bar on mobile */}
          <div className="relative">
            <input
              type="text"
              className="outline-0 border-2 border-gray-500 w-full rounded-2xl px-3 py-1 focus:border-gray-600"
              placeholder="Search Temu"
            />
            <SearchIcon className="absolute right-2 top-1.5 bg-black text-white p-1 rounded-full font-bold" />
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-4">
            {navItem.map((nav, idx) => (
              <div key={idx}>
                <Link
                  className="flex items-center space-x-2 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors relative"
                  to={`/${nav.href}`}
                >
                  <div className="relative">{nav.icon}</div>
                  {nav.name && <span>{nav.name}</span>}
                </Link>
              </div>
            ))}

            {/* Mobile Authentication */}
            <div className="border-t pt-4 mt-4">
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
