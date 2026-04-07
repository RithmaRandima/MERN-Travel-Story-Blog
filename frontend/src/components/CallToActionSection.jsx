import React from "react";
import background from "../assets/CTA-Bg.jpg";
import { useBlog } from "../context/Blog-Context";
const CallToActionSection = () => {
  const { navigate } = useBlog();
  return (
    <div className="relative overflow-hidden h-80 rounded-[25px] mt-16 flex w-full max-w-260 mx-auto shadow-[1px_1px_4px_rgba(0,0,0,0.2)]">
      <div className="relative w-full h-full">
        <img src={background} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
      </div>

      {/* info section */}
      <div className="absolute top-[50%] left-10 -translate-y-[50%]">
        <h1 className=" logo text-left font-extrabold text-black text-[40px] font-exrtralight tracking-[5px] mb-4">
          WanderInk
        </h1>
        <h2 className=" text-3xl font-extrabold">Share Your Travel Story</h2>
        <p className="mt-1 text-[17px] tracking-[2px]">
          Join our community and inspire others with your adventures
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-8 bg-transparent  px-6 py-2 rounded-full border-2 font-semibold hover:bg-black hover:text-white cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CallToActionSection;
