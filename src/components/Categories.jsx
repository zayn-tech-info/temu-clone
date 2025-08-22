const Categories = () => {
  const categories = [
    "All",
    "Home & Kitchen",
    "Jewelry & Accessories",
    "Furniture",
    "Men's Clothing",
    "Women's Clothing",
  ];

  return (
    <div className="my-6">
      <div
        className="
          flex gap-3 sm:gap-5 
          overflow-x-auto scrollbar-hide 
          px-2 sm:px-0
        "
      >
        {categories.map((el) => (
          <p
            key={el}
            className="
              px-4 sm:px-5 py-2 sm:py-3 
              border-2 border-gray-400 
              rounded-2xl cursor-pointer 
              whitespace-nowrap
              hover:bg-orange-600 hover:text-white hover:font-medium 
              transition-all duration-300
            "
          >
            {el}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Categories;
