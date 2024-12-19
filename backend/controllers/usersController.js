import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendjwtToken } from "../utils/sendjwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import generatePassword from "../utils/generatePassword.js";
import bcrypt from "bcrypt";

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      fourthNiche,
      coverLetter,
    } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fileds are required.", 400));
    }
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche || !fourthNiche)) {
      return next(
        new ErrorHandler("Please provide your preferred job niches.", 400)
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
        fourthNiche,
      },
      coverLetter,
    };
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Users_Resume" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud Server.", 500)
            );
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }
      }
    }
    const user = await User.create(userData);
    sendjwtToken(user, 201, res, "User Registered Successfully.")
  } catch (error) {
    next(error);
  }
});


export const login = catchAsyncError(async (req, res, next) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return next(new ErrorHandler("Email, password, and role are required.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (user.email !== email) {
    return next(new ErrorHandler("Invalid email.", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password.", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role.", 400));
  }

  sendjwtToken(user, 200, res, "User logged in successfully.");
});


export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
    message: "User Details",
  })
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
    const {
      name,
      email,
      phone,
      address,
      firstNiche,
      secondNiche,
      thirdNiche,
      fourthNiche,
      coverLetter,
    } = req.body;
  
    const newUserData = {
      name,
      email,
      phone,
      address,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
        fourthNiche,
      },
      coverLetter,
    };
  
    if (req.user.role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche || !fourthNiche)) {
      return next(new ErrorHandler("Please provide all the preferred niches.", 400));
    }
  
    if (req.files && req.files.resume) {
      const { resume } = req.files;
  
      if (resume) {
        const currentResumeId = req.user.resume?.public_id;
  
        if (currentResumeId) {
          await cloudinary.uploader.destroy(currentResumeId);
        }
  
        const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
          folder: "Users_Resume",
        });
  
        if (!newResume || newResume.error) {
          return next(new ErrorHandler("Failed to upload resume to cloud server.", 500));
        }
  
        newUserData.resume = {
          public_id: newResume.public_id,
          url: newResume.secure_url,
        };
      }
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });
  
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }
  
    res.status(200).json({
      success: true,
      user,
      message: "Profile Updated Successfully.",
    });
  });


export const updatePassword = catchAsyncError( async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
    }
    const isPasswordMatch = await user.comparePassword(oldPassword);
    if(!isPasswordMatch){
      return next(new ErrorHandler("Your old password is incorrect.", 400));
    }
    if(newPassword !== confirmPassword){
      return next(new ErrorHandler("Password does not match.", 400));
    }
    user.password = newPassword;
    await user.save();

    sendjwtToken(user, 200, res, "Password Updated Successfully.");
});


export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const newPassword = generatePassword();

  user.password = newPassword;
  await user.save();

  const message = `Your new password is: ${newPassword}\n\nPlease log in and change your password immediately.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your New Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `New password has been sent to ${user.email}`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
      user.password = undefined;
      await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Email could not be sent.", 500));
  }
});
