import mongoose from "mongoose";

const courseScheduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  coursename:{
type :String,
required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true // Example: "10:00 AM"
  },
  endTime: {
    type: String,
    required: true // Example: "12:00 PM"
  },
  description: {
    type: String,
    required: true
  }
});

export const CourseSchedule = mongoose.model("CourseSchedule", courseScheduleSchema);