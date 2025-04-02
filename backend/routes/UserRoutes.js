import express from "express";
import {
    getCourse,
    purchasedCourses,
    purchaseCourse,
    userSignup,
    userLogin
} from "../controllers/UserController.js";
import { authenticateJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/courses', authenticateJwt, getCourse);
router.post('/courses/:courseId', authenticateJwt, purchaseCourse);
router.get('/purchasedCourses', authenticateJwt, purchasedCourses);

export default router;