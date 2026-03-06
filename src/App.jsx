import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";
import Raffle from "./pages/Raffle";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/order/success" element={<OrderSuccess />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/raffle" element={<Raffle />} />
    </Routes>
  );
};

export default App;
