import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // social icons

const Navbar = ({ userInfo }) => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const isToggle = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 40) {
        setShow(false); // scroll down
      } else {
        setShow(true); // scroll up
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={`fixed w-full top-0 z-50  h-30 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top part: Social icons left */}
      <div className="flex bg-white justify-between items-center h-15 px-2 py-2 border-b">
        <div className="flex gap-4 text-sky-600">
          <FaFacebook size={20} className="cursor-pointer hover:text-sky-800" />
          <FaInstagram
            size={20}
            className="cursor-pointer hover:text-pink-500"
          />
          <FaTwitter size={20} className="cursor-pointer hover:text-blue-400" />
        </div>
        <div className="mx-auto text-lg font-semibold text-gray-800">
          Travel Story
        </div>
        <div className="w-20">{/* empty space for alignment */}</div>
        {isToggle ? (
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        ) : (
          <Link
            to="/login"
            className="bg-sky-500 text-white px-4 py-1 rounded-lg hover:bg-sky-600"
          >
            Login
          </Link>
        )}
      </div>

      {/* Bottom part: Profile/Login right */}
      <div className="flex justify-center  items-center px-6">
        <h1 className=" logo text-center text-white text-[45px] py-4 font-exrtralight tracking-[4px]">
          WanderInk
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
