import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    onAddToCart(product.id);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 cursor-pointer"
    >
      <div className="flex justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 object-contain"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg truncate">
          {product.name}
        </h3>

        <p className="text-green-600 font-bold mt-1">
          ₹{product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
