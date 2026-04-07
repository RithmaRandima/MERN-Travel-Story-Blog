import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";
import axiosInstance from "../../utils/axiosinstance";
import { IoIosAddCircle } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

import defaultCoverImg from "../../assets/cities-bg.jpg";
import defaultProfileImg from "../../assets/profile-img.jpg";
import { useBlog } from "../../context/Blog-Context";

const Register = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [error, setError] = useState(null);

  const { user, token, navigate, login } = useBlog();

  // handelSingup Function
  const handelSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!profilePicture) {
      setError("Please Add Profile Picture");
      return;
    }

    if (!coverPicture) {
      setError("Please Add Cover Picture");
      return;
    }

    if (!data.lastName.trim()) {
      setError("Please Enter Last Name");
      return;
    }
    if (!data.email || !validator.isEmail(data.email)) {
      setError("Please Enter valid Email");
      return;
    }
    if (!data.password) {
      setError("Please Enter the Password");
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("bio", data.bio || "");
      formData.append("email", data.email);
      formData.append("password", data.password);

      // Append files if they exist
      if (profilePicture) formData.append("profilePic", profilePicture);
      if (coverPicture) formData.append("coverPic", coverPicture);

      // Axios request with multipart/form-data
      const response = await axiosInstance.post(
        "/api/user/create-account",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Handle success
      if (response.data?.accessToken) {
        login(response.data.user, response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unexpected error occurred");
      console.log(error);
    }
  };

  console.log(user, token);
  return (
    <div className="h-screen relative">
      <div className="signup-form container h-screen flex items-center justify-center mx-auto">
        {/* left */}
        <div className=" w-[clac(100vw-600px)] h-full flex items-end rounded-lg p-10 z-50 ">
          <div className="w-[600px]"></div>
        </div>

        {/* right */}
        <div className="w-[800px] h-[100vh] bg-white relative py-4 p-6  overflow-y-scroll">
          <form onSubmit={handelSignUp}>
            {/* img section */}
            <div className="">
              {/* cover photo */}
              <div className="relative w-[100%] mx-auto h-[150px] rounded-[30px] bg-red-20">
                {coverPicture ? (
                  <img
                    src={URL.createObjectURL(coverPicture)}
                    alt=""
                    className="w-full h-full object-cover rounded-xl object-center"
                  />
                ) : (
                  <img
                    src={defaultCoverImg}
                    alt="default Cover"
                    className="w-full h-full object-cover rounded-xl object-center opacity-50"
                  />
                )}

                <label
                  htmlFor="coverPicture"
                  className="absolute w-fit h-fit  bottom-2 right-2  cursor-pointer bg-white text-black flex  items-center justify-center rounded-full py-1 px-4 gap-3"
                >
                  <FaCamera />
                  <p>Edit Cover Photo</p>
                </label>
                <input
                  type="file"
                  hidden
                  id="coverPicture"
                  onChange={(e) => {
                    setCoverPicture(e.target.files[0]);
                  }}
                />
              </div>

              {/* profile photo */}
              <div className="relative w-[120px] mx-auto h-[120px] -mt-15 rounded-full border-3 border-white bg-white">
                {profilePicture ? (
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt=""
                    className="w-full h-full object-cover rounded-full object-top"
                  />
                ) : (
                  <img
                    src={defaultProfileImg}
                    alt="Default Profile Image"
                    className="w-full h-full object-cover rounded-full object-top opacity-50"
                  />
                )}

                <label
                  htmlFor="profilePicture"
                  className="absolute text-white border-1 bottom-2 -right-2  cursor-pointer bg-black h-9 w-9 flex  items-center justify-center rounded-full gap-3"
                >
                  <FaCamera className="text-[15px]" />
                </label>
                <input
                  type="file"
                  hidden
                  id="profilePicture"
                  onChange={(e) => {
                    setProfilePicture(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            {/* name section */}
            <div className="w-full flex items-center gap-5 mt-3">
              {/* First Name */}
              <div className="">
                <label className="font-semibold">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="register-input-box"
                  value={data.firstName}
                  onChange={(e) => {
                    setData((data) => ({ ...data, firstName: e.target.value }));
                  }}
                />
              </div>

              {/* Last Name */}
              <div className="">
                <label className="font-semibold">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="register-input-box"
                  value={data.lastName}
                  onChange={(e) => {
                    setData((data) => ({ ...data, lastName: e.target.value }));
                  }}
                />
              </div>
            </div>

            {/* Email and Password */}
            <div className="w-full flex items-center gap-5 ">
              {/* Email */}
              <div className="w-full">
                <label className="font-semibold">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="register-input-box"
                  value={data.email}
                  onChange={(e) => {
                    setData((data) => ({ ...data, email: e.target.value }));
                  }}
                />
              </div>
              {/* Password */}
              <div className=" w-full">
                <label className="font-semibold">Password</label>
                <PasswordInput
                  value={data.password}
                  onChange={(e) => {
                    setData((data) => ({ ...data, password: e.target.value }));
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="font-semibold">Bio</label>
              <textarea
                type="text"
                rows={3}
                placeholder="Content here"
                className="register-input-box"
                value={data.bio}
                onChange={(e) => {
                  setData((data) => ({ ...data, bio: e.target.value }));
                }}
              />
            </div>
            {error && (
              <p className="absolute top-50 right-5 text-red-500 font-semibold text-[12px] my-3">
                {error}
              </p>
            )}
            <button className="btn-primary" type="submit">
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
      {/* text section */}
      <div className="absolute bottom-7 left-7 backdrop-blur-[3px] w-[500px] border-2 border-white p-7 ">
        <h4 className="text-5xl text-white font-bold leading-[58px] tracking-[5px]">
          Join the <br />
          Adventure
        </h4>
        <p className="text-[15px] text-white leading-6 pr-7 mt-4">
          Create an account to start documenting your travels and preseving your
          memories in your personal travel journal. journal
        </p>
      </div>

      {/* box */}
    </div>
  );
};

export default Register;
