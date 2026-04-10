import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaSearch, FaTwitter } from "react-icons/fa"; // social icons
import { useBlog } from "../context/Blog-Context";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const { navigate, user, token } = useBlog();

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

  const location = useLocation();
  return (
    <div
      className={`fixed w-full top-0 z-50  h-30 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top part: Social icons left */}
      <div className="flex bg-white pl-15 pr-5 justify-between items-center h-16 py-2 ">
        <div className="flex  items-center">
          <Link
            to="/home"
            className=" font-extrabold text-lg  text-gray-800 mr-6"
          >
            <p>Home</p>
            {location.pathname === "/home" && (
              <hr className="h-1 w-full rounded-full bg-sky-400 border-0" />
            )}
          </Link>

          <Link to="/stories" className=" text-lg font-extrabold text-gray-800">
            <p>Stories</p>
            {location.pathname === "/stories" && (
              <hr className="h-1 w-full rounded-full bg-sky-400 border-0" />
            )}
          </Link>

          <Link
            to="/authors"
            className="ml-5 text-lg font-extrabold text-gray-800"
          >
            <p>Authors</p>
            {location.pathname === "/authors" && (
              <hr className="h-1 w-full rounded-full bg-sky-400 border-0" />
            )}
          </Link>
        </div>
        {token ? (
          <ProfileInfo userInfo={user} onLogout={onLogout} />
        ) : (
          <div className="flex items-center gap-5">
            <FaSearch className="font-bold text-[22px]" />
            <Link
              to="/login"
              className="bg-sky-400  text-white px-4 py-1 rounded-full font-bold  hover:bg-sky-500 transition hover:scale-110"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Bottom part: Profile/Login right */}
      <div className="flex justify-center w-fit mx-auto  items-center px-6 ">
        <h1
          className={`logo ${location.pathname === "/home" ? "text-white" : "text-black"} text-center text-[45px] font-exrtralight tracking-[4px]`}
        >
          WanderInk
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
