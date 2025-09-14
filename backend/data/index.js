const fs = require("fs");
const Product = require("../models/product.model");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env.local" });

const connectToDB = require("../db/db");

const products = JSON.parse(fs.readFileSync("./data/product.json", "utf-8"));

connectToDB();

const deleteProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    console.log("Products successfully deleted");
  } catch (error) {
    console.log("An error occoured, try again");
  }
  process.exit();
};

// Helper to transform a product to match the schema
function transformProduct(p) {
  return {
    gender: p.gender || undefined,
    size: p.size || undefined,
    name: p.name,
    brand: p.brand || "",
    category: p.category,
    subCategory: p.subCategory || undefined,
    basePrice: typeof p.basePrice === "number" ? p.basePrice : 0,
    currency: p.currency || "N",
    discount: {
      percentage: p.discount?.percentage || 0,
      priceAfterDiscount: p.discount?.priceAfterDiscount || undefined,
    },
    stock: {
      available: p.stock?.available ?? true,
      quantity: p.stock?.quantity ?? 0,
    },
    images: Array.isArray(p.images) ? p.images : p.images ? [p.images] : [],
    description: p.description || "No description provided.",
    shipping: {
      weight: p.shipping?.weight || "",
      dimensions: p.shipping?.dimensions || "",
      from: p.shipping?.from || "",
      options: Array.isArray(p.shipping?.options) ? p.shipping.options : [],
    },
    rating: {
      average: p.rating?.average || 0,
      count: p.rating?.count || 0,
    },
    createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
  };
}

const importProducts = async (req, res) => {
  try {
    const transformedProducts = products.map(transformProduct);
    await Product.create(transformedProducts);
    console.log("Products added successfully");
  } catch (error) {
    console.log("An error occoured, try again: ", error);
  }
  process.exit();
};

if (process.argv[2] === "--delete") {
  deleteProducts();
} else if (process.argv[2] === "--import") {
  importProducts();
}
