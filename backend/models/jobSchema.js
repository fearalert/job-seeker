import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true
    },
    organizationType:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    jobIntroduction:{
        type: String
    },
    jobResponsibilites:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
    },
    jobType:{
        type: String,
        required: true,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
    },
    jobPostedOn:{
        type: Date,
        default: Date.now()
    },
    jobValidThrough:{
        type: Date,
        default: Date.now() + 21,
        required: true
    },
    jobBenefits:{
        type: String,
    },
    jobQualifications:{
        type: String,
        required: true
    },
    hiringMultipleCandidates: {
        type: String,
        default: "No",
        enum: ["Yes", "No"],
      },
      personalWebsite: {
        title: String,
        url: String
      },
      jobNiche: {
        type: String,
        required: true,
      },
      newsLettersSent: {
        type: Boolean,
        default: false,
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      howToApply: {
        type: String,
        required: true
    },
});

export const Job = mongoose.model("Job", jobSchema);