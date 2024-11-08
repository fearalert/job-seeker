import express from "express";
import {config} from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser"
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import { userRouter } from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import { jobRouter } from "./routes/jobRouter.js";
import { applicationRouter } from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetter.js";

const app = express();
config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URI, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(fileUpload({
    useTempFiles: true,
    tempFileDie: "/tmp/",
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);


newsLetterCron();
connection();

app.use(errorMiddleware)

export default app;