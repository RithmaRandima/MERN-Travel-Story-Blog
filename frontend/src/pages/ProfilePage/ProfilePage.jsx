import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AddBlog from "../AddBlog/AddBlog";
import StoryCard from "../../components/StoryCard";

const ProfilePage = () => {
  const { user, allStories } = useBlog();

  const [showAddBlog, setShowAddBlog] = useState(false);
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30">
      <Navbar />
      {/* user Profile Details */}
      <div className="w-full relative ">
        {/* info name and bio */}
        <div className="bg-green200 pt-40 h-screen">
          <h1 className="font-extrabold text-[90px]">
            {user.firstName} {user.lastName}
          </h1>
          <p className="font-setralight text-[30px] -mt-8 text-slate-400">
            {user.email}
          </p>
          <p className="w-[45%] mt-10 tracking-[1px] capitalize leading-[30px] ml-5">
            {user.bio}
          </p>

          <Link
            to="/fullProfile"
            className="flex items-center gap-2 font-bold text-[17px] text-sky-500 ml-5 mt-5 text-"
          >
            More about me <FaArrowRight className="mt-1.5" />
          </Link>
        </div>

        {/* profile pic */}
        <div className="absolute right-10 top-25 w-75 h-75 rounded-full shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
          <img
            src={`http://localhost:5000/images/${user.profilePic}`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover object-top"
          />
        </div>

        {/* cover pic */}
        <div className="absolute right-70 top-90  w-60 h-60 rounded-full shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
          <img
            src={`http://localhost:5000/images/${user.coverPic}`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover object-top "
          />
        </div>

        {/* Upload New Post Button */}
        <Link
          onClick={() => setShowAddBlog(true)}
          className="absolute bg-black text-white p-2 px-6 rounded-full right-10 -bottom-3 flex items-center gap-2 font-bold text-[19px] ml-5 mt-5 text-"
        >
          Add New Blog
        </Link>
      </div>

      {/* User Posts Details */}
      <div className="w-full min-h-screen">
        {/* Heading */}
        <div className="text-center py-16">
          <h1 className="text-5xl font-extrabold mb-4">Explore Our Blogs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover stories, insights, and inspiration from our community.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="flex w-[90%] mx-auto gap-8">
          {/* LEFT - Scrollable Content (2/3) */}
          <div className="w-2/3 h-[75vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>

          {/* RIGHT - Fixed Sidebar (1/3) */}
          <div className="w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Example Card */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="font-semibold text-lg mb-3">Categories</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>Design</li>
                  <li>Urbanism</li>
                  <li>Sustainability</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="font-semibold text-lg mb-3">About</h2>
                <p className="text-gray-600 text-sm">
                  Explore curated articles from top creators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* show Add Blog */}
      {showAddBlog && <AddBlog setShowAddBlog={setShowAddBlog} />}
    </div>
  );
};

export default ProfilePage;
