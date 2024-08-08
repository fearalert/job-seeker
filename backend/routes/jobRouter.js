import express from "express";
import { deleteJob, getAllJobs, getMyPostedJobs, getSingleJob, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/postjob", isAuthenticated, isAuthorized("Employer"), postJob);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.put("/update/:id", isAuthenticated, isAuthorized("Employer"), updateJob);
router.get("/getalljobs", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyPostedJobs);
router.get("/getsinglejob/:id", getSingleJob);

export default router;

export const jobRouter = router;