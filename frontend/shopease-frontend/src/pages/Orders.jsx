import { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      console.log("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border-b py-4 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <p className="font-semibold">
                  Order ID: {order.id}
                </p>
                <p>Date: {order.orderDate}</p>
                <p>Total: ₹{order.totalAmount}</p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-white text-sm mt-3 md:mt-0 ${order.status === "DELIVERED"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                  }`}
              >
                {order.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
