const express = require("express");
const { payment, verifyPayment } = require("../controllers/pay.controller");
const { testEnv } = require("../controllers/test.controller");
const { protectRoute } = require("../controllers/auth.controller");

const router = express.Router();

// Test endpoint (no auth required for debugging)
router.get("/test-env", testEnv);

// Payment endpoints
router.post("/", protectRoute, payment);
router.get("/verify/:reference", protectRoute, verifyPayment);

module.exports = router;
