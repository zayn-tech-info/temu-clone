import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Analytic } from "./pages/Analytic";
import { Order } from "./pages/Order";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytic" element={<Analytic />} />
        <Route path="/adminorders" element={<Order />} />
      </Routes>
    </div>
  );
}
