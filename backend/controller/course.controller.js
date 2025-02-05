import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const createCourse = async (req, res) => {
    try {
      // Check if course image is uploaded
      if (!req.files || !req.files.courseImg) {
        return res.status(400).json({ message: "Course Image is required!" });
      }
  
      const { courseImg } = req.files;
  
      // Validate image format
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(courseImg.mimetype)) {
        return res.status(400).json({ message: "Invalid photo format. Only JPG, PNG, and WEBP are allowed." });
      }
  
      // Validate required fields
      const { title, category, about } = req.body;
      if (!title || !category || !about) {
        return res.status(400).json({ message: "Please fill in all required fields." });
      }
  
      // Upload course image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(courseImg.tempFilePath);
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Upload Error:", cloudinaryResponse.error);
        return res.status(500).json({ message: "Failed to upload course image." });
      }
  
      // Admin details from the logged-in user
      const adminName = req?.user?.name || "Unknown Admin";
      const adminPhoto = req?.user?.photo?.url || "";
  
      // Create course object
      const courseData = {
        title,
        about,
        category,
        adminName,
        adminPhoto,
        courseImg: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url, // Ensure secure URL
        },
      };
  
      // Save course in the database
      const course = await Course.create(courseData);
  
      res.status(201).json({ message: "Course created successfully!", course });
    } catch (error) {
      console.error("Create Course Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

    export const deleteCourse=async(req,res)=>{
        const {id}=req.params;
        const course=await Course.findById(id);
        if(!course)
        {
            return res.status(404).json({message:"Course not Found"})
        }
        await course.deleteOne();
        res.status(200).json({message:"Course deleted successfully"})
    }

    export const getAllCourses=async(req,res)=>{
        const allCourses=await Course.find()
        res.status(200).json(allCourses)
    }

    export const singleCourse=async(req,res)=>{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({message:"Invalid course id"})
        }
        const course=await Course.findById(id);
        if(!course)
        {
            return res.status(404).json({message:"Course not Found! "})
        }
        res.status(200).json(course);
    }

    export const myCourse=async(req,res)=>{
        try {
            let myCourses;
            if (req.user.role === "Admin") {
              myCourses = await Course.find(); // Admin sees all courses
            } else {
              myCourses = await Course.find({ createdBy: req.user._id }); // Regular users see their own courses
            }
            res.status(200).json(myCourses);
          } catch (error) {
            res.status(500).json({ error: "Server error while fetching courses" });
          }
        };

    export const updateCourse=async(req,res)=>{
      const{id}=req.params;
      if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({message:"Invalid Course id"})
        }   
        const updateCourse=await Course.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateCourse){
            return res.status(404).json({message:"Course not Found"})
        }
        res.status(200).json(updateCourse);
    }