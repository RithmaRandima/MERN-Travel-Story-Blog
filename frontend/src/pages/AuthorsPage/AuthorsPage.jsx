import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import AuthorCard from "../../components/AuthorCard";

const AuthorsPage = () => {
  const { allAuthors } = useBlog();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const authorsPerPage = 10;

  // ================= FILTER =================
  const filteredAuthors = allAuthors.filter((author) => {
    const fullName = `${author.firstName} ${author.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);

  const indexOfLast = currentPage * authorsPerPage;
  const indexOfFirst = indexOfLast - authorsPerPage;

  const currentAuthors = filteredAuthors.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-white/30 to-white pb-20">
      <Navbar />

      {/* ================= HERO ================= */}
      <div className="text-center pt-28 sm:pt-32 pb-10 px-4">
        <h1 className="font-extrabold text-3xl sm:text-5xl md:text-[60px] leading-tight mb-2">
          Explore Our Authors
        </h1>

        <p className="text-gray-600 text-sm sm:text-lg max-w-[500px] mx-auto">
          Discover stories, insights, and inspiration from our community of
          writers and creators.
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="w-full flex justify-center mb-10 px-4">
        <div className="w-full max-w-[500px] relative">
          <input
            type="text"
            placeholder="Search authors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-5 pl-10 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder:text-gray-400"
          />

          {/* search icon */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* ================= AUTHORS GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-4 md:px-10 w-full">
        {currentAuthors.length > 0 ? (
          currentAuthors.map((author) => (
            <AuthorCard key={author._id} author={author} />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            No authors found.
          </p>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          {/* PREV */}
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-full font-semibold shadow-md transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-sky-400 hover:text-white"
            }`}
          >
            ← Prev
          </button>

          {/* PAGE INFO */}
          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          {/* NEXT */}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-full font-semibold shadow-md transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-sky-400 hover:text-white"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthorsPage;
