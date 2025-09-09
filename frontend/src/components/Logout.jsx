import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Logout = ({ onLogout, className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    localStorage.removeItem("cart");
    localStorage.removeItem("orders");

    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors ${className}`}
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
};

export default Logout;
