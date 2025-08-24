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
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

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
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              {nav.name === "Oders & Account" && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center space-x-2 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors"
                    onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  >
                    <div>{nav.icon}</div>
                    <span>{nav.name}</span>
                  </button>
                  
                  {/* Account Dropdown */}
                  {showAccountDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-700">
                          Hi, {user.firstName || user.email?.split('@')[0] || 'User'}
                        </span>
                      </div>
                      <Link
                        to="/orders-account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                        onClick={() => setShowAccountDropdown(false)}
                      >
                        Orders
                      </Link>
                                             <Link
                         to="/orders-account"
                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                         onClick={() => setShowAccountDropdown(false)}
                       >
                         Account
                       </Link>
                                             <button
                         onClick={() => {
                           logout(navigate);
                           setShowAccountDropdown(false);
                         }}
                         className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                       >
                         Logout
                       </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  className="flex items-center space-x-2 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors"
                  to={`/${nav.href}`}
                >
                  <div>{nav.icon}</div>
                  {nav.name && <span>{nav.name}</span>}
                </Link>
              )}
            </div>
          ))}
          
          {/* Show Login only when user is NOT logged in */}
          {!user && (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
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
            
            {/* Mobile Authentication */}
            <div className="border-t pt-4 mt-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-gray-700 font-medium">
                    Hi, {user.firstName || user.email?.split('@')[0] || 'User'}
                  </span>
                  <Link
                    to="/orders-account"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Orders</span>
                  </Link>
                                     <Link
                     to="/orders-account"
                     className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                   >
                     <User className="w-4 h-4" />
                     <span>Account</span>
                   </Link>
                                     <button
                     onClick={() => logout(navigate)}
                     className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                   >
                     <LogOut className="w-4 h-4" />
                     <span>Logout</span>
                   </button>
                </div>
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
          </div>     
        </div>
      )}
    </nav>
  );
};

export default Navbar;
