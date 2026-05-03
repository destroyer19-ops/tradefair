import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div className="bg-background-dark text-text-primary"> {/* Apply global colors */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
