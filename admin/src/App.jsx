import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";

export function App() {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Dashboard />} />
       </Routes>
    </div>
  );
}
