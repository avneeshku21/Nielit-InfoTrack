import express from 'expresimport { getAdmins, getMyProfile, login, logout, register, updateProfile } from '../controller/user.controller.js'; // Add updateProfile
import { isAuthenticated } from '../middleware/authUser.js';

import { getAdmins, getMyProfile, login, logout, register } from '../controller/user.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/myProfile', isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);
router.put('/myProfile', isAuthenticated, updateProfile);  

router.post('/login',login)
router.get('/logout',isAuthenticated,logout)
router.get('/myProfile',isAuthenticated,getMyProfile)
router.get("/admins",getAdmins)
router.put("/api/users/update-profile/:id",isAuthenticated,isAdmin("Admin"))

export default router;