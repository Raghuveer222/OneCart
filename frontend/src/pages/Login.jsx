import React, { useState, useContext } from "react"; // Combined imports
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx"; // UserContext import for getCurrentUser function

import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  let navigate = useNavigate();

  // FIX: Destructuring use ki hai { serverUrl }
  const { serverUrl } = useContext(AuthDataContext);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let { getCurrentUser } = useContext(UserDataContext); // UserContext se getCurrentUser function nikalne ke liye

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`, // Backend route matching '/login'
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      );
      console.log("Login successful:", result.data);
      await getCurrentUser(); // Login ke baad current user data fetch karne ke liye
      navigate("/"); // Login ke baad home par bhej dega
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
    }
  };
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true },
      );
      await getCurrentUser(); // Google login ke baad current user data fetch karne ke liye
      navigate("/");
      console.log("Google login successful:", result.data);
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="" />
        <h1 className="text-[22px] font-sans ">OneCart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">
          Welcome back! Please enter your details
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[450px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center ">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          <div
            onClick={googleLogin}
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
          >
            <img src={google} alt="" className="w-[20px]" /> Login with Google
          </div>

          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div> OR{" "}
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] flex flex-col items-center justify gap-[15px] ">
            <input
              type="email" // 'text' se badal kar 'email' kiya validation ke liye
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold outline-none"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="w-[100%] relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold outline-none"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#ffffffc7]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </div>
            </div>

            <button
              type="submit" // Submit type zaroori hai
              className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[10px] text-[17px] font-semibold hover:bg-[#4e4ee2] transition-all"
            >
              Login
            </button>

            <p className="flex gap-[10px] mt-[10px]">
              Don't have an account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")} // Path check kar lena (registration ya signup)
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
