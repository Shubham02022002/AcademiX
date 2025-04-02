import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import adminRoutes from "./routes/AdminRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;
connectDB();

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
