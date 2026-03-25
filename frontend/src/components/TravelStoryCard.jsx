import React from "react";
import { FaHeart, FaMapLocation } from "react-icons/fa6";
import moment from "moment"; // ✅ import moment

const TravelStoryCard = ({ item, onEdit, onClick, onFavouriteClick, url }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all ease-in-out relative cursor-pointer">
      <img
        src={`${url}/images/${item.image}`}
        alt={item.title || "Travel Story"}
        onClick={onClick}
        className="w-full h-56 object-cover rounded-lg"
      />

      {/* favourite Icon */}
      <button
        className="w-10 h-10 flex items-center justify-center bg-white/40 rounded-lg border-white border absolute top-4 right-4"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`text-[22px] cursor-pointer hover:text-red-400 ${item.isFavourite ? "text-red-500" : "text-white"}`}
        />
      </button>

      {/* info */}
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{item.title}</h6>
            <span className="text-xs text-slate-500">
              {item.VisitedDate
                ? moment(item.VisitedDate).format("Do MMM YYYY")
                : "-"}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-2">
          {item?.story.slice(0, 60)}
        </p>
        {/* places array */}
        <div className="flex flex-wrap gap-2 mt-3">
          {item.visitedLocation.map((place, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 text-[13px] text-cyan-600 bg-cyan-200/40 px-2 py-1 rounded"
            >
              <FaMapLocation className="text-[18px] mr-1" />
              {place}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
