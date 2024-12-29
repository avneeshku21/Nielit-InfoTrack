import express from 'express';
import { getMyProfile, login, logout, register } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router(); // Use `router` consistently

router.post('/register', register);
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)
router.get('/myProfile',isAuthenticated,getMyProfile)

export default router; // Export the router
