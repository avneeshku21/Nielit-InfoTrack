import express from 'express';
import { getAdmins, getMyProfile, login, logout, register, updateProfile } from '../controller/user.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/myProfile', isAuthenticated, getMyProfile);
router.get('/admins', getAdmins);
router.put('/myProfile', isAuthenticated, updateProfile);

export default router;
