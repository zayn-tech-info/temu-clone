import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="cart"
          element={authUser ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="orders-account"
          element={authUser ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>

      {/* <Toaster /> */}
    </>
  );
}

export default App;
