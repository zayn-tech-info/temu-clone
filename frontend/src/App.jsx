import { Navigate, redirect, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Order from "./pages/Order";
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/ProductDetails";
import CheckOut from "./pages/CheckOut";
import PaymentVerification from "./components/PaymentVerification";

function App() {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <Loader className="animate-spin" />
    </div>
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="cart"
          element={
            isCheckingAuth ? (
              <LoadingSpinner />
            ) : authUser ? (
              <Cart />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="productdetails/:id"
          element={
            isCheckingAuth ? (
              <LoadingSpinner />
            ) : authUser ? (
              <ProductDetails />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="checkout"
          element={
            isCheckingAuth ? (
              <LoadingSpinner />
            ) : authUser ? (
              <CheckOut />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="order"
          element={
            isCheckingAuth ? (
              <LoadingSpinner />
            ) : authUser ? (
              <Order />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="orders"
          element={
            isCheckingAuth ? (
              <LoadingSpinner />
            ) : authUser ? (
              <Order />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="verify/:reference"
          element={
            isCheckingAuth ? (
              <LoadingSpinner />
            ) : authUser ? (
              <PaymentVerification />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="verify"
          element={
            isCheckingAuth ? (
              <LoadingSpinner />
            ) : authUser ? (
              <PaymentVerification />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
