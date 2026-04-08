import React from "react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const AuthorCard = ({ author }) => {
  return (
    <div className="relative bg-white shadow-[1px_1px_2px_rgba(0,0,0,0.2)]  w-full h-[450px] overflow-hidden rounded-[14px]">
      {/* cover image */}
      <div className="relative h-[70%] w-full bg-amber-300">
        <img
          src={`http://localhost:5000/images/${author.coverPic}`}
          className="w-full h-full object-cover object-top"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
      </div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-black/20 to-black"></div> */}
      {/* profile image */}
      <div className="absolute w-32 h-32 border-5 border-white left-[50%] top-[60%] -translate-y-[50%] -translate-x-[50%] rounded-full">
        <img
          src={`http://localhost:5000/images/${author.profilePic}`}
          className="w-full h-full object-cover object-top rounded-full"
          alt=""
        />
      </div>

      {/* profile details */}
      <div className=" w-full text-center pt-7 h-full ">
        <h1 className="font-bold text-[18px] tracking-[1px]">
          {author.firstName} {author.lastName}
        </h1>
        <h1 className="font-extralight text-[15px] tracking-[1px] text-slate-400">
          {author.firstName} {author.lastName}
        </h1>

        <div className="w-full flex items-center justify-center gap-4.5 mt-5">
          <FaLinkedinIn className="hover:scale-110 hover:text-blue-600 transition" />
          <FaX className="hover:scale-110 hover:text-slate-500 transition" />
          <FaYoutube className="hover:scale-110 hover:text-red-600 transition" />
          <FaTiktok className="hover:scale-110 hover:text-orange-500 transition" />
          <FaFacebook className="hover:scale-110 hover:text-blue-600 transition" />
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
