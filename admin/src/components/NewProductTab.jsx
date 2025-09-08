import { Check, Kanban, Save } from "lucide-react";
import { GeneralInformation } from "./GeneralInformation";
import { ImageInformation } from "./ImageInformation";
import { useState } from "react";

export function NewProductTab() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    size: "",
    gender: "",
    basePrice: "",
    stock: "",
    discountPrice: "",
    percentageDiscount: "",
    image: null,
    imagePreview: null,
    category: "",
    subCategory: "",
  });

  console.log(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (files) => {
    setProduct((prev) => ({
      ...prev,
      image: files,
      imagePreview: files?.[0]?.preview || null,
    }));
  };
  return (
    <div className="w-full p-3 md:p-5">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <div className="flex items-center gap-2 font-medium">
          <Kanban className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-sm md:text-xl">Add New Product</p>
        </div>
        <div className="flex gap-4 md:gap-8">
          <button className="flex items-center justify-center border-2 rounded-full md:rounded-3xl border-orange-300 px-3 py-1 md:px-5 md:py-2 gap-1 hover:bg-orange-50">
            <Save className="w-4 h-4 md:w-5 md:h-5" />
            <p className="text-sm md:text-base">Save Draft</p>
          </button>
          <button className="flex items-center justify-center border-2 rounded-full md:rounded-3xl border-orange-300 px-3 py-1 md:px-5 md:py-2 gap-1 hover:bg-orange-50">
            <Check className="w-4 h-4 md:w-5 md:h-5" />
            <p className="text-sm md:text-base">Add Product</p>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5">
        <div className="col-span-12 lg:col-span-7">
          <GeneralInformation
            handleChange={handleChange}
            product={product}
            setProduct={setProduct}
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ImageInformation
            handleImageChange={handleImageChange}
            product={product}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
