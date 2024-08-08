import express from "express";
import { deleteJob, postJob } from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/postjob", isAuthenticated, postJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;

export const jobRouter = router;