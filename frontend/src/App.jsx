import React from "react";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "quill/dist/quill.snow.css";
import TravelStory from "./pages/TravelStory/TravelStory";
import FullDetailProfile from "./pages/ProfilePage/FullDetailProfile";
import BolgStories from "./pages/BolgStories/BolgStories";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import AutherProfile from "./pages/ProfilePage/AutherProfile";
import AuthorFullDetailProfile from "./pages/ProfilePage/AuthorFullDetailProfile";
const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/fullProfile" element={<FullDetailProfile />} />
        <Route path="/stories" element={<BolgStories />} />
        <Route path="/stories/:id" element={<TravelStory />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:id" element={<AutherProfile />} />
        <Route
          path="/authors/AuthorFullDetailProfile/:id"
          element={<AuthorFullDetailProfile />}
        />
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
