import express from 'express';
import { login, logout, register } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router(); // Use `router` consistently

router.post('/register', register);
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)

export default router; // Export the router
