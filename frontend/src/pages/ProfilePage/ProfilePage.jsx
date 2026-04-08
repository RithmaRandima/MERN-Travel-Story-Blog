import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AddBlog from "../AddBlog/AddBlog";

const ProfilePage = () => {
  const { user } = useBlog();
  const [showAddBlog, setShowAddBlog] = useState(false);
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-200 via-slate-300/70 to-sky-200">
      <Navbar />
      {/* user Profile Details */}
      <div className="w-full relative ">
        {/* info name and bio */}
        <div className="bg-green200 pt-40 h-screen">
          <h1 className="font-extrabold text-[90px]">
            {user.firstName} {user.lastName}
          </h1>
          <p className="font-setralight text-[30px] -mt-8 text-slate-300">
            {user.email}
          </p>
          <p className="w-[45%] mt-10 tracking-[2px] capitalize leading-[30px] ml-5">
            {user.bio}
          </p>

          <Link
            to="/aboutAuthor"
            className="flex items-center gap-2 font-bold text-[19px] ml-5 mt-5 text-"
          >
            about more <FaArrowRight className="mt-1.5" />
          </Link>
        </div>

        {/* profile pic */}
        <div className="absolute right-10 top-25 w-75 h-75 rounded-full bg-green-400 shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
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
      <div className="w-[90%] mx-auto h-[100vh] mt-10 pt-10 font-bold bg-white">
        <h1 className="text-center text-[50px]">Blog Posts</h1>
      </div>

      {/* show Add Blog */}
      {showAddBlog && <AddBlog setShowAddBlog={setShowAddBlog} />}
    </div>
  );
};

export default ProfilePage;
