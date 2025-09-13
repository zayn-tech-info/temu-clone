import { Check, Kanban, Save } from "lucide-react";
import { GeneralInformation } from "./GeneralInformation";
import { ImageInformation } from "./ImageInformation";
import { useState, useEffect } from "react";
import { useProductStore } from "../store/productStore";
import toast from "react-hot-toast";

const initialProduct = {
  name: "",
  brand: "",
  category: "",
  subCategory: "",
  basePrice: "",
  currency: "N",
  discount: {
    percentage: 0,
  },
  stock: {
    available: true,
    quantity: "",
  },
  images: [],
  imagePreview: null,
  description: "",
  shipping: {
    options: [], // e.g. ["standard","express"]
  },
  rating: {
    average: 0,
    count: 0,
  },
  size: "",
  gender: "",
};

function toNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isNaN(n) ? fallback : n;
}

function toBoolean(v) {
  if (typeof v === "boolean") return v;
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0" || v === "") return false;
  return Boolean(v);
}

export function NewProductTab() {
  const { addProduct, isAddingProduct } = useProductStore();
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    return () => {
      product.images?.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, [product.images]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("discount.")) {
      const field = name.split(".")[1];
      setProduct((prev) => ({
        ...prev,
        discount: { ...prev.discount, [field]: value },
      }));
    } else if (name.startsWith("stock.")) {
      const field = name.split(".")[1];
      setProduct((prev) => ({
        ...prev,
        stock: {
          ...prev.stock,
          [field]: field === "available" ? value === "true" : value,
        },
      }));
    } else if (name.startsWith("rating.")) {
      const field = name.split(".")[1];
      setProduct((prev) => ({
        ...prev,
        rating: { ...prev.rating, [field]: value },
      }));
    } else if (name === "shipping.options") {
      setProduct((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          options: value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (files) => {
    setProduct((prev) => ({
      ...prev,
      images: files,
      imagePreview: files?.[0]?.preview || null,
    }));
  };

  const validateForm = () => {
    const trimmed = {
      name: product.name.trim(),
      brand: product.brand.trim(),
      description: product.description.trim(),
      category: product.category.trim(),
      subCategory: product.subCategory.trim(),
    };
    
    if (!trimmed.name) return toast.error("Product name is required"), false;
    if (!trimmed.brand) return toast.error("Brand name is required"), false;
    if (!trimmed.description)
      return toast.error("Description is required"), false;
    if (!product.size.trim()) return toast.error("Size is required"), false;
    if (!product.gender.trim()) return toast.error("Gender is required"), false;
    if (!product.basePrice || Number(product.basePrice) <= 0)
      return toast.error("Base price must be greater than 0"), false;
    if (product.stock.quantity === "" || Number(product.stock.quantity) < 0)
      return toast.error("Stock quantity is required"), false;
    if (!trimmed.category) return toast.error("Category is required"), false;
    if (!trimmed.subCategory)
      return toast.error("Sub-category is required"), false;
    if (!product.images || product.images.length === 0)
      return toast.error("At least one product image is required"), false;
    return true;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;
    const basePriceNum = toNumber(product.basePrice);
    const discountPct = toNumber(product.discount.percentage);
    const preparedProduct = {
      ...product,
      basePrice: basePriceNum,
      discount: {
        percentage: discountPct,
        priceAfterDiscount:
          discountPct > 0
            ? Math.round(basePriceNum * (1 - discountPct / 100))
            : basePriceNum,
      },
      stock: {
        available: product.stock.available,
        quantity: toNumber(product.stock.quantity),
      },
      rating: {
        average: toNumber(product.rating.average),
        count: toNumber(product.rating.count),
      },
      shipping: {
        // TODO: Backend expects array of objects ({method,cost,estimated_days}); currently sending array of strings.
        options: Array.isArray(product.shipping.options)
          ? product.shipping.options
          : [],
      },
    };

    const result = await addProduct(preparedProduct);
    if (result?.success) {
      setProduct(initialProduct);
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
