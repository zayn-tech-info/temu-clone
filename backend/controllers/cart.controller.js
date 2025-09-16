const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const customError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const calculateShipping = (product, totalQuantity, option) => {
  if (totalQuantity <= 0) return 0;

  if (product.shipping && Array.isArray(product.shipping.options)) {
    const selectedOption = product.shipping.options.find(
      (opt) =>
        typeof opt.method === "string" &&
        typeof option === "string" &&
        opt.method.trim().toLowerCase() === option.trim().toLowerCase()
    );
    if (selectedOption && selectedOption.cost != null) {
      return typeof selectedOption.cost === "string"
        ? parseInt(selectedOption.cost, 10)
        : selectedOption.cost;
    }
    return 0;
  }
  return 0;
};

const getCart = asyncErrorHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product",
    "name basePrice images currency priceAfterDiscount shipping"
  );

  if (!cart) {
    return res.status(200).json({
      status: "success",
      data: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        shippingPrice: 0,
        grandTotal: 0,
        deliveryDays: 0,
      },
    });
  }

  let shippingCost = 0;
  let deliveryDays = 0;
  if (cart.items.length > 0) {
    const firstProduct = cart.items[0].product;
    shippingCost = calculateShipping(
      firstProduct,
      cart.totalQuantity,
      cart.shippingOption
    );
    if (
      firstProduct &&
      firstProduct.shipping &&
      Array.isArray(firstProduct.shipping.options)
    ) {
      const selectedOption = firstProduct.shipping.options.find(
        (opt) =>
          typeof opt.method === "string" &&
          typeof cart.shippingOption === "string" &&
          opt.method.trim().toLowerCase() ===
            cart.shippingOption.trim().toLowerCase()
      );
      if (selectedOption && selectedOption.estimated_days != null) {
        deliveryDays =
          typeof selectedOption.estimated_days === "string"
            ? parseInt(selectedOption.estimated_days, 10)
            : selectedOption.estimated_days;
        if (isNaN(deliveryDays)) deliveryDays = 0;
      }
    }
  }
  cart.totalShippingPrice = shippingCost;
  cart.deliveryDays = deliveryDays;
  await cart.save();
  const grandTotal = cart.totalPrice + cart.totalShippingPrice;

  res.status(200).json({
    status: "success",
    data: {
      cart: {
        ...cart.toObject(),
        shippingPrice: cart.totalShippingPrice,
        grandTotal,
        deliveryDays: cart.deliveryDays,
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

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      totalShippingPrice: 0,
      shippingOption: "standard",
      deliveryDays: 0,
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

  // Calculate shipping from the first product's shipping option cost
  let shippingCost = 0;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (firstProduct) {
      shippingCost = calculateShipping(
        firstProduct,
        cart.totalQuantity,
        cart.shippingOption
      );
    }
  }
  cart.totalShippingPrice = shippingCost;

  // Set deliveryDays and get selected shipping option from the first product in cart
  let deliveryDays = 0;
  let selectedOption = null;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (
      firstProduct &&
      firstProduct.shipping &&
      Array.isArray(firstProduct.shipping.options)
    ) {
      selectedOption = firstProduct.shipping.options.find(
        (opt) => opt.method === cart.shippingOption
      );
      if (selectedOption && selectedOption.estimated_days) {
        deliveryDays = parseInt(selectedOption.estimated_days, 10) || 0;
      }
    }
  }
  cart.deliveryDays = deliveryDays;
  await cart.save();

  return res.status(200).json({
    status: "success",
    data: {
      items: cart.items,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
      shippingPrice: cart.totalShippingPrice,
      grandTotal: cart.totalPrice + cart.totalShippingPrice,
      deliveryDays: cart.deliveryDays,
      shippingOption: selectedOption,
    },
  });
});

