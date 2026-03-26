import moment from "moment";
import React from "react";
import { FaMapLocation } from "react-icons/fa6";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({
  url,
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div className=" flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
          <button
            className="btn-small "
            onClick={() => {
              onEditClick();
            }}
          >
            <MdUpdate className="text-xl" /> Update Story
          </button>

          <button
            className="btn-small btn-delete"
            onClick={() => {
              onDeleteClick();
            }}
          >
            <MdDeleteOutline className="text-xl " /> Delete
          </button>

          <button className="cursor-pointer" onClick={onClose}>
            <MdClose className="text-xl text-slate-400" />
          </button>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">
            {storyInfo && storyInfo.title}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo &&
                moment(storyInfo.VisitedDate).format("Do MMM YYYYY")}
            </span>

            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded-full px-2 py-1">
              <FaMapLocation className="text-sm" />
              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length == index + 1
                    ? `${item}`
                    : `${item},`,
                )}
            </div>
          </div>
          {/* img section */}
          <img
            src={storyInfo && `${url}/images/${storyInfo.image}`}
            alt=""
            className="w-full h-[300px] object-cover rounded-2xl"
          />

          <div className="mt-4">
            <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
              {storyInfo.story}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
