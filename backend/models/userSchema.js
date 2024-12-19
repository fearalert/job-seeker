import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Name must contain at least 2 Characters"],
    maxLength: [50, "Name must contain at most 50 Characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  niches: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
    fourthNiche: String,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 Characters"],
    // maxLength: [32, "Password must contain at most 32 Characters"],
    select: false,
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer"],
  },
  refreshToken: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Hashing the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare user password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = bcrypt.genSaltSync(10);
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


export const User = mongoose.model("User", userSchema);
