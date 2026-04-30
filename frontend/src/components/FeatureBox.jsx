import React from "react";
import { RiEarthFill } from "react-icons/ri";
import { PiMapPinAreaFill } from "react-icons/pi";
import moment from "moment";
import { Link } from "react-router-dom";

const FeatureBox = ({ story }) => {
  return (
    <div
      className="relative mx-auto shadow-[1px_2px_2px_rgba(0,0,0,0.2)]
      h-[380px] sm:h-[450px] md:h-[500px] overflow-hidden"
    >
      <Link to={`/stories/${story._id}`}>
        {/* Cover Image */}
        <div className="relative h-full w-full">
          <img
            src={`http://localhost:5000/images/${story.mainImage}`}
            className="w-full h-full object-cover object-top"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
        </div>

        {/* Content */}
        <div className="absolute w-full pb-4 sm:pb-5 z-20 px-3 bottom-0 left-0">
          {/* Top Info */}
          <div className="mb-3 sm:mb-5">
            {/* Country */}
            <div className="flex items-center gap-1 mb-1 text-white">
              <RiEarthFill className="text-sm sm:text-base" />
              <p className="font-semibold text-sm sm:text-[15px] md:text-[16px]">
                {story?.country}
              </p>
            </div>

            {/* Title */}
            <p className="text-lg sm:text-xl md:text-[22px] font-bold text-white leading-tight">
              {story?.title}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-200 my-2 sm:my-3 w-[95%] line-clamp-3">
              {story?.thingsToDo?.split(".").slice(0, 3).join(".") + "."}
            </p>

            {/* Category + Date */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2 sm:mt-4">
              <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
                <span>
                  <span className="font-semibold">In</span> {story?.category}
                </span>
                <PiMapPinAreaFill />
              </div>

              <p className="text-white text-[11px] sm:text-[13px] tracking-wide font-light">
                {moment(story.visitedDate).format("MMMM D, YYYY")}
              </p>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <img
              src={`http://localhost:5000/images/${story?.userId?.profilePic}`}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 border-2 border-white object-cover rounded-full"
              alt=""
            />

            <div>
              <p className="text-white font-bold text-xs sm:text-sm tracking-wide">
                {story?.userId?.firstName} {story?.userId?.lastName}
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-[180px]">
                {story?.userId?.email}
              </p>
            </div>
          </div>

          {/* Time */}
          <p className="font-semibold absolute right-3 bottom-2 text-[10px] sm:text-[12px] text-white">
            {moment(story.createdAt).fromNow()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FeatureBox;
