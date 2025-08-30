import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Analytic } from "./pages/Analytic";
import { Order } from "./pages/Order";
import { NewProduct } from "./pages/NewProduct";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytic" element={<Analytic />} />
        <Route path="/adminorders" element={<Order />} />
        <Route path="/newproduct" element={<NewProduct />} />
      </Routes>
    </div>
  );
}
