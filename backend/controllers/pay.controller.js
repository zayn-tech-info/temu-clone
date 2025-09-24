require("dotenv").config();
const axios = require("axios");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const payment = asyncErrorHandler(async (req, res, next) => {
  try {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({
        status: "fail",
        message: "Email and amount are required",
      });
    }

    // Use axios instead of https.request to avoid stream issues
    const paymentData = {
      email: email,
      amount: amount * 100, // Convert to kobo/cents
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
  } catch (error) {
    console.error("Payment initialization failed:", error);

    if (error.response) {
      return res.status(error.response.status || 400).json({
        status: "error",
        message: error.response.data?.message || "Payment service error",
        details: error.response.data,
      });
    } else if (error.request) {
      // Network error
      return res.status(503).json({
        status: "error",
        message: "Unable to connect to payment service",
      });
    } else {
      // Other error
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
});

const verifyPayment = asyncErrorHandler(async (req, res) => {
  const { reference } = req.params;

  if (!reference) {
    return res.status(400).json({
      status: "fail",
      message: "Payment reference is required",
    });
  }

  try {
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
    });
  } catch (error) {
    console.error(
      "Payment verification failed:",
      error.response?.data || error.message
    );

    if (error.response) {
      return res.status(error.response.status || 400).json({
        status: "error",
        message: error.response.data?.message || "Payment verification failed",
        details: error.response.data,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Failed to verify payment",
      });
    }
  }
});

module.exports = { payment, verifyPayment };
