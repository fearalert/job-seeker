import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [2, "Name must contain at least 2 Characters"],
        maxLength: [50, "Name must contain at most 50 Characters"],
    },
    email:{
        type: String,
        required: true,
        validate:[validator.isEmail, "Please provide valid email."]
    },
    phone:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    niches:{
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String,
        fourthNiche: String,
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 Characters"],
        maxLength: [16, "Password must contain at most 32 Characters"],
    },
    resume:{
        public_id: String,
        url: String,
    },
    coverLetter:{
        public_id: String,
        url: String,
    },
    role:{
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

export const User = mongoose.model("User", userSchema)