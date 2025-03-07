import express from 'express';
import { createCourse, deleteCourse, getAllCourses, myCourse, singleCourse, updateCourse } from '../controller/course.controller.js';
// import createSchedule from "../controller/courseSchedule.controller.js"
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';


const router = express.Router(); // Use `router` consistently

router.post('/create',isAuthenticated, isAdmin("Admin"), createCourse);
router.delete('/delete/:id', isAuthenticated ,isAdmin("Admin"),deleteCourse)
router.get("/allcourses" ,isAuthenticated,getAllCourses)
router.get('/singleCourse/:id',isAuthenticated,singleCourse)
router.get('/myCourse/',isAuthenticated,isAdmin("Admin"),myCourse)
router.put('/update/:id',isAuthenticated,isAdmin("Admin"),updateCourse)
// router.post("/create", isAuthenticated, isAdmin("Admin"), createSchedule);

export default router; // Export the router
