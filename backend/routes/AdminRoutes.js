import express from "express";
import { authenticateJwt } from "../middleware/authMiddleware.js";
import {
    adminLogin,
    adminSignup,
    coursesByAdmin,
    createCourse,
    deleteCourse,
    isAdmin,
    updateCourse
} from "../controllers/AdminController.js";

const router = express.Router();

router.get('/me', authenticateJwt, isAdmin);
router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.post('/courses', authenticateJwt, createCourse);
router.put('/courses/:courseId', authenticateJwt, updateCourse);
router.get('/courses', authenticateJwt, coursesByAdmin);
router.delete('/course/:courseId', authenticateJwt, deleteCourse)

export default router;