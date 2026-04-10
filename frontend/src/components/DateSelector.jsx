import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { MdOutlineDateRange } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const DateSelector = ({ date, setDate }) => {
  const [openDayPicker, setOpenDayPicker] = useState(false);
  const containerRef = useRef(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpenDayPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Button */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-[15px] font-medium text-black bg-sky-300/50 hover:bg-sky-300/70 rounded-full px-4 py-1.5 cursor-pointer"
        onClick={() => setOpenDayPicker((prev) => !prev)}
      >
        <MdOutlineDateRange className="text-lg" />
        {date ? moment(date).format("Do MMM YYYY") : "Pick a date"}
      </button>

      {/* Calendar */}
      <AnimatePresence>
        {openDayPicker && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-0 mt-2 w-[350px] rounded-lg shadow-lg z-50"
          >
            <DayPicker
              className="p-5 bg-white shadow-[1px_2px_5px_rgba(0,0,0,0.2)] rounded-lg"
              captionLayout="dropdown-buttons"
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (!selectedDate) return; // 🔥 prevent undefined bug

                setDate(selectedDate); // update parent state
                setOpenDayPicker(false); // close picker after select
              }}
              pagedNavigation // ✅ fixed typo
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateSelector;
