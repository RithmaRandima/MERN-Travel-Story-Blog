import moment from "moment";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { MdClose, MdOutlineDateRange } from "react-icons/md";

const DateSelector = ({ date, setDate }) => {
  const [openDayPicker, setOpenDayPicker] = useState(false);
  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-200/40 hover:bg-sky-200/70 rounded-full px-2 py-1 cursor-pointer my-4"
        onClick={() => {
          setOpenDayPicker(true);
        }}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format("Do MMM YYYY")
          : moment().format("Do MMM YYYY")}
      </button>

      {openDayPicker && (
        <div className="overflow-y-scroll p-5 bg-sky-50/80 rounded-lg relative pt-9">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100 hover:bg-sky-200 absolute top-3 right-3 cursor-pointer"
            onClick={() => {
              setOpenDayPicker(false);
            }}
          >
            <MdClose className="text-xl text-sky-600" />
          </button>

          <DayPicker
            captionLayout="dropdown-buttons"
            mode="single"
            selected={date}
            onSelect={setDate}
            pagedNavogation
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
