import React from "react";
import background from "../assets/CTA-Bg.jpg";
import { useBlog } from "../context/Blog-Context";

const CallToActionSection = () => {
  const { navigate } = useBlog();

  return (
    <div
      className="relative overflow-hidden 
      h-[250px] sm:h-[340px] md:h-80 
      sm:rounded-[25px] mt-16 
      flex w-[100%] sm:w-full max-w-5xl mx-auto 
      shadow-[1px_1px_4px_rgba(0,0,0,0.2)]"
    >
      {/* Background */}
      <div className="relative w-full h-full">
        <img src={background} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 md:from-white via-black/30 md:via-white/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center 
        px-4 sm:px-8 md:left-10 md:px-0 text-center md:text-left"
      >
        {/* Logo */}
        <h1
          className="logo font-extrabold text-white md:text-black 
          text-2xl sm:text-3xl md:text-[40px] tracking-widest mb-2 sm:mb-4"
        >
          WanderInk
        </h1>

        {/* Title */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white md:text-black">
          Share Your Travel Story
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm md:text-[17px] tracking-wide sm:tracking-[2px] text-white md:text-black">
          Join our community and inspire others with your adventures
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/signup")}
          className="mt-6 sm:mt-8 w-fit mx-auto md:mx-0 
          bg-transparent px-5 sm:px-6 py-2 rounded-full 
          border-2 font-semibold hover:text-black hover:bg-white md:hover:bg-black md:hover:text-white transition text-white md:text-black"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CallToActionSection;
