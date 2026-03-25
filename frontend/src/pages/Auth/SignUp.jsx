import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import validator from "validator";
import axiosInstance from "../../utils/axiosinstance";

const SignUp = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // handelSingup Function
  const handelSignUp = async (e) => {
    e.preventDefault();

    setError(null);

    if (!data.fullName.trim()) {
      setError("Please Enter Name");
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
      const response = await axiosInstance.post("/api/user/create-account", {
        fullName: data.name,
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
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 " />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/3" />
      <div className="login-ui-box bg-cyan-300 top-10 left-17" />

      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="signup-bg-img w-2/4 h-[90vh] flex items-end rounded-lg p-10 z-50 ">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Join the <br />
              Adventure
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Create an account to start documenting your travels and preseving
              your memories in your personal travel journal. journal
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/50">
          <form onSubmit={handelSignUp}>
            <h4 className="text-2xl font-semibold mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={data.fullName}
              onChange={(e) => {
                setData((data) => ({ ...data, fullName: e.target.value }));
              }}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={data.email}
              onChange={(e) => {
                setData((data) => ({ ...data, email: e.target.value }));
              }}
            />
            <PasswordInput
              value={data.password}
              onChange={(e) => {
                setData((data) => ({ ...data, password: e.target.value }));
              }}
            />

            {error && (
              <p className="text-red-500 font-semibold text-[12px] my-3">
                {error}
              </p>
            )}
            <button className="btn-primary" type="submit">
              CREATE ACCOUNT
            </button>
            <p className="text-center font-bold my-4 uppercase ">or</p>
            <button
              type="button"
              className="btn-primary btn-light"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
