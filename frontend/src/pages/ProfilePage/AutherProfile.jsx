import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProfileStoryCard from "../../components/ProfileStoryCard";
import Footer from "../../components/Footer";
import moment from "moment";
import axiosInstance from "../../utils/axiosinstance";

const AutherProfile = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [authorStories, setAuthorStories] = useState([]);
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

  // FETCH USER
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
        console.log("error fetching user", error);
      }
    };

    fetchAuthorData();
  }, [id]);

  // FETCH STORIES
  useEffect(() => {
    const getAllStoriesByAuthor = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/story/get-stories-by-author/${id}`,
        );

        if (data?.stories) setAuthorStories(data.stories);
      } catch (error) {
        console.log("error fetching stories", error);
      }
    };

    getAllStoriesByAuthor();
  }, [id]);

  // FILTER (same logic style as your ProfilePage)
  const filteredStories = selectedCategory
    ? authorStories?.filter((story) => story.category === selectedCategory)
    : authorStories;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#47E0FF]/20 via-[#7BE8FF]/30 to-[#7BE8FF]/30">
      <Navbar />

      {/* PROFILE SECTION */}
      <div className="w-full relative">
        <div className="pt-40 h-screen">
          <h1 className="font-extrabold capitalize text-[90px]">
            {authorData?.firstName} {authorData?.lastName}
          </h1>

          <p className="text-[30px] ml-1.5 -mt-5 text-slate-400">
            {authorData?.email}
          </p>

          <p className="w-[45%] mt-10 ml-5 leading-[30px]">
            {authorData?.aboutMe}
          </p>

          <Link
            to={`/authors/AuthorFullDetailProfile/${authorData._id}`}
            className="flex items-center gap-2 font-bold text-[17px] text-sky-500 ml-5 mt-5"
          >
            More about {authorData?.firstName}
            <FaArrowRight />
          </Link>
        </div>

        {/* PROFILE IMAGE */}
        <div className="absolute right-10 top-25 w-75 h-75 rounded-full shadow-[1px_3px_4px_rgba(0,0,0,0.5)]">
          <img
            src={`http://localhost:5000/images/${authorData?.profilePic}`}
            className="w-full h-full rounded-full object-cover object-top"
            alt=""
          />
        </div>
      </div>

      {/* STORIES SECTION */}
      <div className="w-full min-h-screen pb-20">
        <div className="text-center pt-6 pb-16">
          <h1 className="text-5xl font-extrabold mb-4">See My Stories</h1>
        </div>

        <div className="flex w-[90%] mx-auto gap-8">
          {/* LEFT SIDE */}
          <div className="scrollbar-hide  w-2/3 h-[100vh] overflow-y-auto py-5 px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStories?.map((story) => (
                <ProfileStoryCard key={story._id} story={story} />
              ))}
            </div>

            {/* ✅ EMPTY STATE (same as ProfilePage style) */}
            {filteredStories?.length === 0 && (
              <p className="text-gray-500 text-center mt-5">
                No stories found for this category.
              </p>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* CATEGORY BUTTONS (MATCHED STYLE) */}
              <div className="bg-white shadow-md p-6 rounded-xl">
                <h2 className="font-semibold text-lg mb-3">Categories</h2>

                <div className="flex flex-wrap gap-2">
                  {/* ALL BUTTON */}
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

                  {/* CATEGORY BUTTONS */}
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

              {/* RECENT POSTS (FIXED CONDITION) */}
              {authorStories?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md py-4 px-3">
                  <h2 className="font-semibold text-lg mb-3">Recent Posts</h2>

                  {authorStories.slice(0, 3).map((story) => (
                    <div
                      key={story._id}
                      className="w-full h-[100px] flex gap-3 border-b border-slate-300 py-3"
                    >
                      <img
                        src={`http://localhost:5000/images/${story?.mainImage}`}
                        className="h-full w-[90px] object-cover"
                        alt=""
                      />

                      <div className="w-[240px] px-2">
                        <p className="font-bold hover:text-sky-400">
                          {story?.title}
                        </p>

                        <p className="text-[14px] text-slate-500 mt-3 flex justify-between">
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
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AutherProfile;
