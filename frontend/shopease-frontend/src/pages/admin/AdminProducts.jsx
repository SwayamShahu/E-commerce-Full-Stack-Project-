import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (error) {
            alert("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/admin/products/${id}`);
            fetchProducts();
            alert("Product deleted successfully");
        } catch (error) {
            alert("Failed to delete product");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-xl font-semibold">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Admin - Manage Products</h1>
                    <button
                        onClick={() => navigate("/admin/add-product")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add Product
                    </button>
                </div>

                {products.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 text-left border">Image</th>
                                    <th className="p-3 text-left border">Name</th>
                                    <th className="p-3 text-left border">Price</th>
                                    <th className="p-3 text-left border">Category</th>
                                    <th className="p-3 text-center border">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id} className="border hover:bg-gray-50">
                                        <td className="p-3 border">
                                            <img
                                                src={p.imageUrl}
                                                alt={p.name}
                                                className="h-12 w-12 object-contain"
                                            />
                                        </td>
                                        <td className="p-3 border font-medium">{p.name}</td>
                                        <td className="p-3 border text-green-600 font-semibold">
                                            ₹{p.price}
                                        </td>
                                        <td className="p-3 border">{p.category?.name || "N/A"}</td>
                                        <td className="p-3 border text-center space-x-2">
                                            <button
                                                onClick={() => navigate(`/admin/edit-product/${p.id}`)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
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

export default AdminProducts;
