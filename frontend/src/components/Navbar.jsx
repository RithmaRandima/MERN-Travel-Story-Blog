import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useBlog } from "../context/Blog-Context";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const { navigate, user, token } = useBlog();
  const location = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 40) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const navLinks = (
    <>
      {["/home", "/stories", "/authors"].map((path, i) => {
        const name = path.replace("/", "");
        return (
          <Link
            key={i}
            to={path}
            onClick={() => setMenuOpen(false)}
            className="text-lg font-bold text-gray-800"
          >
            <p className="capitalize">{name}</p>
            {location.pathname === path && (
              <hr className="h-1 w-full rounded-full bg-sky-400 border-0" />
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white px-8 md:px-10 h-16">
        {/* Left: Desktop Links */}
        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          {menuOpen ? (
            <FaTimes
              size={22}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <FaBars
              size={22}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>

        {/* Right Side */}
        {token ? (
          <ProfileInfo userInfo={user} onLogout={onLogout} />
        ) : (
          <div className="flex items-center gap-4">
            <FaSearch className="text-[20px]" />
            <Link
              to="/login"
              className="bg-sky-400 text-white px-3 py-1 rounded-full font-bold hover:bg-sky-500 transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white flex flex-col items-center gap-4 py-4 shadow-md">
          {navLinks}
        </div>
      )}

      {/* Logo */}
      <div className="flex justify-center py-2">
        <h1
          className={`logo ${
            location.pathname === "/home" ? "text-white" : "text-black"
          } text-2xl md:text-4xl tracking-widest font-light`}
        >
          WanderInk
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
