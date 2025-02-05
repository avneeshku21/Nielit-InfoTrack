import mongoose from "mongoose";



const courseSchema=new mongoose.Schema({
title:{
    type:String,
    required:true
},

courseImg:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
    
},
category:{ 
    type:String,
    required:true
},
about:{
    type:String,
    required:true,

},
adminName:{
    type:String,
   
},
adminPhoto:{
type:String,

},

})
export const Course=mongoose.model("Course",courseSchema)