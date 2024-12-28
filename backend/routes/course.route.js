import express from 'express';
import { createCourse } from '../controller/course.controller.js';


const router = express.Router(); // Use `router` consistently

router.post('/create', createCourse);


export default router; // Export the router
