import express from "express";
import { addProduct } from "../controller/productController.js";
import { listProduct } from "../controller/productController.js";
import { removeProduct } from "../controller/productController.js";
import adminAuth from "../middleware/adminAuth.js";

import multer from "multer";

const productRoutes = express.Router();

// ✅ FIX: disk storage use karo (VERY IMPORTANT)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 👉 folder must exist
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Route
productRoutes.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

productRoutes.get("/list", listProduct);
productRoutes.delete("/remove/:id", adminAuth, removeProduct);

export default productRoutes;
