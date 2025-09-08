export function GeneralInformation({ product, setProduct }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSize = (size) => {
    setProduct({ ...product, size });
  };

  return (
    <div className="bg-gray-100 p-2 rounded-2xl h-full">
      <div className="bg-gray-50 px-3 rounded-2xl h-full">
        <p className="text-lg font-medium mb-3 py-3">General Information</p>
        <p className="text-lg">Product name</p>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-200 py-1 my-2 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
          type="text"
          placeholder="Enter product name"
        />

        <p className="text-lg">Brand name</p>
        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-200 py-1 my-2 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
          type="text"
          placeholder="Enter brand name"
        />

        <p className="my-3">Product Description</p>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows={5}
          cols={20}
          placeholder="Enter product description"
          className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
        ></textarea>

        <div className="mt-4"></div>
        <p className="text-lg mb-3">Size & Gender</p>
        <div className="flex gap-3 flex-wrap mb-4">
          {["XS", "S", "M", "XL", "XXL"].map((size) => (
            <button
              key={size}
              onClick={() => handleSize(size)}
              type="button"
              className={`px-4 py-1 rounded-full border ${
                product.size === size
                  ? "bg-gray-300 border-gray-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex gap-6 mb-6">
          {["men", "women", "unisex"].map((gender) => (
            <label key={gender} className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={product.gender === gender}
                onChange={handleChange}
              />
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg mb-2">Base Price</p>
            <input
              name="basePrice"
              value={product.basePrice}
              onChange={handleChange}
              type="number"
              placeholder="$0.00"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
          <div>
            <p className="text-lg mb-2">Stock</p>
            <input
              name="stock"
              value={product.stock}
              onChange={handleChange}
              type="number"
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
          <div>
            <p className="text-lg mb-2">Discount price</p>
            <input
              name="discountPrice"
              value={product.discountPrice}
              onChange={handleChange}
              type="text"
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
          <div>
            <p className="text-lg mb-2">Percentage discount</p>
            <input
              name="percentageDiscount"
              value={product.percentageDiscount}
              onChange={handleChange}
              type="text"
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
