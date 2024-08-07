import express from "express";

import { login, register } from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;

export const userRouter = router;

