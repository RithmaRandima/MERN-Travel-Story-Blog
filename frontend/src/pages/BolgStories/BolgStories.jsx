import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SubscribeNowSection from "../../components/SubscribeNowSection";
import { useBlog } from "../../context/Blog-Context";
import AuthorCard from "../../components/AuthorCard";
import StoryCard from "../../components/StoryCard";

const BlogListPage = () => {
  const { allStories } = useBlog();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredBlogs = allStories.filter(
    (story) =>
      story.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || story.category === categoryFilter),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen  bg-gradient-to-b from-[#47E0FF]/20 via-white/30 to-white pb-20">
      <Navbar />

      {/* Hero Section */}
      <div className="relative text-center pt-32 pb-15">
        <h1 className="font-extrabold text-[40px] md:text-[60px] leading-[70px] md:leading-[90px] mb-2">
          Explore Our Blogs
        </h1>
        <p className="text-gray-600 text-[18px] md:text-[20px] max-w-[500px] mx-auto">
          Discover stories, insights, and inspiration from our community of
          writers and creators.
        </p>
      </div>

      <div className="w-[90%] mx-auto mb-12 px-4 flex flex-col gap-6">
        {/* Top - Centered Search */}
        <div className="flex justify-center">
          <div className="w-full md:w-[60%]">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full shadow-[1px_1px_3px_rgba(0,0,0,0.4)] rounded-full bg-white p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:scale-[1.01] transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Bottom - Left aligned Select */}
        <div className="flex justify-start">
          <div className="relative group">
            <select
              className="appearance-none bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 font-medium rounded-full px-6 py-3 pr-10 shadow-md hover:shadow-lg hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Beach">Beach</option>
              <option value="City">City</option>
              <option value="Forest">Forest</option>
              <option value="Desert">Desert</option>
              <option value="Lake">Lake</option>
              <option value="Landmark">Landmark</option>
              <option value="Mountain">Mountain</option>
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 group-hover:text-indigo-500 transition">
              ▼
            </div>
          </div>
        </div>
      </div>
      {/* Blog Cards */}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full px-4 md:px-10 mx-auto gap-5">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((story) => {
            return <StoryCard key={story._id} story={story} />;
          })
        ) : (
          <p className="col-span-full text-gray-500 text-center text-[17px] font-semiblack">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
