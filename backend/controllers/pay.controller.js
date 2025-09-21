const axios = require("axios");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const payment = asyncErrorHandler(async (req, res, next) => {
  const { email, grandTotal } = res.body;

  const res = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    { email, amount: grandTotal * 100 },
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } }
  );

  res.json({
    url: res.data.data.authorization_url,
  });
});

const verifyPayment = asyncErrorHandler(async (req, res) => {
  const { reference } = req.params;
  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } }
  );

  res.json(response.data);
});

module.exports = { payment, verifyPayment };
