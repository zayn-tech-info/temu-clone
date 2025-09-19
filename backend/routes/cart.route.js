const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  updateShippingOption,
} = require("../controllers/cart.controller");
const { protectRoute } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/addToCart", protectRoute, addToCart);
router.patch("/updateCart", protectRoute, updateCart);
router.patch("/shipping", protectRoute, updateShippingOption);
router.delete("/removeFromCart/:itemId", protectRoute, removeFromCart);

module.exports = router;
