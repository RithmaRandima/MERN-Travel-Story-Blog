import React, { useState } from "react";
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
  const itemsPerPage = 4;

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
    <div className="max-w-6xl mx-auto relative">
      {/* Carousel */}
      <div className="flex items-center gap-2 ">
        <button
          onClick={prev}
          className=" text-black px-1 py-1 rounded-full hover:bg-sky-400/20 text-[30px]"
        >
          <MdKeyboardArrowLeft />
        </button>

        <div className="flex overflow-hidden w-full gap-4">
          {visibleItems.map((item, i) => (
            <div
              key={i}
              className="relative flex-1 min-w-[0] h-60 rounded-[0px] overflow-hidden shadow-[1px_1px_1px_rgba(0,0,0,1)]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <h1 className="flex items-end justify-center pb-4 font-bold tracking-[5px] text-[19px] absolute bottom-0 w-full h-full bg-gradient-to-t from-black/90 via-black/10 to-transparent text-white text-center py-1">
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        <button
          onClick={next}
          className=" text-black px-1 py-1 rounded-full hover:bg-sky-400/20 text-[30px]"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Categories;
