const express = require("express");
const { protectRoute } = require("../controllers/auth.controller");
const { createOrder } = require("../controllers/order.controller");

const router = express.Router();



router.post("/createOrder", protectRoute, createOrder);

module.exports = router;
