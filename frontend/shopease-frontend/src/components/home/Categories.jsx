import { categories } from "../../data/categoriesData";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
