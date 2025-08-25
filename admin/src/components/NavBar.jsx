import { Link } from "react-router-dom";
import {
  Bell,
  LayoutDashboard,
  MessageSquareMore,
  Settings,
} from "lucide-react";

const nav = [
  {
    name: "notification",
    icon: <Bell />,
  },
  {
    name: "messages",
    icon: <MessageSquareMore />,
  },
  {
    name: "settings",
    icon: <Settings />,
  },
];

export function NavBar() {
  return (
    <div className="bg-white shadow-md px-4 sm:px-6 lg:px-9 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Link to="/">
            <img
              src="https://i.pinimg.com/736x/57/50/ee/5750ee196307e61f0e21a9f442c4fb25.jpg"
              width="60px"
              alt="Temu logo"
            />
          </Link>
          <div className="flex items-center gap-3">
            <LayoutDashboard />
            <p className="font-medium text-xl">Dashboard</p>
          </div>
        </div>
        <div className="flex gap-5">
          {nav.map((navItem) => {
            return (
              <ul key={navItem.name}>
                <li className="text-3xl cursor-pointer">{navItem.icon}</li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}
