import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    jobSeekerInfo: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name:{
            type: String,
            required: true,
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
        resume:{
            public_id: String,
            url: String,
        },
        coverLetter: {
            type: String,
            required: true,
          },
        role:{
            type: String,
            required: true,
            enum: ["Job Seeker"]
        },
    },
    employerInfo: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name:{
            type: String,
            required: true,
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
        role:{
            type: String,
            required: true,
            enum: ["Employer"]
        },
    },
    jobInfo: {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          jobTitle: {
            type: String,
            required: true,
          },
    },
    deletedBy: {
        jobSeeker: {
          type: Boolean,
          default: false,
        },
        employer: {
          type: Boolean,
          default: false,
        },
      },
});

export const ApplicationSchema = mongoose.model("Application", applicationSchema);