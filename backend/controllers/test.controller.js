// Test endpoint to check environment variables
const testEnv = (req, res) => {
  console.log("🧪 Environment Test Endpoint Called");
  
  const envTest = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    frontendUrl: process.env.FRONTEND_URL,
    hasPaystackSecret: !!process.env.TEST_PAYSTACK_SECRET,
    paystackSecretLength: process.env.TEST_PAYSTACK_SECRET?.length || 0,
    paystackSecretPrefix: process.env.TEST_PAYSTACK_SECRET?.substring(0, 10) + "...",
    allPaystackKeys: Object.keys(process.env).filter(key => key.includes('PAYSTACK')),
    envKeysCount: Object.keys(process.env).length
  };
  
  console.log("Environment Test Results:", envTest);
  
  res.json({
    status: "success",
    data: envTest,
    message: "Environment variables test"
  });
};

module.exports = { testEnv };