import { catchAsyncError } from "../middlewares/catchAsyncError";


const postJob = catchAsyncError(async (req, res, next) => {
    const {
        jobTitle,
        jobType,
        location,
        organizationName,
        organizationType,
        jobIntroduction,
        jobResponsibilites,
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
        !jobResponsibilites ||
        !jobQualifications ||
        !salary ||
        !jobNiche ||
        !howToApply ||
        !jobValidThrough
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
        jobResponsibilites,
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