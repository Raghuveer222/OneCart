import React from "react";
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-start px-6 md:px-12 bg-[#0c2025]">

      {/* TEXT */}
      <div className="text-[#88d9ee]">
        <p className="text-[22px] sm:text-[28px] md:text-[40px] lg:text-[55px] font-semibold">
          {heroData.text1}
        </p>
        <p className="text-[16px] sm:text-[20px] md:text-[28px] mt-2">
          {heroData.text2}
        </p>
      </div>

      {/* CIRCLES */}
      <div className="flex gap-3 mt-6">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            onClick={() => setHeroCount(i)}
            className={`w-[10px] h-[10px] cursor-pointer transition ${
              heroCount === i ? "text-orange-400 scale-110" : "text-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;