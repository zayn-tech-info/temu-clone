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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  {
    href: "cart",
    icon: <ShoppingCart />,
  },
];

const Navbar = () => {
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
                className="flex items-center space-x-2 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors"
                to={`/${nav.href}`}
              >
                <div>{nav.icon}</div>
                {nav.name && <span>{nav.name}</span>}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
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
                  className="flex items-center space-x-2 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors"
                  to={`/${nav.href}`}
                >
                  <div>{nav.icon}</div>
                  {nav.name && <span>{nav.name}</span>}
                </Link>
              </div>
            ))}
          </div>     
        </div>
      )}
    </nav>
  );
};

export default Navbar;
