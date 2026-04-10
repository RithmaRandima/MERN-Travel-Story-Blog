import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AddBlog from "../AddBlog/AddBlog";
import ProfileStoryCard from "../../components/ProfileStoryCard";
import Footer from "../../components/Footer";
import moment from "moment";
import axiosInstance from "../../utils/axiosinstance";

const AutherProfile = () => {
  const { id } = useParams();
  const { user, allStoriesByUser } = useBlog();
  const [authorData, setAuthorData] = useState({});

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/user/get-users-by-id/${id}`,
        );
        if (data?.data || data?.success) {
          setAuthorData(data.user);
        }
      } catch (error) {
        console.log("some error on fetchAuthorData function", error);
      }
    };

    fetchAuthorData();
  }, [id]);

  console.log(authorData);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30">
      <Navbar />
      {/* user Profile Details */}
      <div className="w-full relative ">
        {/* info name and aboutMe */}
        <div className="bg-green200 pt-40 h-screen">
          <h1 className="font-extrabold capitalize text-[90px]">
            {authorData?.firstName} {authorData?.lastName}
          </h1>
          <p className="font-setralight text-[30px] ml-1.5 -mt-5 text-slate-400">
            {authorData?.email}
          </p>
          <p className="w-[45%] mt-10 tracking-[1px] capitalize leading-[30px] ml-5">
            {authorData?.aboutMe}
          </p>

          <Link
            to={`/authors/AuthorFullDetailProfile/${authorData._id}`}
            className="flex items-center gap-2 font-bold text-[17px] text-sky-500 ml-5 mt-5 text-"
          >
            More about {authorData?.firstName}{" "}
            <FaArrowRight className="mt-1.5" />
          </Link>
        </div>

        {/* profile pic */}
        <div className="absolute right-10 top-25 w-75 h-75 rounded-full shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
          <img
            src={`http://localhost:5000/images/${authorData?.profilePic}`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover object-top"
          />
        </div>

        {/* cover pic */}
        <div className="absolute right-70 top-90  w-60 h-60 rounded-full shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
          <img
            src={`http://localhost:5000/images/${authorData?.coverPic}`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover object-top "
          />
        </div>
      </div>

      {/* User Posts Details */}
      <div className="w-full min-h-screen pb-20">
        {/* Heading */}
        <div className="text-center pt-6 pb-16">
          <h1 className="text-5xl font-extrabold mb-4">See My Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover stories, insights, and inspiration from our community.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="flex w-[90%] mx-auto gap-8">
          {/* LEFT - Scrollable Content (2/3) */}
          <div className="scrollbar-hide w-2/3 h-[100vh] py-3  overflow-y-auto py-5 px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allStoriesByUser?.map((story) => (
                <ProfileStoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>

          {/* RIGHT - Fixed Sidebar (1/3) */}
          <div className="w-1/3 ">
            <div className="sticky top-24 ">
              {/* Example Card */}
              <div className="bg-white shadowmd p-6">
                <h2 className="font-semibold text-lg mb-3">Categories</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>Design</li>
                  <li>Urbanism</li>
                  <li>Sustainability</li>
                </ul>
              </div>

              <div className="bg-white rounded-2l shadow-md py-4 px-3">
                <h2 className="font-semibold text-lg mb-3">Recent Posts</h2>
                {allStoriesByUser?.slice(0, 3).map((story) => (
                  <div className="w-full h-[100px] flex gap-3 border-b border-slate-300 py-3">
                    <img
                      src={`http://localhost:5000/images/${story?.mainImage}`}
                      className="h-[100%] w-[90px] object-cover cursor-pointer"
                      alt=""
                    />

                    <div className="w-full h-full px-2">
                      {/* title */}
                      <p className="font-bold hover:text-sky-400">
                        {story?.title}
                      </p>
                      {/* visited date and post Created date */}
                      <p className="text-[14px]  text-slate-500 mt-[12px] flex items-center justify-between">
                        <span className="font-semibold">
                          {moment(story?.visitedDate).format("MMMM D, YYYY")}
                        </span>
                        <span className="font-extralight">
                          {" "}
                          {moment(story?.createdAt).fromNow()}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutherProfile;
