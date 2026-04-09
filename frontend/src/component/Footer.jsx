import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full bg-[#dbfcfcec] text-[#1e2223] mt-20">
      {/* Main Footer Content */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between gap-10">
        {/* Section 1: Brand & About */}
        <div className="flex flex-col gap-5 md:w-[40%]">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="OneCart Logo"
              className="w-[35px] h-[35px] md:w-[45px] md:h-[45px] object-contain"
            />
            <p className="text-2xl font-bold tracking-tight text-black">
              OneCart
            </p>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 max-w-md">
            OneCart is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery—all backed
            by trusted service designed to make your life easier every day.
          </p>
          {/* Mobile-only tagline */}
          <p className="text-sm font-medium italic md:hidden text-gray-600">
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>

        {/* Section 2: Company Links */}
        <div className="flex flex-col gap-5 md:w-[20%]">
          <p className="text-lg font-semibold tracking-wider">COMPANY</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-700">
            <li className="hover:text-black cursor-pointer transition-colors duration-200">
              Home
            </li>
            <li className="hover:text-black cursor-pointer transition-colors duration-200">
              About us
            </li>
            <li className="hover:text-black cursor-pointer transition-colors duration-200">
              Delivery
            </li>
            <li className="hover:text-black cursor-pointer transition-colors duration-200">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div className="flex flex-col gap-5 md:w-[30%]">
          <p className="text-lg font-semibold tracking-wider">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-700">
            <li className="hover:text-black cursor-pointer transition-colors duration-200 font-medium">
              +91-7878811742
            </li>
            <li className="hover:text-black cursor-pointer transition-colors duration-200">
              contact@onecart.com
            </li>
            <li className="hidden md:block text-gray-500 italic mt-1">
              Admin: admin@onecart.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-300"></div>

      {/* Bottom Copyright */}
      <div className="w-full py-6 flex flex-col items-center justify-center gap-2 text-xs md:text-sm text-gray-600">
        <p>
          Copyright 2025 © <span className="font-semibold">onecart.com</span> -
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
