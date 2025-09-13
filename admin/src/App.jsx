import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

import { Dashboard } from "./pages/dashboard";
import { Analytic } from "./pages/Analytic";
import { Order } from "./pages/Order";
import { NewProduct } from "./pages/NewProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useAuthStore } from "./store/useAuthStore";

export function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  /*   if (!authUser) {
    const loginUrl =
      import.meta.env.MODE === "development"
        ? "http://localhost:5173"
        : "https://temu-clone-zayn.vercel.app";
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Admin Access Required
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in as an admin to access this page.
          </p>
          <a
            href={`${loginUrl}/login`}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  } */

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytic"
          element={authUser ? <Analytic /> : <Navigate to="/" />}
        />
        <Route
          path="/adminorders"
          element={authUser ? <Order /> : <Navigate to="/login" />}
        />
        <Route
          path="/newproduct"
          element={authUser ? <NewProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
