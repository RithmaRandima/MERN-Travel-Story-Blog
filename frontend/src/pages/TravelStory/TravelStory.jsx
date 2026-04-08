import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/navigation";
import Navbar from "../../components/Navbar";
import {
  GiWorld,
  GiPathDistance,
  GiHiking,
  GiJumpAcross,
} from "react-icons/gi";
import moment from "moment";
import { PiMapPinAreaFill } from "react-icons/pi";
import {
  FaFacebook,
  FaLinkedinIn,
  FaStar,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaX } from "react-icons/fa6";

const TravelStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState({});

  useEffect(() => {
    const fetchStoryByID = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/story/get-story/${id}`);
        if (data?.success) setStory(data.story);
      } catch (error) {
        console.log("Error fetching Story", error);
      }
    };
    fetchStoryByID();
    // window.scrollTo(0, 0);
  }, [id]);

  const coverImages = [
    story?.mainImage,
    ...(story?.galleryImages?.slice(0, 4) || []),
  ].filter(Boolean);

  return (
    <div className="relative">
      <Navbar />

      {/* 🔥 FIXED HERO SWIPER */}
      <div className="fixed top-0 left-0 w-full h-[90vh] z-0 overflow-hidden">
        <Swiper
          modules={[Autoplay, Parallax]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          speed={2000}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          parallax
          className="h-full"
        >
          {coverImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full" data-swiper-parallax="-20%">
                <img
                  src={`http://localhost:5000/images/${image}`}
                  alt={image}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
      </div>

      {/* ✅ SPACER (VERY IMPORTANT) */}
      <div className="h-[90vh]"></div>

      {/* ✅ MAIN CONTENT */}
      <div className="bg-white relative z-10 pt-10 shadow-lg">
        {/* Gradient overlay */}
        <div className="absolute z-20 inset-0 bg-gradient-to-t from-white via-white/50 to-transparent h-[43vh] z-50 -top-68">
          {/* TITLE */}
          <div className="text-center absolute left-[50%] w-[100%] top-40 -translate-x-[50%]">
            <div className="flex justify-center items-center gap-2">
              <GiWorld className="text-[25px]" />
              <p className="font-bold text-[20px]">{story.country}</p>
            </div>

            <h1 className="text-[40px] font-bold w-[60%] mx-auto">
              {story.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap justify-center items-center text-[16px] mt-3 gap-4">
              <div className="flex items-center text-amber-400">
                <FaStar className="mr-1" />
                <p>
                  <span className="font-bold">4.8</span>/5
                </p>
              </div>

              <div className="flex items-center gap-1 text-slate-500">
                <PiMapPinAreaFill />
                <p>{story?.category}</p>
              </div>

              <p>{moment(story.visitedDate).format("MMMM D, YYYY")}</p>
              <p>{moment(story.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="mt-25 w-[70%] mx-auto">
          <h1 className="text-[26px] font-semibold mb-4">Tips For Visiting</h1>
          <p className="text-[16px]">{story.tips}</p>

          <div className="mt-10 grid grid-cols-2 gap-10">
            <TipBox
              value={`${story.distance} km`}
              logo={<GiPathDistance className="text-[40px]" />}
              topic="DISTANCE"
            />
            <TipBox
              value={`${story.elevationGain} m`}
              logo={<GiHiking className="text-[40px]" />}
              topic="ELEVATION"
            />
            <TipBox
              value={story.estimatedTime}
              logo={<BsFillStopwatchFill className="text-[30px]" />}
              topic="TIME"
            />
            <TipBox
              value={story.difficultyStatus}
              logo={<GiJumpAcross className="text-[40px]" />}
              topic="DIFFICULTY"
            />
          </div>
        </div>

        {/* STORY */}
        <div
          className="mt-12 w-[70%] mx-auto"
          dangerouslySetInnerHTML={{ __html: story.story }}
        ></div>

        {/* GALLERY */}
        <div className="w-full py-12 mt-10">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            autoplay={{ delay: 4000 }}
            navigation
            centeredSlides
            slidesPerView={1.2}
            spaceBetween={30}
          >
            {coverImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <img
                    src={`http://localhost:5000/images/${image}`}
                    alt={image}
                    className="w-full max-h-[80vh] object-cover rounded-3xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* AUTHOR */}
        <div className="bg-white py-6 mt-16 shadow-md w-[550px] mx-auto rounded-lg flex">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={`http://localhost:5000/images/${story?.userId?.profilePic}`}
            alt=""
          />

          <div className="ml-5">
            <p className="font-bold">
              {story?.userId?.firstName} {story?.userId?.lastName}
            </p>
            <p className="text-sm text-gray-500">{story?.userId?.email}</p>

            <p className="mt-2 text-sm">{story?.userId?.bio}</p>

            <div className="flex gap-4 mt-3">
              <FaLinkedinIn />
              <FaX />
              <FaYoutube />
              <FaTiktok />
              <FaFacebook />
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="w-[70%] mx-auto mt-16 pb-20">
          <div className="bg-black text-white p-3 rounded-full pl-6">
            Comments (3)
          </div>

          <div className="bg-white p-6 mt-6 shadow rounded-lg">
            <p className="text-lg font-semibold mb-2">Leave a Comment</p>
            <p>
              You must be{" "}
              <Link to="/login" className="text-blue-500">
                logged in
              </Link>{" "}
              to comment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelStory;

// TIP BOX
const TipBox = ({ topic, value, logo }) => {
  return (
    <div className="flex items-center gap-4">
      {logo}
      <div>
        <p className="text-xs text-gray-500">{topic}</p>
        <p className="font-semibold text-lg">{value}</p>
      </div>
    </div>
  );
};
