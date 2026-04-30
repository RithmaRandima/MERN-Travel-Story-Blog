import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AddBlog from "../AddBlog/AddBlog";
import ProfileStoryCard from "../../components/ProfileStoryCard";
import Footer from "../../components/Footer";
import moment from "moment";

const ProfilePage = () => {
  const { user, allStoriesByUser } = useBlog();

  const [showAddBlog, setShowAddBlog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Beach",
    "City",
    "Forest",
    "Desert",
    "Lake",
    "Landmark",
    "Mountain",
  ];

  const filteredStories = selectedCategory
    ? allStoriesByUser?.filter((story) => story.category === selectedCategory)
    : allStoriesByUser;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30">
      <Navbar />

      {/* ================= PROFILE HEADER ================= */}
      <div className="relative w-full pt-28 sm:pt-36 md:pt-40 px-4 sm:px-8">
        <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-10">
          {/* LEFT TEXT */}
          <div className="w-full lg:w-2/3">
            <h1 className="font-extrabold capitalize text-3xl sm:text-5xl md:text-7xl lg:text-[90px] leading-tight">
              {user?.firstName} {user?.lastName}
            </h1>

            <p className="font-light text-lg sm:text-xl md:text-2xl lg:text-[30px] text-slate-400 mt-2">
              {user?.email}
            </p>

            <p className="w-full lg:w-[80%] mt-6 sm:mt-8 tracking-wide leading-7 sm:leading-8 text-sm sm:text-base capitalize">
              {user?.aboutMe}
            </p>

            <Link
              to="/fullProfile"
              className="flex items-center gap-2 font-bold text-sky-500 mt-5"
            >
              More about me <FaArrowRight />
            </Link>
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative w-full lg:w-1/3 flex justify-center lg:justify-end">
            {/* Profile Pic */}
            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-75 lg:h-75 rounded-full shadow-lg">
              <img
                src={`http://localhost:5000/images/${user?.profilePic}`}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>

            {/* Cover Pic (hidden on small screens) */}
            <div className="hidden md:block absolute right-60 bottom-[-150px] w-32 h-32 lg:w-50 lg:h-50 rounded-full shadow-lg">
              <img
                src={`http://localhost:5000/images/${user?.coverPic}`}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Add Blog Button */}
        <button
          onClick={() => setShowAddBlog(true)}
          className="fixed bottom-6 right-4 sm:bottom-10 sm:right-10 bg-white text-black py-2 sm:py-3 px-4 sm:px-6 rounded-full font-bold shadow-md hover:-translate-y-1 z-10 transition"
        >
          Add New Story
        </button>
      </div>

      {/* ================= STORIES ================= */}
      {/* Stories Section */}
      <div className="w-full pb-20">
        <div className="text-center pt-6 pb-10 sm:pb-16 px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            See My Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover stories, insights, and inspiration from our community.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        {/* MAIN LAYOUT */}
        <div className="w-[92%] mx-auto flex flex-col lg:flex-row gap-8">
          {/* ================= SIDEBAR (MOBILE TOP, DESKTOP RIGHT) ================= */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl">
                <h2 className="font-semibold text-lg mb-3">Categories</h2>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-4 py-1 rounded-full border ${
                      selectedCategory === ""
                        ? "bg-sky-400 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    All
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full border ${
                        selectedCategory === cat
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              {allStoriesByUser?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-4">
                  <h2 className="font-semibold text-lg mb-3">Recent Posts</h2>

                  {allStoriesByUser?.slice(0, 3).map((story) => (
                    <div key={story.id} className="flex gap-3 border-b py-3">
                      <img
                        src={`http://localhost:5000/images/${story?.mainImage}`}
                        className="h-16 w-20 object-cover"
                        alt=""
                      />

                      <div className="flex-1">
                        <p className="font-bold text-sm hover:text-sky-400">
                          {story?.title}
                        </p>

                        <p className="text-xs text-slate-500 mt-2 flex justify-between">
                          <span>
                            {moment(story?.visitedDate).format("MMM D, YYYY")}
                          </span>
                          <span>{moment(story?.createdAt).fromNow()}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= STORIES (MOBILE BELOW, DESKTOP LEFT) ================= */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStories?.map((story) => (
                  <ProfileStoryCard key={story.id} story={story} />
                ))}
              </div>

              {filteredStories?.length === 0 && (
                <p className="text-gray-500 text-center mt-5">
                  No stories found for this category.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Blog Modal */}
      {showAddBlog && <AddBlog setShowAddBlog={setShowAddBlog} />}

      <Footer />
    </div>
  );
};

export default ProfilePage;
