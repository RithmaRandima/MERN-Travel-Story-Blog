import React, { useRef } from "react";
import { useBlog } from "../context/Blog-Context";
import StoryCard from "./StoryCard";
import FeatureBox from "./FeatureBox";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Features = () => {
  const { allStories } = useBlog();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = container.offsetWidth;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full">
      <h1 className="section-heading text-center text-[60px] py-6 font-semibold">
        Meet Best Travelers
      </h1>

      <div className="relative w-[90%] mx-auto">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-7 top-1/2 text-[50px] h-13 w-13 rounded-full flex justify-center items-center  -translate-y-1/2 z-10 bg-white text-black hover:scale-105 transition"
        >
          <MdKeyboardArrowLeft />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide p-5 px-7"
        >
          {allStories.slice(0, 8).map((story, i) => (
            <div
              key={i}
              className="min-w-[300px] flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <FeatureBox story={story} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-3 top-1/2 text-[50px] h-13 w-13 rounded-full flex justify-center items-center  -translate-y-1/2 z-10 bg-white text-black hover:scale-105 transition"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Features;
