import User from "../model/userModel.js";
import adminAuth from "../middleware/adminAuth.js";

export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    let adminEmail = req.adminEmail;
    if (!adminEmail) {
      return res.status(404).json({ message: "Admin email not found" });
    }
    return res.status(200).json({
      email: adminEmail,
      role: "admin",
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
