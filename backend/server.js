import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/AdminRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
const PORT = process.env.PORT;
connectDB();

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
