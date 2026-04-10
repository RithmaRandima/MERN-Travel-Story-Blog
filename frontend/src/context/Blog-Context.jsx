// BlogContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { toast } from "react-toastify";
// Create context
const BlogContext = createContext();

// Provider component
export const BlogProvider = ({ children }) => {
  const navigate = useNavigate();

  const [allAuthors, setAllAuthors] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const [allStoriesByUser, setAllStoriesByUser] = useState([]);
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
    toast.info("You have logged out. Safe travels until next time! 🌍");
    window.scrollTo(0, 0);
  };

  // get All Authors
  const getAllAuthors = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/get-all-users");

      if (data?.users) {
        setAllAuthors(data.users);
      }
    } catch (error) {
      console.log("Error fetching Authors", error);
    }
  };

  // get All Stories
  const getAllStories = async () => {
    try {
      const { data } = await axiosInstance.get("/api/story/get-all-stories");

      if (data?.success) {
        setAllStories(data.stories);
      }
    } catch (error) {
      console.log("Error fetching all Stories", error);
    }
  };

  // Get all stories by logged-in user
  const getAllStoriesByUser = async () => {
    if (!token) return; // user not logged in
    try {
      const { data } = await axiosInstance.get("/api/story/get-user-stories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.stories) setAllStoriesByUser(data.stories);
    } catch (error) {
      console.log("Error fetching stories by user", error);
    }
  };

  useEffect(() => {
    getAllAuthors();
    getAllStories();
    if (user) getAllStoriesByUser();
  }, [user]);

  const value = {
    allAuthors,
    allStories,
    user,
    token,
    login,
    logout,
    navigate,
    allStoriesByUser,
    getAllStories,
    getAllStoriesByUser,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// Custom hook for easy access
export const useBlog = () => useContext(BlogContext);
