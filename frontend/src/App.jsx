import React from "react";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import UserStroyProfile from "./pages/Home/UserStroyProfile";
import Register from "./pages/Auth/Register";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Profile" element={<UserStroyProfile />} />
        <Route path="/stories/:id" element={<UserStroyProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to={"/Profile"} />
  ) : (
    <Navigate to={"/home"} />
  );
};

export default App;
