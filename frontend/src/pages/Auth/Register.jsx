import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";
import axiosInstance from "../../utils/axiosinstance";
import { FaCamera, FaChevronDown, FaChevronUp } from "react-icons/fa";

import defaultCoverImg from "../../assets/cities-bg.jpg";
import defaultProfileImg from "../../assets/profile-img.jpg";
import { useBlog } from "../../context/Blog-Context";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";

const Register = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [userImage1, setUserImage1] = useState(null);
  const [userImage2, setUserImage2] = useState(null);
  const [userImage3, setUserImage3] = useState(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    aboutMe: "",
    myStory: "",
    myPerspective: "",
  });
  const [error, setError] = useState(null);

  const { navigate, login } = useBlog();

  const handelSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!profilePicture) return setError("Please add a profile picture");
    if (!coverPicture) return setError("Please add a cover picture");
    if (!userImage1 || !userImage2)
      return setError("Please add a gallery images");
    if (!data.firstName.trim()) return setError("Please enter first name");
    if (!data.lastName.trim()) return setError("Please enter last name");
    if (!data.email || !validator.isEmail(data.email))
      return setError("Please enter a valid email");
    if (!data.password) return setError("Please enter password");
    if (data.password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("aboutMe", data.aboutMe || "");
      formData.append("myStory", data.myStory || "");
      formData.append("myPerspective", data.myPerspective || "");
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profilePic", profilePicture);
      formData.append("coverPic", coverPicture);
      formData.append("userImage1", userImage1);
      formData.append("userImage2", userImage2);

      const response = await axiosInstance.post(
        "/api/user/create-account",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (response.data?.accessToken) {
        login(response.data.user, response.data.accessToken);
        toast.success(
          "Your profile has been created! Start sharing your travel stories now!",
        );
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unexpected error occurred");
      console.log(err);
    }
  };

  console.log(
    data,
    userImage1,
    userImage2,
    userImage3,
    profilePicture,
    coverPicture,
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Banner */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${defaultCoverImg})` }}
      >
        <div className="absolute bottom-10 left-10 text-white backdrop-blur-sm p-6 rounded-md max-w-xs">
          <h1 className="text-4xl font-bold leading-snug">
            Join the Adventure
          </h1>
          <p className="mt-2 text-sm">
            Create an account to start documenting your travels and preserving
            your memories in your personal travel journal.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="fixed top-0 right-0 h-screen w-full lg:w-1/2 bg-white p-8 overflow-y-auto flex flex-col justify-start">
        <form className="space-y-6" onSubmit={handelSignUp}>
          {/* Cover Photo */}
          <div className="relative h-40 rounded-xl overflow-hidden">
            <img
              src={
                coverPicture
                  ? URL.createObjectURL(coverPicture)
                  : defaultCoverImg
              }
              alt="Cover"
              className={`w-full h-full object-cover ${
                !coverPicture ? "opacity-50" : ""
              }`}
            />
            <label
              htmlFor="coverPicture"
              className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded-md cursor-pointer flex items-center gap-2"
            >
              <FaCamera /> Edit Cover
            </label>
            <input
              type="file"
              id="coverPicture"
              hidden
              onChange={(e) => setCoverPicture(e.target.files[0])}
            />
          </div>

          {/* Profile Photo */}
          <div className="relative w-30 h-30 border-3 border-white mx-auto bg-white rounded-full -mt-16">
            <img
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : defaultProfileImg
              }
              alt="Profile"
              className={`w-full h-full rounded-full object-cover object-top ${
                !profilePicture ? "opacity-60" : ""
              }`}
            />
            <label
              htmlFor="profilePicture"
              className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer"
            >
              <FaCamera className="text-sm" />
            </label>
            <input
              type="file"
              id="profilePicture"
              hidden
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>

          {/* Name */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block font-semibold mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={data.firstName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, firstName: e.target.value }))
                }
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block font-semibold mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={data.lastName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="flex-1">
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <PasswordInput
                id="password"
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          </div>

          {/* aboutMe */}
          <div>
            <label htmlFor="aboutMe" className="block font-semibold mb-1">
              About Me
            </label>
            <textarea
              id="aboutMe"
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={data.aboutMe}
              onChange={(e) =>
                setData((prev) => ({ ...prev, aboutMe: e.target.value }))
              }
            />
          </div>

          {/* My Story */}
          <div>
            <label htmlFor="myStory" className="block font-semibold mb-1">
              My Story
            </label>
            <textarea
              id="myStory"
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={data.myStory}
              onChange={(e) =>
                setData((prev) => ({ ...prev, myStory: e.target.value }))
              }
            />
          </div>

          {/* My Story */}
          <div>
            <label htmlFor="myPerspective" className="block font-semibold mb-1">
              My Perspective
            </label>
            <textarea
              id="myPerspective"
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={data.myPerspective}
              onChange={(e) =>
                setData((prev) => ({ ...prev, myPerspective: e.target.value }))
              }
            />
          </div>

          {/* gallery section */}
          <div className="w-[100%] mt-8 mb-10 bg-red400">
            <label className="text-[20px] font-bold">Gallery</label>
            <div className="grid grid-cols-3 gap-2 h-fit mt-3">
              {/* box-1 */}
              <div className="w-full h-full">
                <label
                  htmlFor="userImage1"
                  className="cursor-pointer text-black w-full h-[150px] flex flex-col  items-center justify-center border  border-gray-500/30 "
                >
                  {userImage1 ? (
                    <img
                      src={URL.createObjectURL(userImage1)}
                      alt=""
                      className="w-full h-[150px] object-cover object-top"
                    />
                  ) : (
                    <IoIosAddCircle className="text-[26px] text-sky-300/50 hover:text-sky-300" />
                  )}
                </label>
                <input
                  type="file"
                  hidden
                  id="userImage1"
                  onChange={(e) => {
                    setUserImage1(e.target.files[0]);
                  }}
                />
              </div>

              {/* box-2 */}
              <div className="w-full h-full">
                <label
                  htmlFor="userImage2"
                  className="cursor-pointer text-black w-full h-[150px] flex flex-col  items-center justify-center border border-gray-500/30"
                >
                  {userImage2 ? (
                    <img
                      src={URL.createObjectURL(userImage2)}
                      alt=""
                      className="w-full h-[150px] object-cover object-top"
                    />
                  ) : (
                    <IoIosAddCircle className="text-[26px]  text-sky-300/50 hover:text-sky-300" />
                  )}
                </label>
                <input
                  type="file"
                  hidden
                  id="userImage2"
                  onChange={(e) => {
                    setUserImage2(e.target.files[0]);
                  }}
                />
              </div>

              {/* box-2 */}
              <div className="w-full h-full">
                <label
                  htmlFor="userImage3"
                  className="cursor-pointer text-black w-full h-[150px] flex flex-col  items-center justify-center border border-gray-500/30"
                >
                  {userImage3 ? (
                    <img
                      src={URL.createObjectURL(userImage3)}
                      alt=""
                      className="w-full h-[150px] object-cover object-top"
                    />
                  ) : (
                    <IoIosAddCircle className="text-[26px]  text-sky-300/50 hover:text-sky-300" />
                  )}
                </label>
                <input
                  type="file"
                  hidden
                  id="userImage3"
                  onChange={(e) => {
                    setUserImage3(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="rounded-full mt-3 bg-sky-500 text-white text-[17px] tracking-wide py-3 px-10 font-semibold shadow-md hover:bg-sky-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 self-center"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
