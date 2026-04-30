import React from "react";
import { useBlog } from "../context/Blog-Context";
import StoryCard from "./StoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const LatestStory = () => {
  const { allStories } = useBlog();

  return (
    <div className="h-fit md:min-h-screen w-full">
      {/* Heading */}
      <h1 className="section-heading text-center text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 ">
        Latest Stories
      </h1>

      <div className="relative w-[85%] md:w-[92%] px-5 mx-auto py-5">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 6000 }}
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
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {allStories.slice(0, 5).map((story, i) => (
            <SwiperSlide key={i} className="py-2">
              <StoryCard story={story} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestStory;
