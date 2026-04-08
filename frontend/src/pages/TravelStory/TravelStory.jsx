import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/parallax";
import Navbar from "../../components/Navbar";
import { GiWorld } from "react-icons/gi";
import moment from "moment";
import { PiMapPinAreaFill } from "react-icons/pi";
import {
  FaFacebook,
  FaLinkedinIn,
  FaStar,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { GiHiking } from "react-icons/gi";
import { BsFillStopwatchFill } from "react-icons/bs";
import { GiJumpAcross } from "react-icons/gi";
import { Navigation } from "swiper/modules"; // add Navigation module
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

  console.log(story);

  const coverImages = [
    story?.mainImage,
    ...(story?.galleryImages?.[0] ? [story.galleryImages[0]] : []),
    ...(story?.galleryImages?.[1] ? [story.galleryImages[1]] : []),
    ...(story?.galleryImages?.[2] ? [story.galleryImages[2]] : []),
    ...(story?.galleryImages?.[3] ? [story.galleryImages[3]] : []),
  ];

  return (
    <div className="h-fit relative">
      <Navbar />

      {/* Fixed Swiper Section */}
      <div className="fixed top-0 left-0 w-full h-[90vh] z-10 overflow-hidden">
        <Swiper
          modules={[Autoplay, Parallax]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          speed={3000}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          parallax
        >
          {coverImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full relative overflow-hidden"
                data-swiper-parallax="-23%"
              >
                <img
                  src={`http://localhost:5000/images/${image}`}
                  alt={image}
                  className="h-[90vh] w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient overlay */}
        <div className="absolute z-20 inset-0 bg-gradient-to-t from-white via-white/1 to-transparent"></div>
      </div>

      {/* Content below the fixed Swiper */}
      <div className="mt-[90vh] h-[400vh] text-center z-10 bg-white relative">
        {/* overlay */}
        <div className="absolute -top-50 h-50 inset-0 bg-gradient-to-t from-white via-white/70 to-transparent">
          <div className="pt-10">
            <div className="flex justify-center gap-1 items-center">
              <GiWorld className="text-[25px] " />
              <p className="font-extrabold text-[20px] "> {story.country}</p>
            </div>
            <h1 className="text-[45px] font-bold w-[60%] mx-auto">
              {story.title}
            </h1>
          </div>
          <div className="flex items-center justify-center text-[18px] mt-3">
            {/* rating */}
            <div className="flex items-center text-amber-400 ">
              <FaStar className="text-[14px] mr-1" />
              <p>
                <span className="font-bold">4.8</span>/5
              </p>
            </div>

            <div className="w-1 h-1 bg-black mx-4 rounded-full"></div>

            {/* category */}
            <div className="flex items-center gap-2 text-slate-500">
              <PiMapPinAreaFill className="text-[19px]" />
              <p>
                <span className="font-semibold">In</span> {story?.category}
              </p>
            </div>

            <div className="w-1 h-1 bg-black mx-4 rounded-full"></div>

            {/* date */}
            <p className=" font-extralight text-slate-700">
              {moment(story.visitedDate).format("MMMM D, YYYY")}
            </p>
            <div className="w-1 h-1 bg-black mx-4 rounded-full"></div>

            {/* upload time */}
            <p className="font-extralight text-slate-700">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
          {/* tips section */}
          <div className="mt-15 w-[70%] text-left mx-auto">
            <h1 className="text-[27px]  font-semibold mb-5">
              Tips For Visiting
            </h1>
            <p className="text-[17px]">
              {story.tips}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              sapiente. Odio, id iste accusamus est ipsa consectetur, modi
              tempore eaque aspernatur voluptas laudantium dLorem ipsum dolor
              sit amet consectetur adipisicing elit. Debitis, sapiente. Odio, id
              iste accusamus est ipsa consectetur, modi tempore eaque aspernatur
              voluptas laudantium dolores sapiente mollitia harum error facere
              perspiciatis.
            </p>

            <div className="w-[100%] h-50 mt-15 ">
              {/* top */}
              <div className="flex items-center gap-10">
                <TipBox
                  value={`${story.distance}km return`}
                  logo={<GiPathDistance className="text-[50px]" />}
                  topic="DISTANCE"
                />
                <TipBox
                  value={`${story.elevationGain}m`}
                  logo={<GiHiking className="text-[50px]" />}
                  topic="ELEVATION GAIN"
                />
              </div>

              {/* bottom */}
              <div className="flex items-center gap-10 mt-8">
                <TipBox
                  value={`${story.estimatedTime}`}
                  logo={<BsFillStopwatchFill className="text-[40px] mr-2" />}
                  topic="ESTIMATED TIME"
                />
                <TipBox
                  value={`${story.difficultyStatus}`}
                  logo={<GiJumpAcross className="text-[50px]" />}
                  topic="DIFFICULTY"
                />
              </div>
            </div>
          </div>
          {/* story section */}
          <div
            className="mt-15 w-[70%] text-left mx-auto"
            dangerouslySetInnerHTML={{ __html: story.story }}
          ></div>
          {/* Gallery section */}
          <div className="w-full py-10 mt-15">
            <Swiper
              modules={[Autoplay, Parallax, Navigation]}
              loop
              speed={3000}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation
              centeredSlides={true} // Center the active slide
              slidesPerView={1.3} // Show more slides around the center
              spaceBetween={40} // Increase space between slides
              className="w-full mx-auto h-[80vh]" // Reduced height
            >
              {coverImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full w-full relative flex justify-center items-center">
                    <img
                      src={`http://localhost:5000/images/${image}`}
                      alt={image}
                      className="h-[80vh] w-full object-cover rounded-4xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* things to do section */}
          <div className="mt-15 w-[70%] text-left mx-auto">
            <h1 className="text-[27px]  font-semibold mb-5">Things to Do</h1>
            <p className="text-[17px]">
              {story.tips}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              sapiente. Odio, id iste accusamus est ipsa consectetur, modi
              tempore eaque aspernatur voluptas laudantium dLorem ipsum dolor
              sit amet consectetur adipisicing elit. Debitis, sapiente. Odio, id
              iste accusamus est ipsa consectetur, modi tempore eaque aspernatur
              voluptas laudantium dolores sapiente mollitia harum error facere
              perspiciatis.
            </p>
          </div>

          {/* author section */}
          <div className="bg-white py-3 mt-20 rounded-[7px] p-5 flex items-center shadow-[1px_1px_3px_rgba(0,0,0,0.2)] w-[550px] mx-auto">
            <img
              className="w-20 h-20 object-cover rounded-full "
              src={`http://localhost:5000/images/${story?.userId?.profilePic}`}
              alt=""
            />
            <div className="w-[calc(550px-100px)] text-left ml-5">
              {/* name */}
              <p className="font-bold tracking-[1px]">
                {story?.userId?.firstName} {story?.userId?.lastName}
              </p>
              {/* email */}
              <p className="text-[12px] text-slate-600">
                {story?.userId?.email} {story?.userId?.lastName}
              </p>
              {/* bio data */}
              <p className="mt-2 text-[15px]">
                {story?.userId?.bio} {story?.userId?.lastName}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                suscipit magni vitae veniam ex.
              </p>
              <div className="w-full flex items-center justify-start gap-4.5 mt-4">
                <FaLinkedinIn className="hover:scale-110 hover:text-blue-600 transition" />
                <FaX className="hover:scale-110 hover:text-slate-500 transition" />
                <FaYoutube className="hover:scale-110 hover:text-red-600 transition" />
                <FaTiktok className="hover:scale-110 hover:text-orange-500 transition" />
                <FaFacebook className="hover:scale-110 hover:text-blue-600 transition" />
              </div>
            </div>
          </div>

          {/* comments */}

          <div className="bg-black w-[70%] mx-auto p-3 rounded-full pl-10 text-white mt-20">
            <p className="text-white text-left font-semibold">Comments (3)</p>
          </div>

          {/* default comment status */}
          <div className="bg-white py-6 text-left w-[70%] mx-auto p-3 pl-10 mt-10 shadow-[1px_1px_7px_rgba(0,0,0,0.1)] rounded-[10px]">
            <p className="text-[22px] font-semibold mb-3">Leave a Comment</p>
            <p className="">
              You must be{" "}
              <Link to="/login" className="text-sky-400">
                logged
              </Link>{" "}
              in to post a comment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelStory;

// tip box
const TipBox = ({ topic, value, logo }) => {
  return (
    <div className=" w-80 p-2.5 flex items-center gap-5">
      {logo}
      <div className="ml-4">
        <h1 className="text-[13px] tracking-[1px] text-slate-600 mb-2">
          {topic}
        </h1>
        <p className="font-semibold text-[25px]">{value}</p>
      </div>
    </div>
  );
};
