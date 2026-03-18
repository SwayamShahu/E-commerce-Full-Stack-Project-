import { useEffect, useState } from "react";
import api from "../services/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      console.log("Cart response:", response.data);
      // Handle different possible response structures
      const items = response.data.cartItems || response.data.items || [];
      setCartItems(items);
    } catch (err) {
      console.log("Error fetching cart:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (err) {
      console.log("Error removing item");
    }
  };

  const handleIncrease = async (productId) => {
    try {
      await api.post(`/cart/add/${productId}`);
      fetchCart();
    } catch (err) {
      console.log("Error increasing quantity");
    }
  };

  const handleDecrease = async (productId, currentQuantity) => {
    try {
      // If quantity is 1, remove the item instead of decreasing
      if (currentQuantity <= 1) {
        await api.delete(`/cart/remove/${productId}`);
      } else {
        await api.put(`/cart/decrease/${productId}`);
      }
      fetchCart();
    } catch (err) {
      console.log("Error decreasing quantity:", err);
      // Refresh cart anyway to sync state
      fetchCart();
    }
  };

  const handleCheckout = async () => {
    try {
      await api.post("/orders/checkout");
      alert("Order placed successfully!");
      fetchCart();
    } catch (err) {
      alert("Checkout failed");
    }
  };

  // Use item.price (stored at add time) or fallback to product.price
  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.price || item.product?.price || 0;
    return total + price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          My Cart
        </h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.imageUrl || "/placeholder.png"}
                    alt={item.product?.name || "Product"}
                    className="h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {item.product?.name || "Unknown Product"}
                    </h3>
                    <p>₹{item.price || item.product?.price || 0}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDecrease(item.product?.id || item.productId, item.quantity)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.product?.id || item.productId)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.product?.id || item.productId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-4 md:mt-0"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <h3 className="text-xl font-bold">
                Total: ₹{totalAmount}
              </h3>

              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
