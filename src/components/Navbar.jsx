import { BellPlus, Component, SquareStar, ThumbsUp, User } from "lucide-react";
import { Link } from "react-router-dom";

const navItem = [
  {
    name: "Best Sellers",
    href: "#",
    icon: <ThumbsUp />,
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
    name: "Featured",
    href: "#",
    icon: <Component />,
  },
];

const Navbar = () => {
  return (
    <>
      <div>
        <div className="flex items-center">
          <Link to="/">
            <img
              src="https://i.pinimg.com/736x/57/50/ee/5750ee196307e61f0e21a9f442c4fb25.jpg"
              width="60px"
              alt="Temu logo"
            />
          </Link>
          <div className="flex items-center gap-6 ml-4">
            {navItem.map((nav) => (
              <div
                key={nav.name}
                className="flex items-center space-x3 text-sm font-medium cursor-pointer hover:text-orange-600 transition-colors"
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
