import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SubscribeNowSection from "../../components/SubscribeNowSection";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTiktok,
  FaX,
  FaYoutube,
} from "react-icons/fa6";
import Footer from "../../components/Footer";

const FullDetailProfile = () => {
  const { user, profile } = useBlog();

  const [currentUser, setCurrentUser] = useState(null);
  const id = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      setCurrentUser(profile);
    } else {
      setCurrentUser(user);
    }
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30">
      <Navbar />

      {/* ================= WRAPPER ================= */}
      <div className="w-full px-4 sm:px-8 lg:px-15 mb-20 pt-28 sm:pt-32 lg:pt-3">
        {/* =========================================================
            🖥 DESKTOP DESIGN (UNCHANGED)
            ========================================================= */}
        <div className="hidden lg:block relative">
          {/* YOUR ORIGINAL DESKTOP CODE EXACTLY HERE */}
          {/* 👇 paste your existing block untouched */}
          <div className="text-center pt-35 h-fit mb-20">
            <h1 className="font-bold capitalize text-[40px] w-[70%] mx-auto leading-[70px]">
              {currentUser?.aboutMe?.split(",")[2]?.split(".")[0]}.
            </h1>

            <p className="font-setralight text-[30px] text-slate-400">
              {currentUser?.email}
            </p>

            {/* image 01 */}
            <div className="w-90 h-90 rounded-full mx-auto mt-10 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
              <img
                src={`http://localhost:5000/images/${currentUser?.userImages?.[0]}`}
                className="w-full h-full rounded-full object-cover object-top"
                alt=""
              />
            </div>

            {/* image 02 */}
            <div className="w-150 h-150 rounded-full mx-auto mt-10 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
              <img
                src={`http://localhost:5000/images/${currentUser?.profilePic}`}
                className="w-full h-full rounded-full object-cover object-top"
                alt=""
              />
            </div>

            {/* story */}
            <div className="text-left w-[850px] ml-10">
              <h1 className="font-extrabold text-[50px] mb-4">My Story</h1>
              <p className="text-[28px] font-extralight">
                {currentUser?.myStory}
              </p>

              <div className="text-[30px] flex gap-10 mt-8">
                <FaLinkedinIn />
                <FaX />
                <FaYoutube />
                <FaTiktok />
                <FaFacebook />
              </div>
            </div>

            {/* image 03 */}
            <div className="w-75 h-75 rounded-full mx-auto float-right -mt-35 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
              <img
                src={`http://localhost:5000/images/${currentUser?.userImages?.[1]}`}
                className="w-full h-full rounded-full object-cover object-top"
                alt=""
              />
            </div>

            {/* image 04 */}
            <div className="w-160 h-160 rounded-full ml-10 mt-30 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
              <img
                src={`http://localhost:5000/images/${currentUser?.coverPic}`}
                className="w-full h-full rounded-full object-cover object-top"
                alt=""
              />
            </div>

            {/* side stats */}
            <div className="absolute top-100 text-left">
              <div className="mb-5">
                <h1 className="text-[36px] font-bold">120+</h1>
                <p>Countries</p>
              </div>
              <div className="mb-5">
                <h1 className="text-[36px] font-bold">900K</h1>
                <p>Follower</p>
              </div>
              <div className="mb-5">
                <h1 className="text-[36px] font-bold">100+</h1>
                <p>Partner</p>
              </div>
              <div className="mb-5">
                <h1 className="text-[36px] font-bold">12</h1>
                <p>Years Travelled</p>
              </div>
            </div>

            {/* about right */}
            <div className="absolute right-4 md:-right-5 top-90 md:top-70 w-[390px]">
              <h1 className="font-bold text-[50px] mb-10 leading-[50px]">
                I'm {currentUser?.firstName} <br /> {currentUser?.lastName}
              </h1>

              <p className="text-[20px]">{currentUser?.aboutMe}</p>

              <Link className="flex items-center gap-2 font-bold text-sky-500 mt-5">
                Read my stories <FaArrowRight />
              </Link>
            </div>

            {/* perspective */}
            <div className="absolute right-8 md:-right-5 bottom-20 w-[450px] text-center">
              <h1 className="font-extrabold text-[50px] mb-6">
                My Perspective
              </h1>
              <p className="text-[24px] font-extralight">
                {currentUser?.myPerspective}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            📱 MOBILE DESIGN (NEW CLEAN LAYOUT)
            ========================================================= */}
        <div className="block lg:hidden">
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold">
              {currentUser?.firstName} {currentUser?.lastName}
            </h1>
            <p className="text-slate-500">{currentUser?.email}</p>
          </div>

          {/* MAIN IMAGE */}
          <div className="flex justify-center mb-8">
            <img
              src={`http://localhost:5000/images/${currentUser?.profilePic}`}
              className="w-52 h-52 rounded-full object-cover shadow-md"
              alt=""
            />
          </div>

          {/* ABOUT */}
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold mb-3">About Me</h2>
            <p className="text-sm text-slate-700 leading-6">
              {currentUser?.aboutMe}
            </p>

            <Link className="flex justify-center items-center gap-2 mt-4 text-sky-500 font-bold">
              Read my stories <FaArrowRight />
            </Link>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-3 text-center mb-10">
            <div className="bg-white/60 p-4 rounded-xl">
              <h1 className="font-bold">120+</h1>
              <p className="text-xs">Countries</p>
            </div>
            <div className="bg-white/60 p-4 rounded-xl">
              <h1 className="font-bold">900K</h1>
              <p className="text-xs">Followers</p>
            </div>
            <div className="bg-white/60 p-4 rounded-xl">
              <h1 className="font-bold">100+</h1>
              <p className="text-xs">Partners</p>
            </div>
            <div className="bg-white/60 p-4 rounded-xl">
              <h1 className="font-bold">12</h1>
              <p className="text-xs">Years</p>
            </div>
          </div>

          {/* STORY */}
          <div className="mb-10">
            <h1 className="text-xl font-bold mb-3">My Story</h1>
            <p className="text-sm leading-6">{currentUser?.myStory}</p>
          </div>

          {/* SOCIAL */}
          <div className="flex justify-center gap-6 text-xl mb-10">
            <FaLinkedinIn />
            <FaX />
            <FaYoutube />
            <FaTiktok />
            <FaFacebook />
          </div>

          {/* PERSPECTIVE */}
          <div className="text-center mb-10">
            <h1 className="text-xl font-bold mb-3">My Perspective</h1>
            <p className="text-sm">{currentUser?.myPerspective}</p>
          </div>

          {/* EXTRA IMAGES (mobile simplified) */}
          <div className="flex justify-center gap-4">
            <img
              src={`http://localhost:5000/images/${currentUser?.userImages?.[0]}`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <img
              src={`http://localhost:5000/images/${currentUser?.userImages?.[1]}`}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          {/* COVER */}
          <div className="flex justify-center mt-8">
            <img
              src={`http://localhost:5000/images/${currentUser?.coverPic}`}
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>
        </div>

        <SubscribeNowSection />
      </div>

      <Footer />
    </div>
  );
};

export default FullDetailProfile;
