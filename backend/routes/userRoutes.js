import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import { getCurrentUser, getAdmin } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.get("/getCurrentUser", isAuth, getCurrentUser);
userRoutes.get("/getAdmin", adminAuth, getAdmin); // Admin email ko fetch karne ke liye route

export default userRoutes;
