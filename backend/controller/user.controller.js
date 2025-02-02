import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs"
import createTokenAndSaveCookies from "../jwt/AuthToken.js"



export const register=async(req,res)=>{
try{
    if(!req.files||Object.keys(req.files).length===0){
        return res.status(400).json({message:"User Photo is Required ! "})
    }
    const {photo}=req.files;
    const allowedFormats=["image/jpeg","image/png","image/webp"]
    if(!allowedFormats.includes(photo.mimetype))
    {
        return res.status(400).json({message:"Invalid photo formate. Only jpg and png are allowed"})
    }
        const {email,name,password,phone,education,role}=req.body;
        if(!email|| !name || !password|| !phone||!education|| !role||!photo)
        {
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({ email });
        if(user)
        {
            return res.status(400).json({message:"User Already exists with this email"});
        }
    
        const cloudinaryResponse=await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error)
        }
    
     const hashedPassword   =await bcrypt.hash(password,10);
    const newUser=new User({
        email,
        name,
         password:hashedPassword,
         phone,
          education, 
          role, 
          photo:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.url,
    }});
    await newUser.save()
    if(newUser){
       const token= await createTokenAndSaveCookies(newUser._id,res)
        res.status(201).json({message:"User registered Successfully",newUser,token:token})
    }
}catch(error)
{
console.log(error)
return res.status(500).json({message:"Internal Server Error"})
}
};

export const login=async(req,res)=>{
    const {email ,password,role}=req.body;
    try{
        if(!email ||!password || !role)
        {
            return res.status(400).json({message:"Please fill required fields"}) 
            }
            const user= await User.findOne({email}).select("+password");
            if(!user.password){
                res.status(400).json({message:"Password Not matched"})
            }
const isMatch=await bcrypt.compare(password,user.password)
if(!user||!isMatch)
{
    res.status(400).json({message:"Invalid email and Password"})
}

if(user.role!==role){
    return res.status(403).json({message:`Given role${role}not found`})
}
const token =await createTokenAndSaveCookies(user._id,res);
res.status(200).json({message:"User Login Successfully",user:{
    _id:user.id,
    name:user.name,
    email:user.email,
    role:user.role,
    
},
token:token
});


    }catch(error)
    {
console.log(error)
return res.status(500).json({error:"Internal Server error"})
    }

}

export const logout=async(req,res)=>{
  try{
     res.clearCookie("jwt",{httpOnly:true});
  res.status(200).json({message:"User Logged out Successfully"}); 
}
  catch(error)
  {
console.log(error)
return res.status(500).json({message:"Internal Server error"})
  }
}

export const getMyProfile=async(req,res)=>{
const user=await req.user;
res.status(200).json(user)

}
export const getAdmins=async (req,res)=>{
    const admins=await User.find({role:"Admin"})
    res.status(200).json(admins);
    
}