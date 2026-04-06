import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="flex items-center bg-white mt-2 border border-slate-300/50 px-5 rounded mb-5">
      <input
        type={isShowPassword ? "password" : "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded- outline-none"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-black cursor-pointer"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
