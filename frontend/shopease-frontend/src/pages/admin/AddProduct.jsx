import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: "",
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data || []);
        } catch (err) {
            console.log("Error fetching categories");
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!product.name || !product.price || !product.imageUrl) {
            setError("Name, Price, and Image URL are required");
            return;
        }

        setLoading(true);

        try {
            await api.post("/products", {
                name: product.name,
                description: product.description,
                price: parseFloat(product.price),
                imageUrl: product.imageUrl,
                categoryId: product.categoryId ? parseInt(product.categoryId) : null,
            });
            alert("Product added successfully!");
            navigate("/admin/products");
        } catch (err) {
            setError("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Product Name *
                        </label>
                        <input
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows={3}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                        <input
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Image URL *
                        </label>
                        <input
                            name="imageUrl"
                            value={product.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
