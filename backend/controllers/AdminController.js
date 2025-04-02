import Admin from "../models/AdminModel.js";
import Course from "../models/CourseModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

export const adminSignup = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        return res.status(403).json({ message: 'Admin already exists' });
    } else {
        const newAdmin = new Admin({
            username: username, password: await bcrypt.hash(password, 10)
        });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}

export const adminLogin = async (req, res) => {
    try {

        const { username, password } = req.headers;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(403).json({ message: 'Invalid username or password' });
        }
        const isPassword = await bcrypt.compare(password, admin.password);
        if (!isPassword) return res.status(403).json({ message: "Invalid username or password" });
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const createCourse = async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
}

export const updateCourse = async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

export const coursesByAdmin = async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
}
