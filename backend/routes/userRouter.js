import express from "express";

import { forgotPassword, getUser, login, logout, register, updatePassword, updateProfile } from "../controllers/usersController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/profile", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/forgotpassword", forgotPassword);

export default router;

export const userRouter = router;