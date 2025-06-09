const User = require("../models/User");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const {
  verificationEmailTemplate,
  verificationSuccessTemplate,
  passwordResetTemplate,
  passwordResetSuccessTemplate,
} = require("../utils/emailTemplates");
const generateJwtAndSetToCookie = require("../utils/generateJwtAndSetToCookie");
const mailOptions = require("../utils/mailOptions");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    let user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user && user.verified) {
      return errorResponse(
        res,
        409,
        "Account already exist using this phone or email"
      );
    }

    if (user && !user.verified) {
      return errorResponse(
        res,
        409,
        "Account already exist. please verify your email!"
      );
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //send email
    const emailOptions = mailOptions({
      to: email,
      subject: "Verify Your Email Address",
      text: `Your verification code is ${verificationCode}`,
      html: verificationEmailTemplate(name, verificationCode),
    });
    const emailSent = await sendEmail(emailOptions);

    if (!emailSent) {
      return errorResponse(
        res,
        500,
        "Failed to send verification email. Please try again."
      );
    }

    //create user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      verificationCode,
      verificationCodeExpiry: Date.now() + 1000 * 60 * 60, // 1 hour
    });
    generateJwtAndSetToCookie(res, user._id);

    successResponse(
      res,
      201,
      "User created successfully. Please check your email for verification code.",
      (payload = { ...user._doc, password: null })
    );
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.body;
    console.log(verificationCode);

    if (!verificationCode) {
      return errorResponse(res, 400, "Verification code is required");
    }

    const user = await User.findOne({
      verificationCode,
      verificationCodeExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return errorResponse(res, 400, "Invalid verification code or expired");
    }

    if (user.verified) {
      return errorResponse(res, 400, "Email already verified");
    }

    user.verified = true;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    await user.save();

    // Send verification success email
    const emailOptions = mailOptions({
      to: user.email,
      subject: "Email Verification Successful",
      text: `Hello ${user.name}, your email has been successfully verified.`,
      html: verificationSuccessTemplate(user.name),
    });

    await sendEmail(emailOptions);

    successResponse(
      res,
      200,
      "Email Verified Successful",
      (payload = { ...user._doc, password: undefined })
    );
  } catch (error) {
    next(error);
  }
};

const resendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (user.verified) {
      return errorResponse(res, 400, "Email already verified");
    }

    // Generate new verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Update user with new verification code
    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    // Send email with new verification code
    const emailOptions = mailOptions({
      to: email,
      subject: "Verify Your Email Address",
      text: `Your new verification code is ${verificationCode}`,
      html: verificationEmailTemplate(user.name, verificationCode),
    });

    const emailSent = await sendEmail(emailOptions);

    if (!emailSent) {
      return errorResponse(
        res,
        500,
        "Failed to send verification email. Please try again."
      );
    }

    successResponse(
      res,
      200,
      "Verification code sent successfully. Please check your email."
    );
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 400, "Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return errorResponse(res, 400, "Invalid email or password");

    generateJwtAndSetToCookie(res, user._id);
    user.lastLogin = Date.now();
    await user.save();

    successResponse(
      res,
      200,
      "Login successful",
      (payload = { ...user._doc, password: undefined })
    );
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  successResponse(res, 200, "Logout successful");
};

const checkAuth = async (req, res, next) => {
  try {
    const user = req.user;
    successResponse(res, 200, "User authenticated", (payload = user));
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const passwordResetToken = crypto.randomBytes(32).toString("hex");

    // Send email with password reset link
    const emailOptions = mailOptions({
      to: user.email,
      subject: "Reset Your Password",
      text: `Hello ${user.name}, your password reset link is ${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`,
      html: passwordResetTemplate(
        user.name,
        process.env.FRONTEND_URL + `/reset-password/${passwordResetToken}`
      ),
    });

    const emailSent = await sendEmail(emailOptions);

    if (!emailSent) {
      return errorResponse(
        res,
        500,
        "Failed to send password reset email. Please try again."
      );
    }

    user.passwordResetToken = passwordResetToken;
    user.passwordResetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    successResponse(res, 200, "Password reset email sent");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    if (!token) {
      return errorResponse(res, 400, "You must provide a password reset token");
    }

    if (!newPassword?.trim()) {
      return errorResponse(res, 400, "You must provide a new password");
    }

    if (newPassword.trim() !== confirmPassword.trim()) {
      return errorResponse(res, 400, "Passwords do not match");
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return errorResponse(res, 400, "Invalid or expired password reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    await user.save();

    const emailOptions = mailOptions({
      to: user.email,
      subject: "Password Reset Successful",
      html: passwordResetSuccessTemplate(user.name),
    });

    await sendEmail(emailOptions);

    successResponse(res, 200, "Password reset successful");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  resendVerificationCode,
  loginUser,
  logoutUser,
  checkAuth,
  forgotPassword,
  resetPassword,
};
