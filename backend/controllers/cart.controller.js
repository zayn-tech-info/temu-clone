const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const customError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const calculateShipping = (totalQuantity, option = "standard") => {
  if (totalQuantity <= 0) return 0;
  switch (option) {
    case "express":
      return 3500;
    case "free":
      return 0;
    case "standard":
    default:
      return 1500;
  }
};

const getCart = asyncErrorHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product",
    "name basePrice images currency shipping priceAfterDiscount"
  );

  if (!cart) {
    return res.status(200).json({
      status: "success",
      data: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        shipping: 0,
        grandTotal: 0,
      },
    });
  }
  const shipping = calculateShipping(cart.totalQuantity, cart.shippingOption);
  const grandTotal = cart.totalPrice + shipping;

  res.status(200).json({
    status: "success",
    data: {
      cart: {
        ...cart.toObject(),
        shipping,
        grandTotal,
      },
    },
  });
});

const addToCart = asyncErrorHandler(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);

  if (!product) {
    const error = new customError("Product not found", 404);
    return next(error);
  }

  if (!quantity || quantity < 1) {
    const error = new customError("Quantity must be at least 1", 400);
    return next(error);
  }

  if (product.stock.quantity === 0) {
    const error = new customError("This product is no longer available", 400);
    return next(error);
  } else if (product.stock.quantity < quantity) {
    const error = new customError(
      `Only ${product.stock.quantity} units available`,
      400
    );
    return next(error);
  }

  /*   const discountPrice =
    product.basePrice * (1 - product.discount.percentage / 100); */

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    });
  }

  const itemIndex = cart.items.findIndex(
    (index) => index.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
    cart.items[itemIndex].priceAtTime = product.discount.priceAfterDiscount;
    cart.items[itemIndex].discount = {
      percentage: product.discount.percentage,
      priceAfterDiscount: product.discount.priceAfterDiscount,
    };
    cart.items[itemIndex].stock = {
      available: product.stock.available,
      quantity: product.stock.quantity,
    };
  } else {
    cart.items.push({
      product: productId,
      quantity,
      priceAtTime: product.discount.priceAfterDiscount,
      discount: {
        percentage: product.discount.percentage,
        priceAfterDiscount: product.discount.priceAfterDiscount,
      },
      stock: {
        available: product.stock.available,
        quantity: product.stock.quantity,
      },
    });
  }

  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.priceAtTime,
    0
  );

  await cart.save();

  return res.status(200).json({
    status: "success",
    data: {
      items: cart.items,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
      shipping: calculateShipping(cart.totalQuantity, cart.shippingOption),
      grandTotal:
        cart.totalPrice +
        calculateShipping(cart.totalQuantity, cart.shippingOption),
    },
  });
});

const updateCart = asyncErrorHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (quantity < 0) {
    const error = new customError("Quantity can't be negative");
    return next(error);
  }

  const product = await Product.findById(productId);
  if (!product) {
    const error = new customError("Product not found", 404);
    return next(error);
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    const error = new customError("Cart not found", 404);
    return next(error);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    const error = new customError("Product not found in cart", 404);
    return next(error);
  }

  if (quantity === 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    if (product.stock.quantity === 0) {
      const error = new customError("This product is no longer available", 400);
      return next(error);
    } else if (product.stock.quantity < quantity) {
      const error = new customError(
        `Only ${product.stock.quantity} units available`,
        400
      );
      return next(error);
    }
  }

  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].priceAtTime =
    product.discount.priceAfterDiscount * cart.items[itemIndex].quantity;

  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.totalPrice = cart.items.reduce((sum, item) => sum + item.priceAtTime, 0);

  await cart.save();

  return res.status(200).json({
    status: "succes",
    data: {
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity,
      shipping: calculateShipping(cart.totalQuantity, cart.shippingOption),
      grandTotal:
        cart.totalPrice +
        calculateShipping(cart.totalQuantity, cart.shippingOption),
    },
  });
});

const removeFromCart = asyncErrorHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    const error = new customError("Cart not found", 404);
    return next(error);
  }

  const item = cart.items.id(req.params.itemId);
  if (!item) {
    const error = new customError("Item not found in cart", 404);
    return next(error);
  }

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== req.params.itemId
  );

  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.priceAtTime * item.quantity,
    0
  );

  await cart.save();
  res.status(200).json({
    status: "success",
    data: {
      cart: {
        ...cart.toObject(),
        shipping: calculateShipping(cart.totalQuantity, cart.shippingOption),
        grandTotal:
          cart.totalPrice +
          calculateShipping(cart.totalQuantity, cart.shippingOption),
      },
    },
  });
});

module.exports = { getCart, addToCart, updateCart, removeFromCart };
