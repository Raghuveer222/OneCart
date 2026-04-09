import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ FIX
import { AdminContext } from "../context/AdminContext.jsx"; // ✅ FIX
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { serverUrl } = useContext(AuthContext); // ✅ FIX
  let { adminData, getAdmin } = useContext(AdminContext);

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true },
      );

      console.log("Login successful:", result.data);
      toast.success("Admin Login successful!");
      await getAdmin();
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
      toast.error("Admin Login failed!");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      <div
        className="w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="" />
        <h1 className="text-[22px]">VCart</h1>
      </div>

      <div className="text-center mt-5">
        <h1 className="text-[25px] font-semibold">Login Page</h1>
        <p>Welcome to VCart, Apply to Admin Login</p>
      </div>

      <div className="max-w-[600px] w-[90%] h-[450px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center mt-5">
        <form onSubmit={AdminLogin} className="w-[90%] flex flex-col gap-5">
          <input
            type="email"
            className="h-[50px] border border-[#96969635] rounded-lg bg-transparent px-4"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-4"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

          <button className="h-[50px] bg-blue-600 rounded-lg hover:bg-blue-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
