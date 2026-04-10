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

const ProfileStoryCard = ({ story }) => {
  console.log(story);
  return (
    <div className="relative w-full mx-auto shadow-[1px_2px_2px_rgba(0,0,0,0.2)] h-[500px] bg-white overflow-hidden">
      <Link to={`/stories/${story._id}`}>
        {/* cover image */}
        <div className="relative h-[60%] w-full">
          <img
            src={`http://localhost:5000/images/${story.mainImage}`}
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>
        {/* profile details section */}
        <div className="absolute w-full h-fit py-3  z-20  px-3  bottom-0 left-0">
          <div className="mb-5">
            {/* country */}
            <div className="flex items-center gap-1 mb-1 text-black">
              <RiEarthFill className="" />
              <p className="font-semibold text-[14px]">{story?.country}</p>
            </div>

            {/* title */}
            <p className="text-[20px] font-bold pb-2">{story?.title}</p>

            {/* date */}
            <p className="mt-1 mb-2 text-[12px] font-semibold">
              {moment(story.visitedDate).format("MMMM D, YYYY")}
            </p>

            {/* category */}
            <div className="flex items-center gap-3 text-slate-400">
              <p className="">
                <span className="font-semibold">In</span> {story?.category}
              </p>
              <PiMapPinAreaFill />
            </div>
          </div>

          <p className="absolute text-slate-400 right-3 bottom-2 text-[12px]">
            {moment(story.createdAt).fromNow()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProfileStoryCard;
