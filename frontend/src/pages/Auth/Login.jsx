import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";
import axiosInstance from "../../utils/axiosinstance";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unexpected error occurred");
      console.log(error);
    }
  };

  console.log(data);
  return (
    <div className="signin-form h-screen overflow-hidden relative">
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="login-bgimg w-[600px] h-[90vh] flex items-end rounded-lg p-10 z-50 ">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Capture your <br />
              Journeys
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Record your travel experience and memories in your personal travel
              journal
            </p>
          </div>
        </div>

        <div className="w-[420px] backdrop-blur-[8px] pt-15 pb-7 h-fit bg-white/10 rounded-[25px] relative p-5 ">
          <form onSubmit={handelLogin}>
            <div>
              <label className="text-white font-semibold ">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="input-box"
                value={data.email}
                onChange={(e) => {
                  setData((data) => ({ ...data, email: e.target.value }));
                }}
              />
            </div>
            <div>
              <label className="text-white font-semibold ">Password</label>
              <PasswordInput
                value={data.password}
                onChange={(e) => {
                  setData((data) => ({ ...data, password: e.target.value }));
                }}
              />
            </div>

            {error && (
              <p className="absolute right-6 top-57 text-red-500 font-semibold text-[12px] my-3">
                {error}
              </p>
            )}

            <button className="btn-primary mt-7" type="submit">
              LOGIN
            </button>

            <div className="flex items-center text-white justify-center">
              <hr className="w-[25%]" />
              <p className="text-center  my-4 font-bold mx-4 ">or</p>
              <hr className="w-[25%] " />
            </div>

            <p
              className=" text-white  cursor-pointer flex items-center justify-center gap-3 mx-auto"
              type="submit"
            >
              <FaGoogle className="font-extrabold text-[25px]" />
              <span className="font-semibold">Login with Google</span>
            </p>

            <p className=" text-white tracking-[1px] mt-5 text-center">
              Are You new?{" "}
              <span
                className="underline cursor-pointer"
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
