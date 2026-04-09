// index.js
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

// 1. CORS Configuration (Keep this first)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

// 2. Global Middlewares (MUST come before routes)
app.use(express.json());
app.use(cookieParser()); // Critical: Without this, isAuth can't see tokens!

// 3. Route Declarations (Move these AFTER cookieParser)
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

const port = process.env.PORT || 8000;
connectDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
