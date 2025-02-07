import { CourseSchedule } from "../models/courseSchedule.model.js";

export const createSchedule = async (req, res) => {
  try {
    const { courseId, date, startTime, endTime, description } = req.body;
    if (!courseId || !date || !startTime || !endTime || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const schedule = await CourseSchedule.create({ courseId, date, startTime, endTime, description });
    res.status(201).json({ message: "Schedule created successfully!", schedule });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getScheduleByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const schedules = await CourseSchedule.find({ courseId });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
