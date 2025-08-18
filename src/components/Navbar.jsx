import { BellPlus, Component, SearchIcon, ShoppingCart, SquareStar, ThumbsUp, User } from "lucide-react";
import { Link } from "react-router-dom";

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
    name: "Account & order",
    href: "#",
    icon: <User />,
  },
  {
    href: "#",
    icon: <ShoppingCart />
  }
];

const Navbar = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between bg-white shadow-md px-9 py-2">
          <Link to="/">
            <img
              src="https://i.pinimg.com/736x/57/50/ee/5750ee196307e61f0e21a9f442c4fb25.jpg"
              width="60px"
              alt="Temu logo"
            />
          </Link>
          <div className="relative">
            <input
              type="text"
              className="outline-0 border-2 border-gray-500 w-64 rounded-2xl px-3 py-1 focus:border-2 focus:border-gray-500"
              placeholder="Search Temu"
            />
            <SearchIcon className="absolute right-2 top-1.5 bg-black text-white p-1 rounded-full font-bold" />
          </div>
          <div className="flex items-center gap-6 ml-4">
            {navItem.map((nav) => (
              <div
                key={nav.name}
                className="flex items-center space-x-3 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors"
              >
                {nav.icon}
                <span>{nav.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
