import React, { useRef } from "react";
import { useBlog } from "../context/Blog-Context";
import FeatureBox from "./FeatureBox";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Features = () => {
  const { allStories } = useBlog();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen w-full">
      <h1 className="section-heading text-center text-[60px] py-6 font-semibold">
        Meet Best Travelers
      </h1>

      <div className="relative w-[90%] mx-auto">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="absolute right-20 top-15 -translate-y-1/2 z-20
          h-12 w-12 rounded-full flex items-center justify-center
          bg-white shadow-md text-black hover:scale-105 transition"
        >
          <MdKeyboardArrowLeft size={30} />
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide p-5 px-10"
        >
          {allStories?.slice(0, 8).map((story) => (
            <div
              key={story._id}
              className="min-w-[300px] flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <FeatureBox story={story} />
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-5 top-15 -translate-y-1/2 z-20
          h-12 w-12 rounded-full flex items-center justify-center
          bg-white shadow-md text-black hover:scale-105 transition"
        >
          <MdKeyboardArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Features;
