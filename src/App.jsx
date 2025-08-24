import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders-account" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
