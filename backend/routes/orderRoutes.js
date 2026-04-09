import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  placeOrder,
  userOrders,
  verifyRazorpay,
} from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  allOrders,
  updateStatus,
  placeOrderRazorpay,
} from "../controller/orderController.js";

const orderRoutes = express.Router();

// For User
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay);
orderRoutes.get("/userorders", isAuth, userOrders);
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay);

//For Admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);

export default orderRoutes;
