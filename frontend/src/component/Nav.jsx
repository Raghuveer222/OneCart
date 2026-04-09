import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { MdHome, MdOutlineCollections, MdContacts } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import ShopContext from "../context/ShopContext.jsx";
import { shopDataContext } from "../context/ShopContext.jsx";


function Nav() {
  const { getCurrentUser, userData } = useContext(UserDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);

  const handleLogout = async () => {
  try {
    const result = await axios.get(serverUrl + "/api/auth/logout", {
      withCredentials: true,
    });

    console.log(result.data);

    // Remove token (IMPORTANT)
    localStorage.removeItem("token");

    // Remove axios auth header (if used)
    delete axios.defaults.headers.common["Authorization"];

    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      {/* Navbar */}
      <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-20 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
        {/* Logo */}
        <div className="w-[30%] flex items-center gap-[10px]">
          <img src={logo} alt="" className="w-[30px]" />
          <h1 className="text-[25px] text-black font-sans">OneCart</h1>
        </div>

        {/* Menu */}
        <div className="w-[40%] hidden md:flex items-center justify-center">
          <ul className="flex justify-center gap-[19px] text-white">
            {[
              { name: "HOME", path: "/" },
              { name: "COLLECTIONS", path: "/collection" },
              { name: "ABOUT", path: "/about" },
              { name: "CONTACT", path: "/contact" },
            ].map((item) => (
              <li
                key={item.name}
                className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-[30%] flex items-center justify-end gap-[20px]">
          {/* 🔍 Search Toggle */}
          <i
            className={`${showSearch
              ? "fa-solid fa-xmark text-[20px]"
              : "fa-solid fa-magnifying-glass text-[18px]"
              } cursor-pointer`}
            onClick={() => {
              setShowSearch(!showSearch);
              navigate("/collection");
              setShowProfile(false); // close profile
            }}
          ></i>

          {/* 👤 Profile */}
          <div className="relative">
            {!userData && (
              <i
                className="fa-regular fa-circle-user text-[20px] cursor-pointer"
                onClick={() => {
                  setShowProfile((prev) => !prev);
                  // setShowSearch(false); // close search
                }}
              ></i>
            )}

            {userData && (
              <div
                className="w-[30px] h-[30px] bg-black text-white flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => {
                  setShowProfile((prev) => !prev);
                  // setShowSearch(false); // close search
                }}
              >
                {userData?.user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Dropdown */}
            {showProfile && (
              <div className="absolute w-[220px] bg-[#000000d7] top-[120%] right-0 border-[1px] border-[#aaa9a9] rounded-[10px] z-50">
                <ul className="w-full flex flex-col text-[17px] py-[10px] text-white">
                  {!userData && (
                    <li
                      className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                      onClick={() => {
                        navigate("/login");
                        setShowProfile(false);
                      }}
                    >
                      Login
                    </li>
                  )}

                  {userData && (
                    <li
                      className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setShowProfile(false);
                      }}
                    >
                      LogOut
                    </li>
                  )}

                  <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer" onClick={() => { navigate("/order"); setShowProfile(false); }}>
                    Orders
                  </li>

                  <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer" onClick={() => { navigate("/about"); setShowProfile(false); }}>
                    About
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* 🛒 Cart */}
          <div
            className="relative hidden md:block"
            onClick={() => navigate("/cart")}
          >
            <i className="fa-solid fa-cart-arrow-down text-[20px] cursor-pointer"></i>

            <p className="absolute flex items-center justify-center w-[18px] h-[18px] bg-black text-white rounded-full text-[9px] -top-[6px] -right-[10px]">
              {getCartCount()}
            </p>
          </div>
        </div>
      </div>

      {/* 🔎 Search Bar */}
      {showSearch && (
        <div className="w-full fixed top-[70px] left-0 bg-[#cfe3e3] py-[15px] flex justify-center z-10 shadow-md">
          <input
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="w-[60%] h-[40px] px-[20px] rounded-full outline-none bg-[#1f2f2f] text-white placeholder:text-gray-300"
          />
        </div>
      )}

      {/* 📱 Mobile Bottom Navbar */}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden z-50">
        {/* Home */}
        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/")}
        >
          <MdHome className="w-[25px] h-[25px] text-white" />
          Home
        </button>

        {/* Collections */}
        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/collection")}
        >
          <MdOutlineCollections className="w-[30px] h-[30px] text-white" />
          Collections
        </button>

        {/* Contact */}
        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/contact")}
        >
          <MdContacts className="w-[30px] h-[30px] text-white" />
          Contact
        </button>

        {/* Cart */}
        <button
          className="text-white flex items-center justify-center flex-col gap-[2px] relative"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="w-[25px] h-[25px] text-white" />
          {/* Cart Count */}
          <span className="absolute top-0 right-[10px] bg-red-500 text-white text-[10px] w-[16px] h-[16px] flex items-center justify-center rounded-full">
            {getCartCount()}
          </span>
          Cart
        </button>
      </div>
    </>
  );
}

export default Nav;
