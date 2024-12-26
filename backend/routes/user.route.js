import express from 'express';
import { register } from '../controller/user.controller.js';


const router = express.Router(); // Use `router` consistently

router.post('/register', register);

export default router; // Export the router
