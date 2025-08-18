const Categories = () => {
  const categories = [
    "All",
    "Home & kitchen",
    "Jewelry & Accessories",
    "Furniture",
    "Men's Clothing",
    "Women's Clothing",
  ];
  return (
    <div>
      <div className="flex gap-5 my-6">
        {categories.map((el) => (
          <p
            className="px-5 border-2 py-3 rounded-2xl cursor-pointer border-gray-400 hover:bg-orange-600 hover:text-white hover:font-medium transition-all duration-500"
            key={el}
          >
            {el}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Categories;
