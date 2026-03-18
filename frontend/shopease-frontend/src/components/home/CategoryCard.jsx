const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer">
      <img
        src={category.image}
        alt={category.name}
        className="h-16 object-contain mb-3"
      />
      <p className="font-medium text-sm">{category.name}</p>
    </div>
  );
};

export default CategoryCard;
