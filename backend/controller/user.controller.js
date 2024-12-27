import { User } from "../models/user.model.js";

export const register=async(req,res)=>{
    const {email,name,password,phone,education,role}=req.body;
    if(!email|| !name || !password|| !phone||!education|| !role)
    {
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findOne({ email });
    if(user)
    {
        return res.status(400).json({message:"User Already exists with this email"});
    }
const newUser=new User({email,name, password, phone, education, role });
await newUser.save()
if(newUser){
    res.status(201).json({message:"User registered Successfully"})
}
};
