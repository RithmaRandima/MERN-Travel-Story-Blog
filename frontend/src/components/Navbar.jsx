import React from "react";
import ProfileInfo from "./ProfileInfo";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userInfo }) => {
  const isToggle = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl sticky top-0 z-10">
      <Link to="/home">
        <h1>Travel Story</h1>
      </Link>

      {isToggle ? (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
