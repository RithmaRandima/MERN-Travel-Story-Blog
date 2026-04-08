import React from "react";
import bg from "../assets/p.png";
const StatsSection = () => {
  return (
    <div
      className="w-full mt-30 mb-10 h-[70vh] overflow-hidden relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/10 to-transparent"></div>

      <h1 className="absolute top-5 w-full text-center text-[60px] font-semibold">
        Results In Number
      </h1>

      <div className="absolute right-10 bottom-20 w-[700px] rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-white/40 py-8">
        <div className="grid grid-cols-3 text-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-bold text-sky-600">120+</h3>
            <p className="text-sm text-gray-600 tracking-wide">Destinations</p>
          </div>
          <div className="flex flex-col gap-1 border-x border-white/40">
            <h3 className="text-3xl font-bold text-sky-600">500+</h3>
            <p className="text-sm text-gray-600 tracking-wide">Stories</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-bold text-sky-600">1K+</h3>
            <p className="text-sm text-gray-600 tracking-wide">Travelers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
