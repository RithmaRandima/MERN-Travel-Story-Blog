import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { RiEarthFill } from "react-icons/ri";
import { PiMapPinAreaFill } from "react-icons/pi";

const StoryCard = ({ story }) => {
  // safety check
  if (!story) return null;

  const imageUrl = story?.mainImage
    ? `http://localhost:5000/images/${story.mainImage}`
    : "/fallback.jpg";

  const profileUrl = story?.userId?.profilePic
    ? `http://localhost:5000/images/${story.userId.profilePic}`
    : "/avatar.png";

  return (
    <div className="relative w-full mx-auto rounded-[14px] overflow-hidden shadow-md h-[520px] group">
      <Link to={`/stories/${story?._id}`}>
        {/* ================= IMAGE ================= */}
        <div className="relative w-full h-full bg-gray-200">
          <img
            src={imageUrl}
            alt={story?.title || "story image"}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
            loading="lazy"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="absolute bottom-0 left-0 w-full z-20 p-4 text-white">
          {/* TOP INFO */}
          <div className="mb-4">
            {/* COUNTRY */}
            <div className="flex items-center gap-1 text-sm mb-1">
              <RiEarthFill />
              <span className="font-medium">{story?.country || "Unknown"}</span>
            </div>

            {/* TITLE */}
            <h2 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2">
              {story?.title || "Untitled Story"}
            </h2>

            {/* DATE */}
            <p className="text-xs mt-1 opacity-80">
              {story?.visitedDate
                ? moment(story.visitedDate).format("MMMM D, YYYY")
                : ""}
            </p>

            {/* CATEGORY */}
            <div className="flex items-center gap-2 text-xs mt-2 opacity-90">
              <span>
                <span className="font-semibold">In</span>{" "}
                {story?.category || "General"}
              </span>
              <PiMapPinAreaFill />
            </div>
          </div>

          {/* ================= AUTHOR ================= */}
          <div className="flex items-center gap-3">
            <img
              src={profileUrl}
              alt="author"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold leading-none">
                {story?.userId?.firstName || "User"}{" "}
                {story?.userId?.lastName || ""}
              </p>
              <p className="text-xs opacity-80">{story?.userId?.email || ""}</p>
            </div>
          </div>

          {/* ================= TIME AGO ================= */}
          <p className="absolute right-4 bottom-3 text-[11px] opacity-80">
            {story?.createdAt ? moment(story.createdAt).fromNow() : ""}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default StoryCard;
