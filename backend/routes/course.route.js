import express from 'express';
import { createCourse } from '../controller/course.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';


const router = express.Router(); // Use `router` consistently

router.post('/create',isAuthenticated, isAdmin("admin"), createCourse);


export default router; // Export the router
