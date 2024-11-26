import express from "express";
import { deleteJob, getAllJobs, getMyPostedJobs, getSingleJob, postJob, searchAllJobs, updateJob } from "../controllers/jobController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/postjob", isAuthenticated, isAuthorized("Employer"), postJob);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.put("/update/:id", isAuthenticated, isAuthorized("Employer"), updateJob);
router.get("/getalljobs", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyPostedJobs);
router.get("/getsinglejob/:id", getSingleJob);
router.get("/searchalljobs", searchAllJobs);

export default router;

export const jobRouter = router;