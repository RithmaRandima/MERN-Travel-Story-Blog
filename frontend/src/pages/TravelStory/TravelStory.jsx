import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/navigation";
import Navbar from "../../components/Navbar";
import { GiWorld, GiPathDistance, GiHiking } from "react-icons/gi";
import moment from "moment";
import { PiMapPinAreaFill } from "react-icons/pi";
import {
  FaFacebook,
  FaLinkedinIn,
  FaStar,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaPersonRunning, FaX } from "react-icons/fa6";
import { useBlog } from "../../context/Blog-Context";
import { toast } from "react-toastify";

const TravelStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState({});
  const [reviews, setReviews] = useState([]);

  const { user, token } = useBlog();

  console.log("user", user);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // fetch travel Story
  useEffect(() => {
    const fetchStoryByID = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/story/get-story/${id}`);
        if (data?.success) setStory(data.story);
      } catch (error) {
        console.log("Error fetching Story", error);
      }
    };
    fetchStoryByID();
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch Comments By ID
  const fetchCommentsByID = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/comment/by-post/${id}`);
      if (data?.success) setReviews(data.comments);
    } catch (error) {
      console.log("Error fetching Story", error);
    }
  };
  useEffect(() => {
    fetchCommentsByID();
  }, [id]);

  // Add Comment
  const handelAddComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return toast.error("Please Add Review");
    if (!rating.trim()) return toast.error("Please Add Rating");
    try {
      const { data } = await axiosInstance.post(
        `/api/comment/add-comment/${id}`,
        {
          content: comment,
          rating,
          userId: user?._id,
        },
      );
      if (data?.success) {
        toast.success(data.message || "Comment added successfully!");
        fetchCommentsByID();
        setComment("");
        setRating(" ");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unexpected error occurred");
      console.log("Error fetching Story", error);
    }
  };
  const coverImages = [
    story?.mainImage,
    ...(story?.galleryImages?.slice(0, 4) || []),
  ].filter(Boolean);

  console.log(reviews);

  return (
    <div className="relative">
      <Navbar />

      {/* 🔥 FIXED HERO SWIPER */}
      <div className="fixed top-0 left-0 w-full h-[90vh] z-0 overflow-hidden">
        <Swiper
          modules={[Autoplay, Parallax]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          speed={2000}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          parallax
          className="h-full"
        >
          {coverImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full" data-swiper-parallax="-20%">
                <img
                  src={`http://localhost:5000/images/${image}`}
                  alt={image}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
      </div>

      {/* ✅ SPACER (VERY IMPORTANT) */}
      <div className="h-[90vh]"></div>

      {/* ✅ MAIN CONTENT */}
      <div className="bg-white relative z-10 pt-10 shadow-lg">
        {/* Gradient overlay */}
        <div className="absolute z-20 inset-0 bg-gradient-to-t from-white via-white/50 to-transparent h-[43vh] z-50 -top-68">
          {/* TITLE */}
          <div className="text-center absolute left-[50%] w-[100%] top-40 -translate-x-[50%]">
            <div className="flex justify-center items-center gap-2">
              <GiWorld className="text-[25px]" />
              <p className="font-bold text-[20px]">{story.country}</p>
            </div>

            <h1 className="text-[40px] font-bold w-[60%] mx-auto">
              {story.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap justify-center items-center text-[16px] mt-3 gap-4">
              <div className="flex items-center text-amber-400">
                <FaStar className="mr-1" />
                <p>
                  <span className="font-bold">4.8</span>/5
                </p>
              </div>

              <div className="flex items-center gap-1 text-slate-500">
                <PiMapPinAreaFill />
                <p>{story?.category}</p>
              </div>

              <p>{moment(story.visitedDate).format("MMMM D, YYYY")}</p>
              <p>{moment(story.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="mt-25 w-[70%] mx-auto">
          <h1 className="text-[26px] font-semibold mb-4">Tips For Visiting</h1>
          <p className="text-[16px]">{story.tips}</p>

          <div className="mt-10 grid grid-cols-2 gap-10 w-[70%]">
            <TipBox
              value={`${story.distance} km`}
              logo={<GiPathDistance className="text-[70px]" />}
              topic="DISTANCE"
            />
            <TipBox
              value={`${story.elevationGain} m`}
              logo={<GiHiking className="text-[70px]" />}
              topic="ELEVATION"
            />
            <TipBox
              value={story.estimatedTime}
              logo={<BsFillStopwatchFill className="text-[60px]" />}
              topic="TIME"
            />
            <TipBox
              value={story.difficultyStatus}
              logo={<FaPersonRunning className="text-[65px]" />}
              topic="DIFFICULTY"
            />
          </div>
        </div>

        {/* STORY */}
        <div
          className="mt-12 w-[70%] mx-auto"
          dangerouslySetInnerHTML={{ __html: story.story }}
        ></div>

        {/* GALLERY */}
        <div className="w-full py-12 mt-10">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            autoplay={{ delay: 4000 }}
            navigation
            centeredSlides
            slidesPerView={1.2}
            spaceBetween={30}
          >
            {coverImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <img
                    src={`http://localhost:5000/images/${image}`}
                    alt={image}
                    className="w-full max-h-[80vh] object-cover rounded-3xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* AUTHOR */}
        <div className=" py-3 px-4 mt-16 shadow-md w-[600px] mx-auto rounded-lg flex">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={`http://localhost:5000/images/${story?.userId?.profilePic}`}
            alt=""
          />

          <div className="ml-5 w-[calc(600px-100px)]">
            <p className="font-bold">
              {story?.userId?.firstName} {story?.userId?.lastName}
            </p>
            <p className="text-sm text-gray-500">{story?.userId?.email}</p>

            <p className="mt-2 text-[15px]">
              {story?.userId?.aboutMe?.split(".").slice(0, 2).join(".") + "."}
            </p>

            <div className="flex gap-4 mt-7">
              <FaLinkedinIn />
              <FaX />
              <FaYoutube />
              <FaTiktok />
              <FaFacebook />
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="w-[70%] mx-auto mt-16 pb-20">
          <div className="bg-black text-white p-3 rounded-full pl-6">
            Comments (3)
          </div>

          {/* comment display */}
          <div className="scrollbar-hide bg-white mt-6  h-60 overflow-y-auto p-7">
            {reviews?.length === 0 ? (
              <p className="text-center text-gray-400 mt-10 text-sm">
                Be the first one to add a comment ✨
              </p>
            ) : (
              reviews?.map((review) => (
                <div className="w-full flex items-start p-2  mb-3">
                  <img
                    src={`http://localhost:5000/images/${review?.userId?.profilePic}`}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover object-top mr-5"
                  />

                  <div className="bg-slate-100/60 w-[calc(100%-100px)] py-2 px-4">
                    <p className="font-semibold text-[17px]">
                      {review?.userId?.firstName}
                    </p>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(review?.rating || 0)].map((_, i) => (
                        <FaStar key={i} className="text-black text-[9px]" />
                      ))}
                    </div>
                    <p className="mb-2 font-extralight text-[12px]">
                      <span>
                        {moment(review?.createdAt).format("YYYY-MM-DD")} at{" "}
                      </span>
                      <span>{moment(review?.createdAt).format("hh:mm A")}</span>
                    </p>
                    <p>{review?.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* comment form section */}
          {!token ? (
            <div className="bg-white p-6 mt-6 shadow rounded-lg">
              <p className="text-lg font-semibold mb-2">Leave a Comment</p>
              <p>
                You must be{" "}
                <Link to="/login" className="text-blue-500">
                  logged in
                </Link>{" "}
                to comment.
              </p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg mt-6 ">
              <form
                onSubmit={handelAddComment}
                className="w-full mx-auto shadow-lg rounded-2xl p-4 space-y-5 hover:ring-2 hover:ring-indigo-400"
              >
                {/* AUTHOR */}
                <div className=" flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover object-top"
                    src={`http://localhost:5000/images/${user?.profilePic}`}
                    alt=""
                  />

                  <div className="ml-1">
                    <p className="font-semibold text-[14px]">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-[11px] text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* Comment Input */}
                <div>
                  <textarea
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="-mt-4 w-full p-3 focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit Button  and rating*/}
                <div className="flex items-end gap-3 -mt-5 justify-end">
                  {/* Rating Input */}
                  <div className="lex">
                    <label className="text-gray-600 block mb-2 w-fit">
                      Rating (1–5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      placeholder="Add Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-[120px] text-[14px] border border-gray-300 rounded-lg py-2.5 pl-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-fit text-[14px] text-white font-semibold py-2.5 rounded-full px-5 bg-black hover:scale-105 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelStory;

// TIP BOX
const TipBox = ({ topic, value, logo }) => {
  return (
    <div className="flex items-center gap-4  my-5">
      {logo}
      <div>
        <p className="text-[17px] text-gray-500">{topic}</p>
        <p className="font-bold text-[25px]">{value}</p>
      </div>
    </div>
  );
};
