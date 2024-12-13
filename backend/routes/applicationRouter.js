import express from "express";
import { postApplication, employerGetAllApplications, jobSeekerGetAllApplications, deleteApplication, updateApplicationStatus } from "../controllers/applicationController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/post/:id", isAuthenticated, isAuthorized("Job Seeker"), postApplication);
router.get("/employer/applications", isAuthenticated, isAuthorized("Employer"), employerGetAllApplications);
router.get("/jobseeker/applications", isAuthenticated, isAuthorized("Job Seeker"), jobSeekerGetAllApplications);
router.put("/:id/status", isAuthenticated, isAuthorized("Employer"), updateApplicationStatus);
router.delete("/delete/:id", isAuthenticated, deleteApplication);

export default router;

export const applicationRouter = router;