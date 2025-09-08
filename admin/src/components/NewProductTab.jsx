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
    basePrice: "",
    stock: "",
    discountPrice: "",
    percentageDiscount: "",
    image: null,
    imagePreview: null,
  });

  const handleImageChange = (files) => {
    setProduct((prev) => ({
      ...prev,
      image: files,
      imagePreview: files?.[0]?.preview || null,
    }));
  };
  return (
    <div className="w-full p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 font-medium text-lg">
          <Kanban />
          <p>Add New Product</p>
        </div>
        <div className="flex gap-8">
          <button className="flex items-center border-2 rounded-3xl border-orange-300 px-5 py-2 gap-1">
            <Save />
            Save Draft
          </button>
          <button className="flex items-center gap-2 bg-orange-300 px-5 py-2 rounded-3xl">
            <Check />
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5">
        <div className="col-span-12 lg:col-span-7">
          <GeneralInformation product={product} setProduct={setProduct} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ImageInformation
            handleImageChange={handleImageChange}
            product={product}
          />
        </div>
      </div>
    </div>
  );
}
