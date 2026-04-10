import React from "react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { RiEarthFill } from "react-icons/ri";
import { PiMapPinAreaFill } from "react-icons/pi";
import moment from "moment";
import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {
  console.log(story);
  return (
    <div className="relative w-full mx-auto shadow-[1px_2px_2px_rgba(0,0,0,0.2)] h-[530px] overflow-hidden rounded-[14px]">
      <Link to={`/stories/${story?._id}`}>
        {/* cover image */}
        <div className="relative h-[100%] w-full">
          <img
            src={`http://localhost:5000/images/${story?.mainImage}`}
            className="w-full h-full object-cover object-top"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t bottom-0 top-70 from-white via-white/10 backdrop-blur-[1px] to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-white/5 to-transparent z-10"></div>
        </div>
        {/* profile details section */}
        <div className="absolute w-full h-fit pb-5 z-20  pl-3  bottom-0 left-0 ">
          <div className="mb-5">
            {/* country */}
            <div className="flex items-center gap-1 mb-1 text-white">
              <RiEarthFill className="text-[18px]" />
              <p className="font-semibold text-[16px]">{story?.country}</p>
            </div>

            {/* title */}
            <p className="text-[22px] font-bold text-white">{story?.title}</p>

            {/* date */}
            <p className="mt-1 mb-2 text-[12px] font-bold">
              {moment(story?.visitedDate).format("MMMM D, YYYY")}
            </p>

            {/* category */}
            <div className="flex items-center gap-3 text-slate-300">
              <p className="">
                <span className="font-semibold">In</span> {story?.category}
              </p>
              <PiMapPinAreaFill />
            </div>
          </div>

          {/* profile details */}
          <div className="flex items-center gap-2">
            <img
              src={`http://localhost:5000/images/${story?.userId?.profilePic}`}
              className="w-11 h-11 border-2 border-white object-cover object-top rounded-full"
              alt=""
            />
            <div>
              <p className="text-black font-bold text-[14px] tracking-[1px]">
                {story?.userId?.firstName} {story?.userId?.lastName}
              </p>
              <p className="text-[11px] text-slate-800">
                {story?.userId?.email}
              </p>
            </div>
          </div>

          <p className="font-semibold absolute right-3 bottom-2 text-[12px]">
            {moment(story.createdAt).fromNow()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default StoryCard;
