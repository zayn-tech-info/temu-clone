export function GeneralInformation() {
  return (
    <div className="bg-gray-100 p-2 rounded-2xl h-full">
      <div className="bg-gray-50 px-3 rounded-2xl h-full ">
        <p className="text-lg font-medium mb-3 py-3">General Information</p>

        <p className="text-lg">Product name</p>
        <input
          className="w-full rounded-md bg-gray-200 py-1 my-2 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
          type="text"
          placeholder="Enter Product Name"
        />
        <p className="my-3">Product Description</p>
        <textarea
          rows={5}
          cols={20}
          placeholder="Enter product description"
          className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
        ></textarea>

        <div className="mt-4"></div>
        <p className="text-lg mb-3">Size & Gender</p>
        <div className="flex gap-3 flex-wrap mb-4">
          <button className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
            XS
          </button>
          <button className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
            S
          </button>
          <button className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
            M
          </button>
          <button className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
            XL
          </button>
          <button className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
            XXL
          </button>
        </div>

        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="men"
              className="form-radio"
            />
            Men
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="women"
              className="form-radio"
            />
            Women
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="unisex"
              className="form-radio"
            />
            Unisex
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg mb-2">Base Price</p>
            <input
              type="number"
              placeholder="$0.00"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
          <div>
            <p className="text-lg mb-2">Stock</p>
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-md bg-gray-200 py-1 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