const updateCart = asyncErrorHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (quantity == null || isNaN(quantity)) {
    return next(
      new customError("Quantity is required and must be a number", 400)
    );
  }

  if (quantity < 0) {
    return next(new customError("Quantity can't be negative", 400));
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new customError("Cart not found", 404));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(new customError("Product not found in cart", 404));
  }

  if (quantity === 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.priceAtTime,
    0
  );

  let shippingCost = 0;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (firstProduct) {
      shippingCost = calculateShipping(
        firstProduct,
        cart.totalQuantity,
        cart.shippingOption
      );
    }
  }
  cart.totalShippingPrice = shippingCost;

  let deliveryDays = 0;
  let selectedOption = null;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (
      firstProduct &&
      firstProduct.shipping &&
      Array.isArray(firstProduct.shipping.options)
    ) {
      selectedOption = firstProduct.shipping.options.find(
        (opt) => opt.method === cart.shippingOption
      );
      if (selectedOption && selectedOption.estimated_days) {
        deliveryDays = parseInt(selectedOption.estimated_days, 10) || 0;
      }
    }
  }
  cart.deliveryDays = deliveryDays;

  await cart.save();

  return res.status(200).json({
    status: "success",
    data: {
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity,
      shippingPrice: cart.totalShippingPrice,
      grandTotal: cart.totalPrice + cart.totalShippingPrice,
      deliveryDays: cart.deliveryDays,
      shippingOption: selectedOption,
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

  // Calculate shipping from the first product's shipping option cost
  let shippingCost = 0;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (firstProduct) {
      shippingCost = calculateShipping(
        firstProduct,
        cart.totalQuantity,
        cart.shippingOption
      );
    }
  }
  cart.totalShippingPrice = shippingCost;

  let deliveryDays = 0;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (
      firstProduct &&
      firstProduct.shipping &&
      Array.isArray(firstProduct.shipping.options)
    ) {
      const selectedOption = firstProduct.shipping.options.find(
        (opt) => opt.method === cart.shippingOption
      );
      if (selectedOption && selectedOption.estimated_days) {
        deliveryDays = parseInt(selectedOption.estimated_days, 10) || 0;
      }
    }
  }
  cart.deliveryDays = deliveryDays;
  await cart.save();
  res.status(200).json({
    status: "success",
    data: {
      cart: {
        ...cart.toObject(),
        shippingPrice: cart.totalShippingPrice,
        grandTotal: cart.totalPrice + cart.totalShippingPrice,
        deliveryDays: cart.deliveryDays,
      },
    },
  });
});

const updateShippingOption = asyncErrorHandler(async (req, res, next) => {
  const { shippingOption } = req.body;
  const userId = req.user.id;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new customError("Cart not found", 404));
  }

  cart.shippingOption = shippingOption || "standard";
  // Calculate shipping from the first product's shipping option cost
  let shippingCost = 0;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (firstProduct) {
      shippingCost = calculateShipping(
        firstProduct,
        cart.totalQuantity,
        cart.shippingOption
      );
    }
  }
  cart.totalShippingPrice = shippingCost;

  let deliveryDays = 0;
  if (cart.items.length > 0) {
    const firstProduct = await Product.findById(cart.items[0].product);
    if (
      firstProduct &&
      firstProduct.shipping &&
      Array.isArray(firstProduct.shipping.options)
    ) {
      const selectedOption = firstProduct.shipping.options.find(
        (opt) => opt.method === cart.shippingOption
      );
      if (selectedOption && selectedOption.estimated_days) {
        deliveryDays = parseInt(selectedOption.estimated_days, 10) || 0;
      }
    }
  }
  cart.deliveryDays = deliveryDays;
  await cart.save();
  res.status(200).json({
    status: "success",
    data: {
      cart: {
        ...cart.toObject(),
        shippingPrice: cart.totalShippingPrice,
        grandTotal: cart.totalPrice + cart.totalShippingPrice,
        deliveryDays: cart.deliveryDays,
      },
    },
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  updateShippingOption,
};
