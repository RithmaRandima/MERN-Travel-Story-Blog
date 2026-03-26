import React, { useState } from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";
import DateSelector from "../../components/DateSelector";
import ImageSelector from "../../components/ImageSelector";
import TagInput from "../../components/TagInput";
import axiosInstance from "../../utils/axiosinstance";
import moment from "moment";
import { toast } from "react-toastify";

const AddEditTravelStory = ({
  url,
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  // input fields
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(
    storyInfo?.image ? `${url}/images/${storyInfo.image}` : null,
  );
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setvisitedLocation] = useState(
    storyInfo?.visitedLocation || [],
  );
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null,
  );

  // window configs
  const [error, setError] = useState("");

  // Add New Travel Story
  const addNewTravelStory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("story", story);
      formData.append("visitedLocation", visitedLocation);
      formData.append("image", storyImg);
      formData.append(
        "VisitedDate",
        visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      );

      const response = await axiosInstance.post(
        `/api/post/add-story`,
        formData,
      );
      setTitle("");
      setStory("");
      setStoryImg(null);
      setvisitedLocation([]);
      setVisitedDate(null);

      if (response.data && response.data.story) {
        toast.success("Story Add Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      toast.error("Error Creating Story");
      console.log(error);
    }
  };

  // update Travel Story
  const updateTravelStory = async () => {
    const storyId = storyInfo._id;
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("story", story);
      formData.append("visitedLocation", visitedLocation);
      if (storyImg instanceof File) {
        formData.append("image", storyImg);
      }
      formData.append(
        "VisitedDate",
        visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      );

      const response = await axiosInstance.post(
        `/api/post/edit-story/${storyId}`,
        formData,
      );
      setTitle("");
      setStory("");
      setStoryImg(null);
      setvisitedLocation([]);
      setVisitedDate(null);

      if (response.data && response.data.story) {
        toast.success("Story Update Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      toast.error("Error Updating Story");
      console.log(error);
    }
  };

  const handelAddOrUpdateClick = () => {
    console.log("Input Data: ", {
      title,
      storyImg,
      story,
      visitedLocation,
      visitedDate,
    });

    if (!title) {
      setError("Please Enter the Title");
      return;
    }
    if (!story) {
      setError("Please Enter the Story");
      return;
    }

    setError("");

    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {/*Title Section  */}
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        {/* Tutton Section */}
        <div>
          <div className=" flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handelAddOrUpdateClick}>
                <MdAdd className="text-lg" /> Add Story
              </button>
            ) : (
              <>
                <button className="btn-small " onClick={handelAddOrUpdateClick}>
                  <MdUpdate className="text-xl" /> Update Story
                </button>
              </>
            )}

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-[11px] pt-2 text-right font-semibold">
              {error}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-[18px] text-slate-950 p-2  bg-slate-50 rounded-[5px] outline-none"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector image={storyImg} setImage={setStoryImg} />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">STORY</label>
            <textarea
              type="text"
              className="text-[16px] text-slate-950 outline-none bg-slate-50 p-2 rounded-[5px]"
              rows={10}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Your Story"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">VISITED LOCATIONS</label>
            <TagInput tags={visitedLocation} setTags={setvisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
