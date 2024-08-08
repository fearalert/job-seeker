import express from "express";
import { deleteJob, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/postjob", isAuthenticated, postJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.put("/update/:id", isAuthenticated, updateJob);

export default router;

export const jobRouter = router;