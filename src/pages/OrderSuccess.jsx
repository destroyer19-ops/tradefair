import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const OrderSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*, packages(name, description, price)")
          .eq("ticket_code", reference)
          .single();
        if (error) throw new Error(error.message);

        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [reference]);
  console.log(order);
  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <p>{order?.ticket_code}</p>
          <p>{order?.student_name}</p>
          <p>{order?.packages?.name}</p>
          <p>{order?.pickup_day}</p>
          <p>Succcess</p>
        </div>
      )}
    </>
  );
};

export default OrderSuccess;
