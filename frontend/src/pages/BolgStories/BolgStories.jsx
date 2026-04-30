import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import StoryCard from "../../components/StoryCard";

const BlogListPage = () => {
  const { allStories } = useBlog();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FILTER STORIES
  const filteredBlogs = allStories.filter(
    (story) =>
      story.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || story.category === categoryFilter),
  );

  // PAGINATION CALCULATION
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredBlogs.slice(
    indexOfFirstStory,
    indexOfLastStory,
  );

  const totalPages = Math.ceil(filteredBlogs.length / storiesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-white/30 to-white pb-20">
      <Navbar />

      {/* HERO */}
      <div className="text-center pt-32 pb-10">
        <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl">
          Explore Our Blogs
        </h1>
        <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-xl mx-auto">
          Discover stories, insights, and inspiration.
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="w-[90%] mx-auto flex flex-col gap-4 mb-10">
        {/* SEARCH */}
        <div className="w-[100%] md:w-[50%] mx-auto">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder:text-gray-400"
          />
        </div>

        {/* CATEGORY */}
        <div className="relative w-[140px] sm:w-[180px]">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none px-4 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition cursor-pointer text-gray-700"
          >
            <option value="">All</option>
            <option value="Beach">Beach</option>
            <option value="City">City</option>
            <option value="Forest">Forest</option>
            <option value="Desert">Desert</option>
            <option value="Lake">Lake</option>
            <option value="Landmark">Landmark</option>
            <option value="Mountain">Mountain</option>
          </select>

          {/* custom arrow */}
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </div>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-[92%] mx-auto">
        {currentStories.length > 0 ? (
          currentStories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs found.
          </p>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {filteredBlogs.length > storiesPerPage && (
        <div className="flex justify-center items-center mt-12">
          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md shadow-lg px-4 py-2 rounded-full border border-gray-200">
            {/* PREV BUTTON */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300
        ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-sky-100 hover:text-sky-600"
        }`}
            >
              ← Prev
            </button>

            {/* PAGE INFO */}
            <div className="px-3 text-sm font-medium text-gray-600">
              <span className="text-sky-500 font-bold">{currentPage}</span>
              <span className="mx-1">/</span>
              <span>{totalPages}</span>
            </div>

            {/* NEXT BUTTON */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300
        ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-sky-100 hover:text-sky-600"
        }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
