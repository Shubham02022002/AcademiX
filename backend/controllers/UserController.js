import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import Course from '../models/CourseModel.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

export const userSignup = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        const newUser = new User({ username, password: await bcrypt.hash(password, 10) });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.headers;
        const user = await User.findOne({ username });
        if (!user) return res.status(403).json({ message: 'Invalid username or password' });

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return res.status(403).json({ message: "Invalid username or password" });
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error!" });
    }
}
export const getCourse = async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses });
}

export const purchaseCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
        const user = await User.findOne({ username: req.user.username });
        if (user) {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: 'Course purchased successfully' });
        } else {
            res.status(403).json({ message: 'User not found' });
        }
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

export const purchasedCourses = async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
}