import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Raffle = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("payment_status", "paid");
      if (error) return;
      setOrders(data);
    };
    fetchData();
  });
  const pickWinner = () => {
    setIsSpinning(true);
    const paidOrders = orders.filter((o) => o.payment_status === "paid");

    // cycle through random names rapidly
    let count = 0;
    const interval = setInterval(() => {
      const random = paidOrders[Math.floor(Math.random() * paidOrders.length)];
      setCurrentDisplay(random);
      count++;
      if (count > 20) {
        // after 20 cycles, stop
        clearInterval(interval);
        setWinner(random);
        setIsSpinning(false);
      }
    }, 100); // every 100ms
  };
  return <div>Raffle</div>;
};

export default Raffle;
