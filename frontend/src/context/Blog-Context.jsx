// BlogContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const BlogContext = createContext();

// Provider component
export const BlogProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize state from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function
  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home"); // redirect to login after logout
  };

  const value = {
    user,
    token,
    login,
    logout,
    navigate,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// Custom hook for easy access
export const useBlog = () => useContext(BlogContext);
