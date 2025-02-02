import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import courseRoute from "./routes/course.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

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
app.get("/api/courses/allcourses", (req, res) => {
  res.json([
    { id: 1, name: "React Basics", description: "Learn the basics of React." },
    { id: 2, name: "Advanced JavaScript", description: "Deep dive into JavaScript." },
  ]);
});

/***************Cloudinary Code*******/
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})