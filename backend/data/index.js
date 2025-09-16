const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("../models/product.model");

/* dotenv.config({ path: "./.env.local" });

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
} */

async function fixEstimatedDays() {
  await mongoose.connect(
    "mongodb+srv://admin:qdhVDqMUMcJfunxC@cluster0.411ftoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  ); // update with your DB

  const products = await Product.find({
    "shipping.options.estimated_days": { $exists: true },
  });

  for (const product of products) {
    let changed = false;
    if (product.shipping && Array.isArray(product.shipping.options)) {
      product.shipping.options.forEach((opt) => {
        if (typeof opt.estimated_days === "string") {
          const num = parseInt(opt.estimated_days, 10);
          if (!isNaN(num)) {
            opt.estimated_days = num;
            changed = true;
          }
        }
      });
    }
    if (changed) await product.save();
  }

  console.log("Done updating estimated_days to numbers.");
  mongoose.disconnect();
}

async function addFreeShippingOption() {
  await mongoose.connect(
    "mongodb+srv://admin:qdhVDqMUMcJfunxC@cluster0.411ftoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const products = await Product.find({});

  for (const product of products) {
    let changed = false;
    if (product.shipping && Array.isArray(product.shipping.options)) {
      const hasFree = product.shipping.options.some(
        (opt) => opt.method === "free"
      );
      if (!hasFree) {
        product.shipping.options.push({
          method: "free",
          estimated_days: 7,
          cost: 0,
        });
        changed = true;
      }
    }
    if (changed) await product.save();
  }

  console.log("Done adding free shipping option.");
  mongoose.disconnect();
}

async function lowercaseShippingMethods() {
  await mongoose.connect(
    "mongodb+srv://admin:qdhVDqMUMcJfunxC@cluster0.411ftoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const products = await Product.find({
    "shipping.options.method": { $exists: true },
  });

  for (const product of products) {
    let changed = false;
    if (product.shipping && Array.isArray(product.shipping.options)) {
      product.shipping.options.forEach((opt) => {
        if (
          typeof opt.method === "string" &&
          opt.method !== opt.method.toLowerCase()
        ) {
          opt.method = opt.method.toLowerCase();
          changed = true;
        }
      });
    }
    if (changed) await product.save();
  }

  console.log("Done lowercasing shipping option methods.");
  mongoose.disconnect();
}

// Run the lowercase update
lowercaseShippingMethods();
