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

  // 🔥 Filtering logic
  const filteredStories = selectedCategory
    ? allStoriesByUser?.filter((story) => story.category === selectedCategory)
    : allStoriesByUser;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30">
      <Navbar />

      {/* user Profile Details */}
      <div className="w-full relative ">
        <div className="bg-green200 pt-40 h-screen">
          <h1 className="font-extrabold capitalize text-[90px]">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="font-setralight text-[30px] ml-1.5 -mt-5 text-slate-400">
            {user?.email}
          </p>
          <p className="w-[45%] mt-10 tracking-[1px] capitalize leading-[30px] ml-5">
            {user?.aboutMe}
          </p>

          <Link
            to="/fullProfile"
            className="flex items-center gap-2 font-bold text-[17px] text-sky-500 ml-5 mt-5"
          >
            More about me <FaArrowRight className="mt-1.5" />
          </Link>
        </div>

        {/* profile pic */}
        <div className="absolute right-10 top-25 w-75 h-75 rounded-full shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
          <img
            src={`http://localhost:5000/images/${user?.profilePic}`}
            alt="Profile"
            className="w-full h-full rounded-full object-cover object-top"
          />
        </div>

        {/* cover pic */}
        <div className="absolute right-70 top-90 w-60 h-60 rounded-full shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
          <img
            src={`http://localhost:5000/images/${user?.coverPic}`}
            alt="Cover"
            className="w-full h-full rounded-full object-cover object-top"
          />
        </div>

        {/* Add Blog Button */}
        <button
          onClick={() => setShowAddBlog(true)}
          className="absolute bg-white text-black py-3 px-6 rounded-full right-10 bottom-10 flex items-center gap-2 font-bold text-[17px] hover:-translate-y-0.5 hover:shadow-[2px_2px_1px_rgba(0,0,0,.4)] transition shadow-[1px_1px_4px_rgba(0,0,0,.2)]"
        >
          Add New Story
        </button>
      </div>

      {/* Stories Section */}
      <div className="w-full min-h-screen pb-20">
        <div className="text-center pt-6 pb-16">
          <h1 className="text-5xl font-extrabold mb-4">See My Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover stories, insights, and inspiration from our community.
          </p>
        </div>

        <div className="flex w-[90%] mx-auto gap-8">
          {/* LEFT - Stories */}
          <div className="scrollbar-hide w-2/3 h-[100vh] overflow-y-auto py-5 px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStories?.map((story) => (
                <ProfileStoryCard key={story.id} story={story} />
              ))}
            </div>

            {/* Empty state */}
            {filteredStories?.length === 0 && (
              <p className="text-gray-500 text-center mt-5">
                No stories found for this category.
              </p>
            )}
          </div>

          {/* RIGHT - Sidebar */}
          <div className="w-1/3">
            <div className="sticky top-24">
              {/* Categories */}
              <div className="bg-white shadow-md p-6 mb-6">
                <h2 className="font-semibold text-lg mb-3">Categories</h2>

                <div className="flex flex-wrap gap-2">
                  {/* All */}
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-5 py-1 rounded-full border transition ${
                      selectedCategory === ""
                        ? "bg-sky-400 text-white"
                        : "bg-gray-100 hover:bg-blue-100"
                    }`}
                  >
                    All
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full border transition ${
                        selectedCategory === cat
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-blue-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-md py-4 px-3">
                <h2 className="font-semibold text-lg mb-3">Recent Posts</h2>

                {allStoriesByUser?.slice(0, 3).map((story) => (
                  <div
                    key={story.id}
                    className="w-full h-[100px] flex gap-3 border-b border-slate-300 py-3"
                  >
                    <img
                      src={`http://localhost:5000/images/${story?.mainImage}`}
                      className="h-full w-[90px] object-cover cursor-pointer"
                      alt=""
                    />

                    <div className="w-full h-full px-2">
                      <p className="font-bold hover:text-sky-400">
                        {story?.title}
                      </p>

                      <p className="text-[14px] text-slate-500 mt-[12px] flex items-center justify-between">
                        <span className="font-semibold">
                          {moment(story?.visitedDate).format("MMMM D, YYYY")}
                        </span>
                        <span className="font-extralight">
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

      {/* Add Blog Modal */}
      {showAddBlog && <AddBlog setShowAddBlog={setShowAddBlog} />}

      <Footer />
    </div>
  );
};

export default ProfilePage;
