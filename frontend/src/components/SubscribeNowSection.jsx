import React from "react";
import background from "../assets/CTA-Bg.jpg";
import { useBlog } from "../context/Blog-Context";

const SubscribeNowSection = () => {
  const { navigate } = useBlog();
  return (
    <div className="relative overflow-hidden h-fit text-center mt-6 flex w-full max-w-220 mx-auto ">
      {/* info section */}
      <div className="w-full">
        <h2 className=" text-5xl font-extrabold mb-8">Subscribe Now.</h2>
        <p className="mt-1 text-[17px] tracking-[2px]">
          Subscribe to our newsletter get exclusive travel stories from around
          the world, updates and be first to know about our travel deals and
          offers.
        </p>
        <div className="flex items-center gap-5 mt-10 ">
          <input
            type="text"
            className=" px-6 py-3 rounded-[8px] w-full font-semibold bg-white shadow-xl"
          />
          <button
            onClick={() => navigate("/signup")}
            className="bg-transparent w-[200px]  px-6 py-3 rounded-[8px] border-2 font-semibold hover:bg-black hover:text-white cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNowSection;
