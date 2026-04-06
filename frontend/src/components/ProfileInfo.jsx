import React, { useState } from "react";
import { useBlog } from "../context/Blog-Context.jsx";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

const ProfileInfo = () => {
  const { user, logout } = useBlog();
  const [menu, setMenu] = useState(false);

  if (!user) return null;

  return (
    <div className="relative flex items-center gap-3">
      {/* TOP USER INFO */}
      <div className="flex items-center">
        <img
          src={`http://localhost:5000/images/${user.profilePic}`}
          alt="Profile"
          className="w-11 h-11 rounded-full object-cover border-2 border-slate-300"
        />

        <div className="ml-2.5">
          <p className="font-bold text-[15px]">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-[11px] text-slate-400">{user.email}</p>
        </div>

        {/* TOGGLE BUTTON */}
        <div
          className="px-2 cursor-pointer"
          onClick={() => setMenu((prev) => !prev)}
        >
          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              menu ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* DROPDOWN MENU */}
      <div
        className={`absolute top-14 right-0 bg-white rounded-lg w-[250px] shadow-lg 
        transform transition-all duration-300 origin-top z-50
        ${
          menu
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* USER INFO INSIDE MENU */}
        <div className="flex flex-col mt-4 items-center">
          <img
            src={`http://localhost:5000/images/${user.profilePic}`}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border"
          />

          <div className="mt-2 text-center">
            <p className="font-bold text-[16px]">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[12px] text-slate-400">{user.email}</p>
          </div>
        </div>

        {/* MENU ITEMS */}
        <div className="py-3 px-5">
          <div className="pl-5 border border-slate-300/40 hover:bg-slate-50 hover:scale-[1.03] transition-all duration-200 mb-3 rounded-full w-full flex items-center gap-3 p-2 cursor-pointer">
            <IoMdSettings className="text-[20px]" />
            <p className="text-[14px] font-semibold">Settings</p>
          </div>

          <div className="pl-5 border border-slate-300/40 hover:bg-slate-50 hover:scale-[1.03] transition-all duration-200 mb-3 rounded-full w-full flex items-center gap-3 p-2 cursor-pointer">
            <FaEye className="text-[20px]" />
            <p className="text-[14px] font-semibold">Profile</p>
          </div>

          <div
            onClick={logout}
            className="pl-5 border bg-black text-white hover:bg-gray-800 hover:scale-[1.03] transition-all duration-200 mb-4 rounded-full w-full flex items-center gap-3 p-2 cursor-pointer"
          >
            <IoLogOut className="text-[20px]" />
            <p className="text-[14px] font-semibold">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
