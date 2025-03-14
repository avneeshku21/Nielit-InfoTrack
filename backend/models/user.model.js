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
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
    
},
education:{ 
    type:String,
    required:true
},
role:{
    type:String,
    required:true,
    enum:["User","Admin"],

},
password:{
    type:String,
    select:false,
    required:true,

},
address: { type: String, default: "" },


currentCourse: 
  { type: String,
     default: "" },

college: 
  { type: String, 
    default: ""
 },

  cgpa: 
  { type: Number, 
    default: null },

  relevantCoursework: 
  { type: [String], default: [] },

dateofbirth: {
    type:Number,
    required:true,

},

token:{
    type:String
},
createdAt:{
    type:Date,
    default:Date.now,
}

})
export const User=mongoose.model("User",userSchema,)