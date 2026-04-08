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
    <div className="min-h-screen w-full bg-red300">
      <h1 className="section-heading text-center text-[60px] py-5 font-semibold">
        Latest Stories
      </h1>

      <div className="relative w-[85%] mx-auto py-5">
        {/* Custom Buttons */}
        <div className="swiper-button-prev bg-red-400 !text-white !left-[-50px]" />
        <div className="swiper-button-next bg-red-400 !text-white !right-[-50px]" />

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 6000 }}
          spaceBetween={30}
          slidesPerView={3}
          // breakpoints={{
          //   1024: { slidesPerView: 3 },
          //   768: { slidesPerView: 2 },
          //   480: { slidesPerView: 1 },
          // }}
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
