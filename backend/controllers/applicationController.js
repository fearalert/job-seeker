import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { ApplicationSchema } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;

    if (!name || !email || !phone || !address || !coverLetter) {
        return next(new ErrorHandler("All fields are required.", 400));
    }

    const jobDetails = await Job.findById(id);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found.", 404));
    }

    const isAlreadyApplied = await ApplicationSchema.findOne({
        "jobInfo.jobId": id,
        "jobSeekerInfo.id": req.user._id,
    });
    if (isAlreadyApplied) {
        return next(new ErrorHandler("You have already applied for this job.", 400));
    }

    const jobSeekerInfo = {
        id: req.user._id,
        name,
        email,
        phone,
        address,
        coverLetter,
        role: "Job Seeker",
    };

    const employerInfo = {
        id: jobDetails.postedBy,
        name,
        email,
        phone,
        address,
        coverLetter,
        role: "Employer",
    };

    if (req.files && req.files.resume) {
        const { resume } = req.files;
        if (resume) {
            const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
                folder: "Users_Resume",
            });

            if (!newResume || newResume.error) {
                return next(new ErrorHandler("Failed to upload resume to cloud server.", 500));
            }

            jobSeekerInfo.resume = {
                public_id: newResume.public_id,
                url: newResume.secure_url,
            };
        }
    } else {
        if (!req.user?.resume?.url) {
            return next(new ErrorHandler("Please upload your resume.", 400));
        }
        jobSeekerInfo.resume = {
            public_id: req.user.resume.public_id,
            url: req.user.resume.url,
        };
    }

    const jobInfo = {
        jobId: id,
        jobTitle: jobDetails.jobTitle,
        jobDescription: jobDetails.jobIntroduction,
        jobNiche: jobDetails.jobNiche,
        jobQualifications: jobDetails.jobQualifications,
        jobResponsibilities: jobDetails.jobResponsibilities,
        salary: jobDetails.salary,
    };

    const application = await ApplicationSchema.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo,
    });

    res.status(201).json({
        success: true,
        message: "Application submitted successfully.",
        application,
    });
});

export const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;
    const applications = await ApplicationSchema.find({
        "employerInfo.id": _id,
        "deletedBy.employer": false,
    });

    res.status(200).json({
        success: true,
        applications,
    });
});

export const jobSeekerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { _id } = req.user;
    const applications = await ApplicationSchema.find({
        "jobSeekerInfo.id": _id,
        "deletedBy.jobSeeker": false,
    });

    res.status(200).json({
        success: true,
        applications,
    });
});

export const deleteApplication = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const application = await ApplicationSchema.findById(id);
    if (!application) {
        return next(new ErrorHandler("Application not found.", 404));
    }

    const { role } = req.user;
    switch (role) {
        case "Job Seeker":
            application.deletedBy.jobSeeker = true;
            break;
        case "Employer":
            application.deletedBy.employer = true;
            break;
        default:
            return next(new ErrorHandler("Unauthorized action.", 403));
    }

    await application.save();

    if (application.deletedBy.employer && application.deletedBy.jobSeeker) {
        await application.deleteOne();
    }

    res.status(200).json({
        success: true,
        message: "Application deleted successfully.",
    });
});
