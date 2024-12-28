import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const createCourse=async(req,res)=>{
    try{
        if(!req.files||Object.keys(req.files).length===0){
            return res.status(400).json({message:"Course Image is Required ! "})
        }
        const {courseImg}=req.files;
        const allowedFormats=["image/jpeg","image/png","image/webp"]
        if(!allowedFormats.includes(courseImg.mimetype))
        {
            return res.status(400).json({message:"Invalid photo formate. Only jpg and png are allowed"})
        }
            const {title ,category, about }=req.body;
            if(!title|| 
                !category ||
                 !about
            )
            {
                return res.status(400).json({message:"please fill above fields"})
            }
           
        
            const cloudinaryResponse=await cloudinary.uploader.upload(
                courseImg.tempFilePath
            )
            if(!cloudinaryResponse || cloudinaryResponse.error){
                console.log(cloudinaryResponse.error)
            }
    const adminName=req?.user?.name
    const adminPhoto=req?.user?.photo
        const courseData={
            title,
            about,
             
             category,
              adminName, 
              adminPhoto, 
              courseImg:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.url,
        }};
  const course=      await Course.create(courseData)
        
            res.status(201).json({message:"Course created Successfully",course})
        
    }catch(error)
    {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
    }
    };
    