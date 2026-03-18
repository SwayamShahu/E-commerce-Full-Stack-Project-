import ProductCard from "./ProductCard";

const TrendingProducts = ({ products, onAddToCart }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Trending Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
