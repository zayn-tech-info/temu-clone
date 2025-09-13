export function GeneralInformation({ handleChange, product, setProduct }) {
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
            <p className="text-lg mb-2">Stock Quantity</p>
            <input
              name="stock.quantity"
              value={product.stock?.quantity || ""}
              onChange={handleChange}
              type="number"
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
          <div>
            <p className="text-lg mb-2">Stock Available</p>
            <select
              name="stock.available"
              value={product.stock?.available ? "true" : "false"}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div>
            <p className="text-lg mb-2">Discount Percentage</p>
            <input
              name="discount.percentage"
              value={product.discount?.percentage || ""}
              onChange={handleChange}
              type="number"
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-lg mb-2 block">Average Rating</label>
            <input
              name="rating.average"
              value={product.rating?.average || ""}
              onChange={handleChange}
              type="number"
              min={0}
              step={0.1}
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-2 px-3 outline-none border-0 focus:border-2 focus:border-gray-400 text-gray-700"
            />
          </div>
          <div>
            <label className="text-lg mb-2 block">Rating Count</label>
            <input
              name="rating.count"
              value={product.rating?.count || ""}
              onChange={handleChange}
              type="number"
              min={0}
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-2 px-3 outline-none border-0 focus:border-2 focus:border-gray-400 text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
