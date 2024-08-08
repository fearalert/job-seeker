import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const postJob = catchAsyncError(async (req, res, next) => {
  const {
    jobTitle,
    jobType,
    location,
    organizationName,
    organizationType,
    jobIntroduction,
    jobResponsibilities,
    jobQualifications,
    salary,
    jobBenefits,
    hiringMultipleCandidates,
    personalWebsiteTitle,
    personalWebsiteUrl,
    jobNiche,
    jobValidThrough,
    howToApply
  } = req.body;


      if (
        !jobTitle ||
        !jobType ||
        !location ||
        !organizationName ||
        !organizationType ||
        !jobIntroduction ||
        !jobResponsibilities ||
        !jobQualifications ||
        !salary ||
        !jobNiche ||
        !howToApply 
        // !jobValidThrough
      ) {
        return next(new ErrorHandler("Please provide full job details.", 400));
      }
      if (
        (personalWebsiteTitle && !personalWebsiteUrl) ||
        (!personalWebsiteTitle && personalWebsiteUrl)
      ) {
        return next(
          new ErrorHandler(
            "Provide both the website url and title, or leave both blank.",
            400
          )
        );
      }
      const postedBy = req.user._id;

      const newJob = await Job.create({
        jobTitle,
        jobType,
        location,
        organizationName,
        organizationType,
        jobIntroduction,
        jobResponsibilities,
        jobQualifications,
        salary,
        jobBenefits,
        hiringMultipleCandidates,
        personalWebsite: {
            title: personalWebsiteTitle,
            url: personalWebsiteUrl,
          },
        jobNiche,
        jobValidThrough,
        howToApply,
        postedBy
    });

    res.status(201).json({
        success: true,
        message: "Job posted successfully.",
        newJob,
      });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Oops! Job not found. Go Back to Home Page", 404));
    }
    await job.deleteOne();
    res.status(200).json({
      success: true,
      message: "Job deleted Successfully.",
    });
  });


  export const updateJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    // Find the job by ID
    let job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found. Please check the ID and try again.", 404));
    }

    // Update the job with the new data
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true, // return the updated job
        runValidators: true // validate the updated fields
    });

    res.status(200).json({
        success: true,
        message: "Job updated successfully.",
        job
    });
});
