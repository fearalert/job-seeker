import express from "express";

import { login, logout, register } from "../controllers/usersController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

export default router;

export const userRouter = router;

