import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null, // Google login ke liye password optional hai
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
