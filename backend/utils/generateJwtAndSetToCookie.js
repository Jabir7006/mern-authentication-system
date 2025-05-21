const jwt = require("jsonwebtoken");

const generateJwtAndSetToCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};

module.exports = generateJwtAndSetToCookie;
