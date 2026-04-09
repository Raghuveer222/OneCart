import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const currency = "INR";
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// For User

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      status: "Order Placed",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in placing order",
    });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    // Define currency if not imported globally (usually 'INR' for Razorpay India)
    const currency = "INR";

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      status: "Order Placed",
      payment: false,
      date: Date.now(),
    };

    // 1. Save order to your Database
    const newOrder = new Order(orderData);
    await newOrder.save();

    // 2. Prepare options for Razorpay
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise (e.g., 1000 = ₹10.00)
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    // 3. Create Razorpay order using await
    // Note: razorpayInstance must be initialized in your config/controller
    const order = await razorpayInstance.orders.create(options);

    // 4. Send response to Frontend
    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
      razorpayOrder: order, // Frontend uses this to open the Razorpay checkout modal
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error in placing order",
    });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await Order.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
        paymentMethod: "Razorpay",
      });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      return res
        .status(200)
        .json({ success: true, message: "Payment verified and order updated" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in verifying payment" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });

    // Change this line to send a structured object
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "userOrders error" });
  }
};

// For Admin

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "adminAllOrders error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: "Status Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
