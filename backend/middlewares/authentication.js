import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('+role');
    if (!req.user) {
      return next(new ErrorHandler("User not found.", 404));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token.", 401));
  }
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("User is not authenticated.", 401)); 
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not authorized to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
