import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Analytic } from "./pages/Analytic";

export function App() {
  return (
    <div>
       <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytic" element={<Analytic />} />
       </Routes>
    </div>
  );
}
