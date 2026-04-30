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
    <div className="w-full mt-10 py-6 sm:py-10">
      {/* Heading */}
      <h1 className="text-center section-heading text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
        Meet Best Travelers
      </h1>

      <div className="relative w-[95%] mx-auto">
        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4 sm:px-8 py-4"
        >
          {allStories?.slice(0, 8).map((story) => (
            <div
              key={story._id}
              className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px] flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <FeatureBox story={story} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
