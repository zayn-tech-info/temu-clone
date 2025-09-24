# Production Payment Deployment Checklist

## 🔧 Backend Environment Variables (Required)

Add these to your production backend environment:

```bash
# Paystack Configuration
TEST_PAYSTACK_SECRET=sk_test_your_actual_secret_key

# Environment
NODE_ENV=production

# Database
MONGODB_URI=your_production_mongodb_uri

# JWT
JWT_SECRET=your_production_jwt_secret

# CORS
FRONTEND_URL=https://temu-clone-zayn.vercel.app
```

## 🌐 Frontend Environment Variables

Add these to your Vercel frontend environment:

```bash
# API Base URL
VITE_API_BASE_URL=https://temu-clone-backed.onrender.com

# Environment
MODE=production
```

## 📝 Debugging Steps

### 1. **Check Backend Logs**

- Look for payment initialization logs in your Render.com dashboard
- Check for "🚀 Payment initialization started" messages
- Verify Paystack API responses

### 2. **Check Frontend Network Tab**

- Open browser DevTools → Network tab
- Try payment flow
- Look for failed API calls to `/api/v1/pay/`
- Check response status codes

### 3. **Test Payment Endpoint Directly**

```bash
curl -X POST https://temu-clone-backed.onrender.com/api/v1/pay/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"email":"test@example.com","amount":1000}'
```

### 4. **Common Production Issues**

#### ❌ **Issue: CORS Errors**

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** Ensure backend has proper CORS configuration for frontend domain

#### ❌ **Issue: 500 Internal Server Error**

```
POST /api/v1/pay/ 500
```

**Solution:** Check backend logs for missing environment variables

#### ❌ **Issue: Network Error**

```
Failed to fetch / Network Error
```

**Solution:** Check if backend is running and accessible

#### ❌ **Issue: No Authorization URL**

```
No authorization URL received from payment service
```

**Solution:** Check Paystack API key and account status

## 🔍 Step-by-Step Debug Process

### Step 1: Verify Backend is Running

```bash
curl https://temu-clone-backed.onrender.com/health
```

### Step 2: Test Authentication

```bash
curl https://temu-clone-backed.onrender.com/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Step 3: Test Payment Endpoint

```bash
curl -X POST https://temu-clone-backed.onrender.com/api/v1/pay/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"email":"test@example.com","amount":1000}'
```

### Step 4: Check Response

Look for:

- `status: "success"`
- `data.data.authorization_url` exists
- No error messages

## 🚀 Quick Fixes

### Fix 1: Update Backend Port in Frontend

If using different ports, update `frontend/src/lib/axios.js`:

```javascript
const baseURL =
  mode === "development"
    ? "http://localhost:5000/" // ← Make sure this matches your backend port
    : "https://temu-clone-backed.onrender.com/";
```

### Fix 2: Add Environment Variables

In your Render.com backend dashboard:

1. Go to Environment tab
2. Add `TEST_PAYSTACK_SECRET`
3. Add `NODE_ENV=production`
4. Add `FRONTEND_URL=https://temu-clone-zayn.vercel.app`

### Fix 3: Enable CORS

Ensure your backend has CORS enabled for your frontend domain.

## 📞 Support Commands

### Get Backend Status

```bash
curl -I https://temu-clone-backed.onrender.com/
```

### Test Paystack API Key

```bash
curl https://api.paystack.co/transaction/verify/invalid_ref \
  -H "Authorization: Bearer sk_test_your_key"
```

### Check Frontend Build

```bash
npm run build && npm run preview
```

---

**💡 Pro Tip:** Use the debug script (`debug-payment.js`) in your browser console to monitor the payment flow in real-time!
