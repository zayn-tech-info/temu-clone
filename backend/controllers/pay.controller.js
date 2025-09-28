require("dotenv").config();
const axios = require("axios");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const payment = asyncErrorHandler(async (req, res, next) => {
  const { email, amount } = req.body;
  if (!email || !amount) {
    console.log("Missing email or amount");
    return res.status(400).json({
      status: "fail",
      message: "Email and amount are required",
    });
  }

  const mode = process.env.NODE_ENV;
  const frontendUrl =
    mode === "development"
      ? "http://localhost:5173"
      : "https://temu-clone-zayn.vercel.app";

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

  console.log("Sending payment data to Paystack:", paymentData);
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
  try {
    console.log("Payment verification started");
    const { reference } = req.params;
    console.log("Reference to verify:", reference);

    if (!reference) {
      console.log("No reference provided");
      return res.status(400).json({
        status: "fail",
        message: "Payment reference is required",
      });
    }

    console.log("Verifying with Paystack API...");
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Verification response:", response.data);

    res.status(200).json({
      status: "success",
      data: response.data,
      message: "Payment verification successful",
    });
  } catch (error) {
    console.error("💥 Payment verification failed:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
  }
});

module.exports = { payment, verifyPayment };
