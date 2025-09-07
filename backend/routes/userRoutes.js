import express from 'express'
import { getUserProfile,loginUser,registerUser } from "../controllers/usercontroller.js";
import{ protect } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUser)
// Protected Route
userRoutes.get('/profile',protect,getUserProfile)

export default userRoutes;
