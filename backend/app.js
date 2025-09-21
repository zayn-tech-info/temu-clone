const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const sanitize = require("express-mongo-sanitize");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const globalError = require("./controllers/error.controller");
const connectToDB = require("./db/db");
const CustomError = require("./utils/customError");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const productsRoute = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");
// const paymentRouter = require("./routes/pay.route");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://temu-clone-zayn.vercel.app",
  "https://temu-clone-zayn-admin.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(cookieParser());

// let limiter = rateLimit({
//   max: 1000,
//   windowMs: 60 * 60 * 1000,
//   message:
//     "We have received too many requests from this IP, please try again after 1hr",
// });

// app.use("/api/", limiter);
app.use(express.json());

app.use(sanitize());
app.use(xss());
app.use(hpp({ whitelist: ["ratings", "avgratings", "category"] }));

app.use("/api/v1/products", productsRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
// app.use("/api/v1/pay", paymentRouter);

connectToDB();

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

app.use(globalError);

module.exports = app;
