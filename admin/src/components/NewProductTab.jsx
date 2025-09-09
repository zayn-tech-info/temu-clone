import { Check, Kanban, Save } from "lucide-react";
import { GeneralInformation } from "./GeneralInformation";
import { ImageInformation } from "./ImageInformation";
import { useState } from "react";
import { useProductStore } from "../store/productStore";
import toast from "react-hot-toast";

export function NewProductTab() {
  const { addProduct, isAddingProduct } = useProductStore();
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
    imagePreview: null,
    category: "",
    subCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (files) => {
    setProduct((prev) => ({
      ...prev,
      images: files,
      imagePreview: files?.[0]?.preview || null,
    }));
  };

  const validateForm = () => {
    if (!product.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!product.brand.trim()) {
      toast.error("Brand name is required");
      return false;
    }
    if (!product.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!product.size) {
      toast.error("Size is required");
      return false;
    }
    if (!product.gender) {
      toast.error("Gender is required");
      return false;
    }
    if (!product.basePrice || Number(product.basePrice) <= 0) {
      toast.error("Base price must be greater than 0");
      return false;
    }
    if (product.stock === "" || Number(product.stock) < 0) {
      toast.error("Stock is required");
      return false;
    }
    if (!product.category.trim()) {
      toast.error("Category is required");
      return false;
    }
    if (!product.subCategory.trim()) {
      toast.error("Sub-category is required");
      return false;
    }
    if (!product.images || product.images.length === 0) {
      toast.error("At least one product image is required");
      return false;
    }
    return true;
  };

  const handleAddProduct = () => {
    const success = validateForm();
    if (!success) return;
    if (success === true) {
      addProduct(product);
    }
  };

  const handleSaveDraft = () => {
    toast("Draft saved!");
  };

  return (
    <div className="w-full p-3 md:p-5">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <div className="flex items-center gap-2 font-medium">
          <Kanban className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-sm md:text-xl">Add New Product</p>
        </div>
        <div className="flex gap-4 md:gap-8">
          <button
            className="flex items-center justify-center border-2 rounded-full md:rounded-3xl border-orange-300 px-3 py-1 md:px-5 md:py-2 gap-1 hover:bg-orange-50"
            type="button"
            onClick={handleSaveDraft}
          >
            <Save className="w-4 h-4 md:w-5 md:h-5" />
            <p className="text-sm md:text-base">Save Draft</p>
          </button>
          <button
            className="flex items-center justify-center border-2 rounded-full md:rounded-3xl border-orange-300 px-3 py-1 md:px-5 md:py-2 gap-1 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={handleAddProduct}
            disabled={isAddingProduct}
          >
            {isAddingProduct ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm md:text-base">Adding...</p>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-sm md:text-base">Add Product</p>
              </>
            )}
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
