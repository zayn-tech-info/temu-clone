// Production Debug Script for Payment Issues
// Run this in browser console on production to debug payment flow

console.log("🔍 PAYMENT DEBUG SCRIPT STARTED");
console.log("=====================================");

// 1. Check environment
console.log("📋 ENVIRONMENT CHECK:");
console.log("Current URL:", window.location.href);
console.log("User Agent:", navigator.userAgent);
console.log("Is HTTPS:", window.location.protocol === "https:");

// 2. Check localStorage/sessionStorage
console.log("\n💾 STORAGE CHECK:");
console.log("LocalStorage items:", Object.keys(localStorage));
console.log("SessionStorage items:", Object.keys(sessionStorage));

// 3. Check network connectivity
console.log("\n🌐 NETWORK CHECK:");
fetch("/api/v1/pay/verify/test-connection", { method: "GET" })
  .then((response) => {
    console.log("✅ Backend connectivity:", response.status);
  })
  .catch((error) => {
    console.error("❌ Backend connectivity failed:", error);
  });

// 4. Test payment data structure
const testPaymentData = {
  email: "test@example.com",
  amount: 1000,
};

console.log("\n🧪 TESTING PAYMENT DATA:");
console.log("Test data:", testPaymentData);

// 5. Monitor console for errors
const originalError = console.error;
console.error = function (...args) {
  console.log("🚨 CONSOLE ERROR INTERCEPTED:", args);
  originalError.apply(console, args);
};

// 6. Monitor fetch requests
const originalFetch = window.fetch;
window.fetch = function (...args) {
  console.log("📡 FETCH REQUEST:", args[0], args[1]);
  return originalFetch
    .apply(this, arguments)
    .then((response) => {
      console.log("📡 FETCH RESPONSE:", response.status, response.url);
      return response;
    })
    .catch((error) => {
      console.error("📡 FETCH ERROR:", error);
      throw error;
    });
};

console.log("\n✅ Debug monitoring active. Try making a payment now.");
console.log("=====================================");

// Utility function to test payment manually
window.testPayment = function (email = "test@example.com", amount = 1000) {
  console.log("🧪 MANUAL PAYMENT TEST STARTED");

  // Get the payment store (adjust path if needed)
  const payStore = window.usePayStore?.getState();
  if (!payStore) {
    console.error("❌ Payment store not found");
    return;
  }

  payStore
    .makePayment({ email, amount })
    .then(() => {
      console.log("✅ Payment test completed");
    })
    .catch((error) => {
      console.error("❌ Payment test failed:", error);
    });
};

console.log("💡 Use window.testPayment() to test payment manually");
