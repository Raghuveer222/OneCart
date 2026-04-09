import React, { useEffect, useState } from "react";
import Background from "../component/Background";
import Hero from "../component/Hero";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";


function Home() {

  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fasion Fit", text2: "Now on Sale!" },
  ];

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full pt-[70px] pb-[90px] md:pb-0">
      {/* FULL SCREEN SECTION */}
      <div className="w-full h-[calc(100vh-70px)] md:h-[calc(100vh-70px)] flex flex-col md:flex-row">
        {/* LEFT SIDE (TEXT) */}
        <div className="w-full md:w-1/2 h-[40%] md:h-full">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="w-full md:w-1/2 h-[60%] md:h-full bg-[#f5f5f5] flex items-center justify-center">
          <Background heroCount={heroCount} />
        </div>
      </div>
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
