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
    organizationName:{
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
    jobResponsibilities:{
        type: [String],
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    jobPostedOn:{
        type: Date,
        default: Date.now()
    },
    jobValidThrough:{
        type: Date,
        default: () => Date.now() + 21 * 24 * 60 * 60 * 1000, // Valid for 21 days in Default
    },
    
    jobBenefits:{
        type: [String],
    },
    jobQualifications:{
        type: [String],
        required: true
    },
    // hiringMultipleCandidates: {
    //     type: String,
    //     default: "No",
    //     enum: ["Yes", "No"],
    //   },
    hiringMultipleCandidates: {
        type: Boolean,
        default: false,
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