import React from "react";
import bg from "../assets/p.png";
const StatsSection = () => {
  return (
    <div
      className="w-full mt-30 mb-10 min-h-[50vh] md:min-h-[70vh] overflow-hidden relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
      <div className="absolute  inset-0 bg-gradient-to-b from-white via-white/10 to-transparent"></div>

      <h1 className="section-heading absolute top-5 w-full text-center text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 sm:mb-10">
        Results In Number
      </h1>

      {/* Stats Card */}
      <div className="absolute right-[50%] translate-x-[50%] md:right-10 md:translate-x-0 bottom-5 md:bottom-20 z-10 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-white/40 py-6 sm:py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-4 sm:gap-0">
          {/* Item 1 */}
          <div className="flex flex-col gap-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-600">
              120+
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 tracking-wide">
              Destinations
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col gap-1 sm:border-x border-white/40">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-600">
              500+
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 tracking-wide">
              Stories
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col gap-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-600">
              1K+
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 tracking-wide">
              Travelers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
