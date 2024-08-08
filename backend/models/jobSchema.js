import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
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
        required: true
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
      howToApply: {
        type: String,
        required: true
     },
     postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
});

export const Job = mongoose.model("Job", jobSchema);