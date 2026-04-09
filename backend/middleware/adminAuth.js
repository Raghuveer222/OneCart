import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.adminEmail = process.env.ADMIN_EMAIL; // Admin email ko req object me attach kar diya
    next();
  } catch (error) {
    console.error("Error in admin authentication middleware:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default adminAuth;
