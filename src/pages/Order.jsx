import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Order = () => {
  const [formDetails, setFormDetails] = useState({});
  const [slots, setSlots] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // slots
        setLoading(true);
        const response = await fetch("/api/get-availability");
        if (!response.ok) {
          throw new Error("Failed to fetch  order availability");
        }
        const results = await response.json();
        setSlots(results.data);

        // packages
        // const { data } = await supabase.from("packages").select("*");
        // packages
        const { data, error: pkgError } = await supabase
          .from("packages")
          .select("*");
        // console.log("packages data:", data);
        // console.log("packages error:", pkgError);
        if (pkgError) {
          throw new Error("Failed to fetch packages");
        }
        setPackages(data);
        // setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });

      const data = await response.json();
      console.log("API response:", data);
      console.log("authorization_url:", data.authorization_url);
      window.location.href = data.authorization_url;
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          {loading && <p>Loading...</p>}

          <div>
            <input
              value={formDetails.student_name}
              onChange={(e) =>
                setFormDetails({ ...formDetails, student_name: e.target.value })
              }
              type="text"
              name="student_name"
              placeholder="Full Name"
            />
          </div>

          <div>
            <input
              value={formDetails.email}
              onChange={(e) =>
                setFormDetails({ ...formDetails, email: e.target.value })
              }
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              value={formDetails.phone_number}
              onChange={(e) =>
                setFormDetails({ ...formDetails, phone_number: e.target.value })
              }
              type="tel"
              name="phone_number"
              placeholder="Phone Number (Whatsapp)"
            />
          </div>
          <div>
            <input
              value={formDetails.matric_number}
              onChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  matric_number: e.target.value,
                })
              }
              type="text"
              name="matric_number"
              placeholder="Matric Number"
            />
          </div>
          <div>
            <input
              value={formDetails.hall}
              onChange={(e) =>
                setFormDetails({ ...formDetails, hall: e.target.value })
              }
              type="text"
              name="hall"
              placeholder="Hall"
            />
          </div>
          <div>
            <input
              value={formDetails.room_number}
              onChange={(e) =>
                setFormDetails({ ...formDetails, room_number: e.target.value })
              }
              type="text"
              name="room_number"
              placeholder="Room Number"
            />
          </div>
          <div>
            <select
              value={formDetails.package_id}
              onChange={(e) =>
                setFormDetails({ ...formDetails, package_id: e.target.value })
              }
              name="package"
              id=""
            >
              <option value="">Select a package</option>

              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={formDetails.pickup_day}
              onChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  pickup_day: parseInt(e.target.value),
                })
              }
              name="pickup_day"
              id=""
            >
              <option value="">Select a Pickup day</option>

              {slots.map((slot) => (
                <option
                  key={slot.id}
                  value={slot.day}
                  disabled={slot.booked >= slot.capacity}
                >
                  {slot.label} — {slot.capacity - slot.booked} slots left
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" disabled={submitting}>
              {" "}
              {submitting ? "Processing ..." : "Submit"}{" "}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Order;
