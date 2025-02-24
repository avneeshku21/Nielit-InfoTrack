import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import courseRoute from "./routes/course.route.js"
import { getAllCourses } from "./controller/course.controller.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import courseScheduleRoutes from "./routes/courseSchedule.route.js";

const app = express()
dotenv.config()
const port = process.env.PORT || 5000;
const MONOGO_URL=process.env.MONGO_URL
//*********Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

// app.get("/api/contests", async (req, res) => {
//   try {
//     const response = await fetch("https://contest-hive.vercel.app/api/all");
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!Array.isArray(data)) {
//       throw new Error("Invalid API response: Expected an array");
//     }

//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching contests:", error);
//     res.status(500).json({ error: error.message });
//   }
// });





//**********file upload
app.use(fileUpload({
useTempFiles:true,
tempFileDir:"/tmp/",
})
)



//*******Database conneted

try{
mongoose.connect(MONOGO_URL)
console.log("Connected to MongoDB")
}catch(error){
console.log(error)
}

// ********defining Routes..........
app.use("/api/users",userRoute);
//app.use("/api/courses",courseRoute);
app.use("/api/courseSchedule", courseScheduleRoutes); 
app.use("/api/courses", courseRoute)
app.use("/api/courses", getAllCourses);
/***************Cloudinary Code*******/
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})