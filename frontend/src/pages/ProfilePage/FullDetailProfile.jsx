import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import { Link } from "react-router-dom";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useBlog();
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30">
      <Navbar />
      {/* user Profile Details */}
      <div className="w-full relative  px-15 mb-20 ">
        {/* info title and email */}
        <div className=" text-center pt-35 h-fit mb-20">
          <h1 className="font-bold capitalize text-[40px] w-[70%] mx-auto leading-[70px]">
            {/* {user.title} */}
            {user?.aboutMe.split(",")[2].split(".")[0]}.
          </h1>
          <p className="font-setralight text-[30px] text-slate-400">
            {user?.email}
          </p>

          {/* image 01 */}
          <div className="w-90 h-90 rounded-full mx-auto mt-10 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user?.userImages[0]}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/* image 02 */}
          <div className="w-150 h-150 rounded-full mx-auto mt-10 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user?.profilePic}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/*about text me two */}
          <div className="text-left w-[850px] ml-10">
            <h1 className="font-extrabold text-[50px] mb-4">My Story</h1>
            <p className="text-[28px] font-extralight">{user?.myStory}</p>

            <div className="text-[30px] w-full flex items-center justify-start gap-10 mt-8">
              <FaLinkedinIn className="hover:scale-110 hover:text-blue-600 transition" />
              <FaX className="hover:scale-110 hover:text-slate-500 transition" />
              <FaYoutube className="hover:scale-110 hover:text-red-600 transition" />
              <FaTiktok className="hover:scale-110 hover:text-orange-500 transition" />
              <FaFacebook className="hover:scale-110 hover:text-blue-600 transition" />
            </div>
          </div>

          {/* image 03 */}
          <div className="w-75 h-75 rounded-full mx-auto float-right -mt-35 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user.userImages[1]}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/* image 04 */}
          <div className="w-170 h-170 rounded-full  ml-10 mt-30 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
            <img
              src={`http://localhost:5000/images/${user?.coverPic}`}
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
          <div className="absolute right-4 top-90 text-left w-[390px]">
            <h1 className="font-bold text-[50px] mb-10 leading-[50px]">
              I'm {user.firstName} <br /> {user.lastName}
            </h1>
            <p className="text-[20px]">{user?.aboutMe}</p>
            <Link
              to={"/Profile"}
              className="flex items-center gap-2 font-bold text-[17px] text-sky-500 ml-7 mt-5 text-"
            >
              Read my stories <FaArrowRight className="mt-1.5" />
            </Link>
          </div>

          {/*about me four */}
          <div className="absolute right-8 bottom-80 text-center w-[400px]">
            <h1 className="font-extrabold text-[50px] mb-6 leading-[45px]">
              My Perspective
            </h1>
            <p className="text-[28px] font-extralight">{user.myPerspective}</p>
          </div>
        </div>

        <SubscribeNowSection />
      </div>

      <Footer />
    </div>
  );
};

export default FullDetailProfile;
