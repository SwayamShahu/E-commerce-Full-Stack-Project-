import { useState, useEffect } from "react";
import api from "../../services/api";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders/admin/all");
            setOrders(res.data || []);
        } catch (err) {
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/admin/${orderId}/status`, { status: newStatus });
            fetchOrders();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PLACED":
                return "bg-yellow-100 text-yellow-800";
            case "DELIVERED":
                return "bg-green-100 text-green-800";
            case "CANCELLED":
                return "bg-red-100 text-red-800";
            case "SHIPPED":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-lg">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">All Orders</h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">
                        {error}
                    </p>
                )}

                {orders.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl shadow-md">
                        <p className="text-gray-500">No orders found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                                        Order Date
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium">
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div>
                                                <p className="font-medium">
                                                    {order.user?.name || order.user?.email || "N/A"}
                                                </p>
                                                <p className="text-gray-500 text-xs">
                                                    {order.user?.email}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {order.orderItems?.length || 0} items
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold">
                                            ₹{order.totalAmount?.toFixed(2) || "0.00"}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status || "UNKNOWN"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(order.orderDate || order.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <select
                                                value={order.status || "PLACED"}
                                                onChange={(e) => handleStatusChange(order.orderId || order.id, e.target.value)}
                                                className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="PLACED">PLACED</option>
                                                <option value="SHIPPED">SHIPPED</option>
                                                <option value="DELIVERED">DELIVERED</option>
                                                <option value="CANCELLED">CANCELLED</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
