import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const Logout = ({ className = "" }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
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
