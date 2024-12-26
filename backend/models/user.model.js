import mongoose from "mongoose";
import validator from "validator";
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true,
    validate:[validator.isEmail,"Please Enter valid Email"]
},
phone:{
    type:Number,
    required:true,
    unique:true

},
photo:{
    type:String,
    required:true
},
education:{
    type:String,
    required:true
},
role:{
    type:String,
    required:true,
    enum:["user","Admin"],

},
password:{
    type:String,
    select:false,
    required:true,

},
createdAt:{
    type:Date,
    default:Date.now,
}

})
export const User=mongoose.model("User",userSchema)