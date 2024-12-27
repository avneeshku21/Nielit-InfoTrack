import express from 'express';
import { login, register } from '../controller/user.controller.js';


const router = express.Router(); // Use `router` consistently

router.post('/register', register);
router.post('/login',login)

export default router; // Export the router
