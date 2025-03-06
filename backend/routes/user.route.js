import express from 'express';
import { getAdmins, getMyProfile, login, logout, register } from '../controller/user.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router(); // Use `router` consistently

router.post('/register', register);
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)
router.get('/myProfile',isAuthenticated,getMyProfile)
router.get("/admins",getAdmins)
router.put("/api/users/update-profile/:id",isAuthenticated,isAdmin("Admin"))

export default router; // Export the router
