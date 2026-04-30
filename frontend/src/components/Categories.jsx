import React, { useState, useEffect } from "react";
import beach from "../assets/beach-bg.jpg";
import city from "../assets/cities-bg.jpg";
import forest from "../assets/forest-bg.jpg";
import desert from "../assets/desert-bg.jpg";
import lake from "../assets/lake-bg.jpg";
import land from "../assets/landmark-bg.jpg";
import mountain from "../assets/mountain-bg.jpg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const categoryData = [
  { name: "Beach", image: beach },
  { name: "City", image: city },
  { name: "Forest", image: forest },
  { name: "Desert", image: desert },
  { name: "Lake", image: lake },
  { name: "Landmark", image: land },
  { name: "Mountain", image: mountain },
];

const Categories = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // 👇 Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2); // mobile
      } else {
        setItemsPerPage(4); // desktop
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setScrollIndex((prev) =>
      prev + itemsPerPage >= categoryData.length ? 0 : prev + itemsPerPage,
    );
  };

  const prev = () => {
    setScrollIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(categoryData.length - itemsPerPage, 0)
        : prev - itemsPerPage,
    );
  };

  const visibleItems = categoryData.slice(
    scrollIndex,
    scrollIndex + itemsPerPage,
  );

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 relative">
      <div className="flex items-center gap-2">
        {/* Left Button */}
        <button
          onClick={prev}
          className="text-black p-1 rounded-full hover:bg-sky-400/20 text-2xl sm:text-3xl"
        >
          <MdKeyboardArrowLeft />
        </button>

        {/* Cards */}
        <div className="flex overflow-hidden w-full gap-3 sm:gap-4">
          {visibleItems.map((item, i) => (
            <div
              key={i}
              className="relative flex-1 h-35 sm:h-52 md:h-60 overflow-hidden shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              <h1 className="flex items-end justify-center pb-2 sm:pb-4 font-bold tracking-widest text-xs sm:text-sm md:text-lg absolute bottom-0 w-full h-full bg-gradient-to-t from-black/90 via-black/10 to-transparent text-white text-center">
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={next}
          className="text-black p-1 rounded-full hover:bg-sky-400/20 text-2xl sm:text-3xl"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Categories;
