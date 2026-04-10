import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { IoIosAddCircle } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

import defaultCoverImg from "../../assets/cities-bg.jpg";
import DateSelector from "../../components/DateSelector";
import Quill from "quill";
import { toast } from "react-toastify";
import { FaXmark } from "react-icons/fa6";

const AddBlog = ({ setShowAddBlog }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [mainImage, setMainImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [data, setData] = useState({
    title: "",
    country: "",
    category: "",
    story: "",
    tips: "",
    distance: "",
    elevationGain: "",
    estimatedTime: "",
    difficultyStatus: "",
    thingsToDo: "",
    visitedDate: null,
  });

  // handelSingup Function

  const handleAddStory = async (e) => {
    e.preventDefault();

    // Frontend validation for required text fields
    if (
      !data.title?.trim() ||
      !data.country?.trim() ||
      !data.story?.trim() ||
      !data.visitedDate
    ) {
      toast.error(
        "Please complete all required information before submitting!",
      );
      return;
    }

    // Optional: validate visitedDate format
    if (isNaN(new Date(data.visitedDate).getTime())) {
      toast.error("Visited Date is invalid!");
      return;
    }

    // Frontend validation for images (optional, you can make some required)
    if (!mainImage) {
      toast.error("Please upload a Cover Image for your story!");
      return;
    }
    if (!image1 || !image2 || !image3 || !image4)
      toast.warning("Gallery Images are missing.");

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("country", data.country);
      formData.append("category", data.category || "");
      formData.append("story", data.story);
      formData.append("tips", data.tips || "");
      formData.append("distance", data.distance || "");
      formData.append("elevationGain", data.elevationGain || "");
      formData.append("estimatedTime", data.estimatedTime || "");
      formData.append("difficultyStatus", data.difficultyStatus || "");
      formData.append("thingsToDo", data.thingsToDo || "");
      formData.append("visitedDate", data.visitedDate);

      formData.append("mainImage", mainImage); // required
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const { data: response } = await axiosInstance.post(
        "api/story/add-story",
        formData,
      );

      if (response && !response.error) {
        toast.success(response.message || "Story added successfully!");

        setData({
          title: "",
          country: "",
          category: "",
          story: "",
          tips: "",
          distance: "",
          elevationGain: "",
          estimatedTime: "",
          difficultyStatus: "",
          thingsToDo: "",
          visitedDate: null,
        });

        setMainImage(null);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);

        setShowAddBlog(false);
        window.scrollTo(0, 0);
      } else {
        toast.error(response.message || "Failed to add story");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Unexpected error occurred";
      toast.error(msg);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });

      // 🔥 Listen for changes
      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;

        setData((prev) => ({
          ...prev,
          story: html,
        }));
      });
    }
  }, []);

  return (
    <div className="absolute z-300 top-15 bottom-0  w-full min-h-screen  bg-black/90">
      {/* go back Button */}
      <div className="scrollbar-hide bg-white h-full w-[50%] float-end overflow-y-scroll pb-7">
        <h1 className="text-right font-bold text-[25px] py-6 pr-6 mt-7">
          Tell Your{" "}
          <span className="text-sky-500 font-extrabold text-[30px]">Story</span>
        </h1>

        <button
          onClick={() => setShowAddBlog(false)}
          className="absolute  top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-red-100 hover:scale-110 transition-all duration-200"
        >
          <FaXmark className="text-gray-700 text-[20px]" />
        </button>
        <form onSubmit={handleAddStory} className="">
          {/* main Image section */}
          <div className="">
            {/* main photo */}
            <div className="relative w-[100%] mx-auto h-[250px]  bg-red-20 flex items-center justify-center">
              {mainImage ? (
                <img
                  src={URL.createObjectURL(mainImage)}
                  alt=""
                  className="w-full h-full object-cover  object-center"
                />
              ) : (
                <img
                  src={defaultCoverImg}
                  alt="default Cover"
                  className="w-full h-full object-cover rounded-xl object-center opacity-30"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/1 to-transparent"></div>

              <label
                htmlFor="mainImage"
                className="absolute w-fit h-fit  bottom-2 right-2  cursor-pointer bg-white text-black flex  items-center justify-center rounded-full py-1 px-4 gap-3"
              >
                <FaCamera />
                <p>Add Photo</p>
              </label>
              <input
                type="file"
                hidden
                id="mainImage"
                onChange={(e) => {
                  setMainImage(e.target.files[0]);
                }}
              />
            </div>
          </div>

          {/* input section */}
          <div className="relative pt-20 mt-10 w-[90%] mx-auto">
            {/* date secelector */}
            <div className="absolute flex flex-col items-end -top-3 right-2 ">
              <label className=" text-[22px] font-bold mb-2">Pick Day</label>
              <DateSelector
                date={data?.visitedDate}
                setDate={(date) => {
                  setData((prev) => ({
                    ...prev,
                    visitedDate: date,
                  }));
                }}
              />
            </div>

            {/* Title Name */}
            <div className="w-full ">
              <label className=" text-[22px] font-bold">Story Title</label>
              <input
                type="text"
                placeholder="Enter Title Here"
                className="register-input-box"
                value={data?.title}
                onChange={(e) => {
                  setData((data) => ({ ...data, title: e.target.value }));
                }}
              />
            </div>

            {/* City and Category */}
            <div className="w-full mt-3 flex items-center gap-5 ">
              {/* City  */}
              <div className="w-full ">
                <label className="text-[20px] font-bold">Country</label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  className="register-input-box"
                  value={data?.country}
                  onChange={(e) => {
                    setData((data) => ({
                      ...data,
                      country: e.target.value,
                    }));
                  }}
                />
              </div>

              {/* Category */}
              <div className="w-full -mt-3.5">
                <label className="text-[20px] font-bold ">Category</label>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white mt-2"
                  value={data?.category}
                  onChange={(e) =>
                    setData((data) => ({
                      ...data,
                      category: e.target.value,
                    }))
                  }
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
              </div>
            </div>

            {/* Story */}
            <div className="w-full">
              <p className="text-[20px] font-bold mt-5 mb-3">
                Share Your Travel Story
              </p>
              <div className="w-full h-74 pb-16 sm:pb-10 pt-2 relative">
                <div ref={editorRef}></div>
              </div>
            </div>

            {/* gallery section */}
            <div className="w-full mt-8 mb-10 bg-red400">
              <label className="text-[20px] font-bold">Gallery</label>
              <div className="grid grid-cols-4 gap-2 h-fit mt-3">
                {/* box-1 */}
                <div className="w-full h-full">
                  <label
                    htmlFor="image1"
                    className="cursor-pointer text-black w-full h-[100px] flex flex-col  items-center justify-center border  border-gray-500/30 "
                  >
                    {image1 ? (
                      <img
                        src={URL.createObjectURL(image1)}
                        alt=""
                        className="w-full h-[100px] object-cover object-top"
                      />
                    ) : (
                      <IoIosAddCircle className="text-[26px] text-sky-300/50 hover:text-sky-300" />
                    )}
                  </label>
                  <input
                    type="file"
                    hidden
                    id="image1"
                    onChange={(e) => {
                      setImage1(e.target.files[0]);
                    }}
                  />
                </div>

                {/* box-2 */}
                <div className="w-full h-full">
                  <label
                    htmlFor="image2"
                    className="cursor-pointer text-black w-full h-[100px] flex flex-col  items-center justify-center border border-gray-500/30"
                  >
                    {image2 ? (
                      <img
                        src={URL.createObjectURL(image2)}
                        alt=""
                        className="w-full h-[100px] object-cover object-top"
                      />
                    ) : (
                      <IoIosAddCircle className="text-[26px]  text-sky-300/50 hover:text-sky-300" />
                    )}
                  </label>
                  <input
                    type="file"
                    hidden
                    id="image2"
                    onChange={(e) => {
                      setImage2(e.target.files[0]);
                    }}
                  />
                </div>

                {/* box-3 */}
                <div className="w-full h-full">
                  <label
                    htmlFor="image3"
                    className="cursor-pointer text-black w-full h-[100px] flex flex-col  items-center justify-center border border-gray-500/30 "
                  >
                    {image3 ? (
                      <img
                        src={URL.createObjectURL(image3)}
                        alt=""
                        className="w-full h-[100px] object-cover rounded-xl  object-top"
                      />
                    ) : (
                      <IoIosAddCircle className="text-[26px]  text-sky-300/50 hover:text-sky-300" />
                    )}
                  </label>
                  <input
                    type="file"
                    hidden
                    id="image3"
                    onChange={(e) => {
                      setImage3(e.target.files[0]);
                    }}
                  />
                </div>

                {/* box-4 */}
                <div className="w-full h-full">
                  <label
                    htmlFor="image4"
                    className="cursor-pointer text-black w-full h-[100px] flex flex-col  items-center justify-center border border-gray-500/30"
                  >
                    {image4 ? (
                      <img
                        src={URL.createObjectURL(image4)}
                        alt=""
                        className="w-full h-[100px] object-cover rounded-xl  object-top"
                      />
                    ) : (
                      <IoIosAddCircle className="text-[26px]  text-sky-300/50 hover:text-sky-300" />
                    )}
                  </label>
                  <input
                    type="file"
                    hidden
                    id="image4"
                    onChange={(e) => {
                      setImage4(e.target.files[0]);
                    }}
                  />
                  <input type="file" hidden id="image" />
                </div>
              </div>
            </div>

            {/* tips section */}
            <div className="my-4">
              {/* tips description */}
              <div className="w-full">
                <label className="text-[22px] font-bold">
                  Tips For Visiting
                </label>
                <textarea
                  type="text"
                  rows={4}
                  placeholder="Content here"
                  className="register-input-box"
                  value={data?.tips}
                  onChange={(e) => {
                    setData((data) => ({ ...data, tips: e.target.value }));
                  }}
                />
              </div>

              {/* Tips Section */}
              <div className="w-[60%] flex flex-col items-center -mt-2">
                {/* top */}
                <div className="flex  gap-5">
                  {/* Duration  */}
                  <div className="w-full">
                    <label className="font-semibold text-slate-600 text-[14px]">
                      Distance
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="register-input-box"
                      value={data?.distance}
                      onChange={(e) => {
                        setData((data) => ({
                          ...data,
                          distance: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  {/*Elevation Gain */}
                  <div className="w-full">
                    <label className="font-semibold text-slate-600 text-[14px]">
                      Elevation Gain
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="register-input-box"
                      value={data?.elevationGain}
                      onChange={(e) => {
                        setData((data) => ({
                          ...data,
                          elevationGain: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                {/* bottom */}
                <div className="flex items-center gap-5 -mt-2">
                  {/* ESTIMATED TIME  */}
                  <div className="w-full">
                    <label className="font-semibold text-slate-600 text-[14px]">
                      Estimated Time
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="register-input-box"
                      value={data?.estimatedTime}
                      onChange={(e) => {
                        setData((data) => ({
                          ...data,
                          estimatedTime: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  {/* Elevation Gain */}
                  <div className="w-full -mt-4">
                    <label className="font-semibold text-slate-600 text-[14px]">
                      Difficulty
                    </label>
                    <select
                      className="w-full p-2.5 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      value={data?.difficultyStatus}
                      onChange={(e) =>
                        setData((data) => ({
                          ...data,
                          difficultyStatus: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* best things to do */}
            <div className="w-full">
              <label className="text-[22px] font-bold">Best Things To Do</label>
              <textarea
                type="text"
                rows={4}
                placeholder="Content here"
                className="register-input-box"
                value={data?.thingsToDo}
                onChange={(e) => {
                  setData((data) => ({ ...data, thingsToDo: e.target.value }));
                }}
              />
            </div>

            {/* image section */}

            <button
              className="rounded-full mt-10 bg-sky-500 text-white text-[17px] tracking-wide py-3 px-10 font-semibold shadow-md hover:bg-sky-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 self-center"
              type="submit"
            >
              Add Your Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
