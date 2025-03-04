import express from "express";
import { createSchedule, getScheduleByCourse } from "../controller/courseSchedule.controller.js";

import { isAuthenticated, isAdmin } from "../middleware/authUser.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("Admin"), createSchedule);
router.get("/course/:courseId", isAuthenticated,isAdmin("Admin") ,getScheduleByCourse);

export default router;