import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useBlog } from "../../context/Blog-Context";
import AuthorCard from "../../components/AuthorCard";

const AuthorsPage = () => {
  const { allAuthors } = useBlog(); // Get authors from context
  const [searchTerm, setSearchTerm] = useState("");

  // Filter authors based only on search term
  const filteredAuthors = allAuthors.filter((author) => {
    const fullName = `${author.firstName} ${author.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-white/30 to-white pb-20">
      <Navbar />

      {/* Hero Section */}
      <div className="relative text-center pt-32 pb-15">
        <h1 className="font-extrabold text-[40px] md:text-[60px] leading-[70px] md:leading-[90px] mb-2">
          Explore Our Authors
        </h1>
        <p className="text-gray-600 text-[18px] md:text-[20px] max-w-[500px] mx-auto">
          Discover stories, insights, and inspiration from our community of
          writers and creators.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-[90%] mx-auto mb-12 px-4 flex justify-center">
        <div className="w-full md:w-[60%]">
          <input
            type="text"
            placeholder="Search authors..."
            className="w-full shadow-[1px_1px_3px_rgba(0,0,0,0.4)] rounded-full bg-white p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:scale-[1.01] transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full px-4 md:px-10 mx-auto gap-5">
        {filteredAuthors.length > 0 ? (
          filteredAuthors.map((author) => (
            <AuthorCard key={author._id} author={author} />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            No authors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorsPage;
