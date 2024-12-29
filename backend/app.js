import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import { userRouter } from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import { jobRouter } from "./routes/jobRouter.js";
import { applicationRouter } from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetter.js";

// Initialize app
const app = express();
config({ path: "./config/config.env" });

// Middleware for CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URI, "http://localhost:5173", "http://localhost:3000", "http://192.168.0.111:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies
  })
);

// Explicitly handle preflight OPTIONS requests
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URI || "http://localhost:5173" || "http://localhost:3000" || "http://192.168.0.111:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(204); // No content
  });
  

// Middleware for parsing cookies and JSON
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Route handlers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Load scheduled tasks
newsLetterCron();

// Connect to database
connection();

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from the Node.js server!" });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
