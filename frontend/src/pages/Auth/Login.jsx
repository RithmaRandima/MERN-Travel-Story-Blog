import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";
import axiosInstance from "../../utils/axiosinstance";
import { FaGoogle } from "react-icons/fa";
import { useBlog } from "../../context/Blog-Context";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { navigate, login } = useBlog();

  const handelLogin = async (e) => {
    e.preventDefault();

    setError(null);

    if (!data.email || !validator.isEmail(data.email)) {
      setError("Please Enter valid Email");
      return;
    }

    if (!data.password) {
      setError("Please Enter the Password");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/user/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data?.accessToken) {
        login(response.data.user, response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unexpected error occurred");
      console.log(error);
    }
  };

  console.log(data);
  return (
    <div className="signin-form min-h-screen relative">
      <div className="container min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-20 mx-auto gap-6">
        {/* Left Section (Hidden on small screens) */}
        <div className="login-bgimg hidden lg:flex w-[600px] h-[90vh] items-end rounded-lg p-10 z-50">
          <div>
            <h4 className="text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-[58px]">
              Capture your <br />
              Journeys
            </h4>
            <p className="text-sm lg:text-[15px] text-white leading-6 pr-0 lg:pr-7 mt-4">
              Record your travel experience and memories in your personal travel
              journal
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full max-w-md lg:w-[420px] backdrop-blur-[8px] pt-10 lg:pt-15 pb-7 h-fit bg-white/10 rounded-[25px] relative p-5">
          <form onSubmit={handelLogin}>
            <div>
              <label className="text-white font-semibold">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="input-box"
                value={data.email}
                onChange={(e) =>
                  setData((data) => ({ ...data, email: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="text-white font-semibold">Password</label>
              <PasswordInput
                value={data.password}
                onChange={(e) =>
                  setData((data) => ({ ...data, password: e.target.value }))
                }
              />
            </div>

            {error && (
              <p className="text-red-500 font-semibold text-xs my-3">{error}</p>
            )}

            <button className="btn-primary mt-7 w-full" type="submit">
              LOGIN
            </button>

            <div className="flex items-center text-white justify-center">
              <hr className="w-[25%]" />
              <p className="text-center my-4 font-bold mx-4">or</p>
              <hr className="w-[25%]" />
            </div>

            <p className="text-white cursor-pointer flex items-center justify-center gap-3 mx-auto">
              <FaGoogle className="text-[22px] lg:text-[25px]" />
              <span className="font-semibold">Login with Google</span>
            </p>

            <p className="text-white tracking-[1px] text-[14px] mt-5 text-center">
              Are You new?{" "}
              <span
                className="underline cursor-pointer font-semibold"
                onClick={() => navigate("/signup")}
              >
                Create an Account
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
