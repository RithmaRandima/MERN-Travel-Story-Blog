import React from "react";
import { useBlog } from "../context/Blog-Context";
import AuthorCard from "./AuthorCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const AuthorsSection = () => {
  const { allAuthors } = useBlog();

  return (
    <div className="h-fit my-20 md:min-h-screen w-full">
      {/* Heading */}
      <h1 className="section-heading  text-center text-4xl md:text-5xl lg:text-6xl font-semibold mb-6  lg:text-[60px] py-6">
        Meet Best Travelers
      </h1>

      {/* Slider Container */}
      <div className="w-[75%] sm:w-[85%] mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 5000 }}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {allAuthors.slice(0, 8).map((author, i) => (
            <SwiperSlide key={i}>
              <AuthorCard author={author} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AuthorsSection;
