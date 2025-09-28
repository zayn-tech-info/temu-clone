const express = require("express");
const { payment, verifyPayment } = require("../controllers/pay.controller");
const { protectRoute } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/", protectRoute, payment);
router.get("/verify/:reference", protectRoute, verifyPayment);

module.exports = router;
