import React from "react";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserStroyProfile from "./pages/Home/UserStroyProfile";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Profile" element={<UserStroyProfile />} />
          <Route path="/stories/:id" element={<UserStroyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
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
