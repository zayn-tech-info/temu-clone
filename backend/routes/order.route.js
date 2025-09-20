const express = require("express");
const { protectRoute } = require("../controllers/auth.controller");
const { createOrder, getMyOrders } = require("../controllers/order.controller");

const router = express.Router();



router.post("/createOrder", protectRoute, createOrder);
router.get("/getMyOrder", protectRoute, getMyOrders);

module.exports = router;