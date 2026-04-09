import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
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
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default isAuth;
