import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

const App = () => {
  return (
    <div className="bg-red-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default App;
