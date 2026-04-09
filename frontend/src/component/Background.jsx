import React from "react";
import back1 from "../assets/back1.png";
import back2 from "../assets/back2.png";
import back3 from "../assets/back3.png";
import back4 from "../assets/back4.png";

function Background({ heroCount }) {
  const images = [back2, back1, back3, back4];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={images[heroCount]}
        alt=""
        className="h-[90%] w-auto object-contain"
      />
    </div>
  );
}

export default Background;
