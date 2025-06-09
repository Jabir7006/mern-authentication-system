const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "circularadmin", "user"],
      default: "user",
    },

    lastLogin: {
      type: Date,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiry: {
      type: Date,
    },

    verificationCode: {
      type: Number,
    },
    verificationCodeExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
