import { useState, useEffect } from "react";

const Categories = () => {
  const categories = [
    "All",
    "Home & Kitchen",
    "Jewelry & Accessories",
    "Furniture",
    "Men's Clothing",
    "Women's Clothing",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dropdown for small screens
  const Dropdown = () => (
    <div className="relative w-full sm:hidden mb-4">
      <button
        className="w-full flex justify-between items-center px-4 py-2 border-2 border-gray-400 rounded-2xl bg-white hover:bg-orange-600 hover:text-white transition-all duration-300"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span>{selectedCategory}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`absolute left-0 right-0 mt-2 bg-white border-2 border-gray-400 rounded-2xl shadow-lg z-10 transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        {categories.map((el) => (
          <p
            key={el}
            className={`px-4 py-2 cursor-pointer hover:bg-orange-600 hover:text-white transition-all duration-200 ${
              selectedCategory === el ? "bg-orange-100 font-medium" : ""
            }`}
            onClick={() => {
              setSelectedCategory(el);
              setIsOpen(false);
            }}
          >
            {el}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Dropdown />
      {/* Horizontal categories for larger screens */}
      <div className="hidden sm:flex gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
