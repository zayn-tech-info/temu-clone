const sendToken = (user, res, message, statusCode) => {
  const token = user.generateJWT();


  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    user,
  });
};

module.exports = sendToken;
