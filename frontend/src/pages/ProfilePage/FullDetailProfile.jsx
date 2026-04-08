import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AddBlog from "../AddBlog/AddBlog";
import SubscribeNowSection from "../../components/SubscribeNowSection";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTiktok,
  FaX,
  FaYoutube,
} from "react-icons/fa6";

const FullDetailProfile = () => {
  const { user } = useBlog();
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30 pb-20">
      <Navbar />
      {/* user Profile Details */}
      <div className="w-full relative  px-15 ">
        {/* info title and email */}
        <div className=" text-center pt-35 h-fit">
          <h1 className="font-bold text-[55px] w-[50%] mx-auto leading-[80px]">
            {/* {user.title} */}
            The Joy of Sisterhood on the Road
          </h1>
          <p className="font-setralight text-[30px] text-slate-400">
            {user.email}
          </p>

          {/* image 01 */}
          <div className="w-90 h-90 rounded-full mx-auto mt-10 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user.profilePic}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/* image 02 */}
          <div className="w-150 h-150 rounded-full mx-auto mt-10 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user.profilePic}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/*about text me two */}
          <div className="text-left w-[800px] ml-50">
            <h1></h1>
            <h1 className="font-bold text-[40px] mb-4">
              I'm {/* {user.firstName} <b/>r {user.lastName} */}
              Rithma <br /> Randima
            </h1>
            <p className="text-[17px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              error laboriosam doloremque facilis adipisci! Esse explicabo,
              reiciendis quibusdam quidem accusamus aliquid nisi commodi cumque
              praesentium molestiae pariatur non temporibus? Quos?
            </p>

            <div className="w-full flex items-center justify-start gap-4.5 mt-5">
              <FaLinkedinIn className="hover:scale-110 hover:text-blue-600 transition" />
              <FaX className="hover:scale-110 hover:text-slate-500 transition" />
              <FaYoutube className="hover:scale-110 hover:text-red-600 transition" />
              <FaTiktok className="hover:scale-110 hover:text-orange-500 transition" />
              <FaFacebook className="hover:scale-110 hover:text-blue-600 transition" />
            </div>
          </div>

          {/* image 03 */}
          <div className="w-75 h-75 rounded-full mx-auto float-right -mt-10 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user.profilePic}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/* image 04 */}
          <div className="w-150 h-150 rounded-full mx-auto mt-100 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user.profilePic}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/* side status */}
          <div className="absolute top-100 text-left">
            <div className="mb-5">
              <h1 className="text-[36px] font-bold">120+</h1>
              <p className="text-[17px] text-slate-700">Countries</p>
            </div>
            <div className="mb-5">
              <h1 className="text-[36px] font-bold">900K</h1>
              <p className="text-[17px] text-slate-700">Follower</p>
            </div>
            <div className="mb-5">
              <h1 className="text-[36px] font-bold">100+</h1>
              <p className="text-[17px] text-slate-700">Partner</p>
            </div>
            <div className="mb-5">
              <h1 className="text-[36px] font-bold">12</h1>
              <p className="text-[17px] text-slate-700">Years Travelled</p>
            </div>
          </div>

          {/*about me one */}
          <div className="absolute right-8 top-140 text-left w-[390px]">
            <h1 className="font-bold text-[40px] mb-10">
              I'm {/* {user.firstName} <b/>r {user.lastName} */}
              Rithma <br /> Randima
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              error laboriosam doloremque facilis adipisci! Esse explicabo,
              reiciendis quibusdam quidem accusamus aliquid nisi commodi cumque
              praesentium molestiae pariatur non temporibus? Quos?
            </p>
            <Link
              to={"/Profile"}
              className="flex items-center gap-2 font-bold text-[17px] text-sky-500 ml-7 mt-5 text-"
            >
              Read my stories <FaArrowRight className="mt-1.5" />
            </Link>
          </div>

          {/*about me three */}
          <div className="absolute left-8 top-440 text-left w-[860px]">
            <p className="font-extralight text-[28px] mb-10">
              As we continue to explore the world, we invite you to follow along
              and be part of our adventures. Whether it’s discovering new foods,
              meeting incredible people, or taking on daring adventures, there’s
              always something exciting on the horizon with us!
            </p>
          </div>

          {/*about me four */}
          <div className="absolute right-8 bottom-130 text-center w-[300px]">
            <h1 className="font-bold text-[40px] mb-6 leading-[45px]">
              I'm {/* {user.firstName} <b/>r {user.lastName} */}
              Rithma <br /> Randima
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              error laboriosam doloremque facilis adipisci! Esse explicabo,
              reiciendis quibusdam quidem accusamus aliquid nisi commodi cumque
              praesentium molestiae pariatur non temporibus? Quos?
            </p>
            <div className="w-full flex items-center justify-center gap-4.5 mt-5">
              <FaLinkedinIn className="hover:scale-110 hover:text-blue-600 transition" />
              <FaX className="hover:scale-110 hover:text-slate-500 transition" />
              <FaYoutube className="hover:scale-110 hover:text-red-600 transition" />
              <FaTiktok className="hover:scale-110 hover:text-orange-500 transition" />
              <FaFacebook className="hover:scale-110 hover:text-blue-600 transition" />
            </div>
          </div>
        </div>

        <SubscribeNowSection />
      </div>

      <h1 className=" logo text-center font-extrabold text-black text-[40px] font-exrtralight tracking-[5px] mb-4">
        WanderInk
      </h1>
    </div>
  );
};

export default FullDetailProfile;
