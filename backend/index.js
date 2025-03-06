import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import courseRoute from "./routes/course.route.js";
import { getAllCourses } from "./controller/course.controller.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseScheduleRoutes from "./routes/courseSchedule.route.js";
import resultRoute from "./routes/result.route.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL; // Fixed typo: MONOGO_URL -> MONGO_URL

// ********* Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin
  credentials: true, // Allow cookies (for JWT)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
})); // Handle file uploads

// ********* Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// ********* Database Connection
try {
  mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB Connection Error:", error);
}

// ********* Defining Routes
app.use("/api/users", userRoute); // User routes (register, login, profile, etc.)
app.use("/api/courses", courseRoute); // Course routes
app.use("/api/courses", getAllCourses); // Note: This overwrites courseRoute; consider merging or renaming
app.use("/api/courseSchedule", courseScheduleRoutes); // Course schedule routes
app.use("/api/results", resultRoute); // Result routes

// ********* Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});