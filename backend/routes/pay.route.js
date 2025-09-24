const express = require("express")
const { payment, verifyPayment } = require("../controllers/pay.controller");

const router = express.Router()

router.post("/", payment)
router.get("/verify/:reference", verifyPayment);
module.exports = router