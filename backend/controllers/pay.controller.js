require("dotenv").config();
const axios = require("axios");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const payment = asyncErrorHandler(async (req, res, next) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({
      status: "fail",
      message: "Email and amount are required",
    });
  }

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const paymentData = {
    email: email,
    amount: amount * 100,
    callback_url: `${frontendUrl}/verify`,
    cancel_url: `${frontendUrl}/verify?status=cancelled`,
    metadata: {
      custom_fields: [
        {
          display_name: "Order ID",
          variable_name: "order_id",
          value: req.body.order_id || "N/A",
        },
      ],
    },
  };

  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Paystack Response:", response.data);
  return res.status(200).json({
    status: "success",
    data: response.data,
  });
});

const verifyPayment = asyncErrorHandler(async (req, res) => {
  const { reference } = req.params;

  if (!reference) {
    return res.status(400).json({
      status: "fail",
      message: "Payment reference is required",
    });
  }

  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    }
  );

  res.status(200).json({
    status: "success",
    data: response.data,
    message: "Payment verification successful",
  });
});

module.exports = { payment, verifyPayment };
