require("dotenv").config();
const axios = require("axios");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const payment = asyncErrorHandler(async (req, res, next) => {
  try {
    console.log("🚀 Payment initialization started");
    console.log("Request body:", req.body);
    console.log("Environment mode:", process.env.NODE_ENV);

    // Debug environment variables
    console.log("🔍 Environment Variables Debug:");
    console.log(
      "TEST_PAYSTACK_SECRET exists:",
      !!process.env.TEST_PAYSTACK_SECRET
    );
    console.log(
      "TEST_PAYSTACK_SECRET length:",
      process.env.TEST_PAYSTACK_SECRET?.length || 0
    );
    console.log(
      "TEST_PAYSTACK_SECRET starts with sk_test:",
      process.env.TEST_PAYSTACK_SECRET?.startsWith("sk_test_") || false
    );
    console.log(
      "All env keys containing 'PAYSTACK':",
      Object.keys(process.env).filter((key) => key.includes("PAYSTACK"))
    );

    const { email, amount } = req.body;

    if (!email || !amount) {
      console.log("❌ Missing email or amount");
      return res.status(400).json({
        status: "fail",
        message: "Email and amount are required",
      });
    }

    // Check if Paystack secret is available
    if (!process.env.TEST_PAYSTACK_SECRET) {
      console.error(
        "❌ TEST_PAYSTACK_SECRET not found in environment variables"
      );
      return res.status(500).json({
        status: "error",
        message: "Payment service not configured properly",
      });
    }

    const mode = process.env.NODE_ENV;
    const frontendUrl =
      mode === "development"
        ? "http://localhost:5173"
        : "https://temu-clone-zayn.vercel.app";

    console.log("Frontend URL for callbacks:", frontendUrl);

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

    console.log("💳 Sending payment data to Paystack:", paymentData);

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

    console.log("✅ Paystack Response:", response.data);

    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    console.error("💥 Payment initialization failed:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);

    if (error.response) {
      return res.status(error.response.status || 400).json({
        status: "error",
        message: error.response.data?.message || "Payment service error",
        details: error.response.data,
      });
    } else if (error.request) {
      return res.status(503).json({
        status: "error",
        message: "Unable to connect to payment service",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        details: error.message,
      });
    }
  }
});

const verifyPayment = asyncErrorHandler(async (req, res) => {
  try {
    console.log("🔍 Payment verification started");
    const { reference } = req.params;
    console.log("Reference to verify:", reference);

    if (!reference) {
      console.log("❌ No reference provided");
      return res.status(400).json({
        status: "fail",
        message: "Payment reference is required",
      });
    }

    if (!process.env.TEST_PAYSTACK_SECRET) {
      console.error("❌ TEST_PAYSTACK_SECRET not found for verification");
      return res.status(500).json({
        status: "error",
        message: "Payment verification service not configured",
      });
    }

    console.log("🔗 Verifying with Paystack API...");
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Verification response:", response.data);

    res.status(200).json({
      status: "success",
      data: response.data,
      message: "Payment verification successful",
    });
  } catch (error) {
    console.error("💥 Payment verification failed:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);

    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;

      if (status === 404) {
        return res.status(404).json({
          status: "error",
          message: "Payment reference not found",
          details:
            "The provided payment reference does not exist or is invalid",
        });
      }

      return res.status(status || 400).json({
        status: "error",
        message: errorData?.message || "Payment verification failed",
        details: errorData,
      });
    } else if (error.request) {
      return res.status(503).json({
        status: "error",
        message: "Unable to connect to payment service",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Failed to verify payment",
        details: error.message,
      });
    }
  }
});

module.exports = { payment, verifyPayment };
