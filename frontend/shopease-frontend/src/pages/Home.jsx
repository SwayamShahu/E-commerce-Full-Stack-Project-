import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Carousel from "../components/home/Carousel";
import Categories from "../components/home/Categories";
import TrendingProducts from "../components/home/TrendingProducts";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await api.post(`/cart/add/${productId}`);
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err.response || err);
      const message = err.response?.data?.message || err.response?.data || "Failed to add to cart";
      alert(message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Carousel />
      <Categories />
      <TrendingProducts
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;
