import React, { useState, useEffect } from "react";
import img1 from "../assets/hero-bg-1.jpg";
import img2 from "../assets/hero-bg-2.jpg";
import img3 from "../assets/hero-bg-3.jpg";
import img4 from "../assets/hero-bg-4.jpg";

const slides = [
  {
    title: "Explore the World",
    desc: "Discover breathtaking destinations and hidden gems",
    img: img1,
  },
  {
    title: "Find Your Next Adventure",
    desc: "Plan trips and experience unforgettable journeys",
    img: img2,
  },
  {
    title: "Share Your Travel Stories",
    desc: "Inspire others with your experiences around the globe",
    img: img3,
  },
  {
    title: "Discover Hidden Places",
    desc: "Go beyond tourist spots and explore like a local",
    img: img4,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[55vh] md:h-[90vh] overflow-hidden">
      {slides.map((slide, index) => {
        const active = index === current;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="h-full w-full relative overflow-hidden">
              <img
                src={slide.img}
                alt={slide.title}
                className={`h-full w-full object-cover transform transition-transform duration-1000 ease-in-out ${
                  active ? "translate-x-0" : "-translate-x-full"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/1 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-black/20 to-black"></div>
              <img src="" alt="" />
            </div>

            {/* Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 mt-[190px] md:mt-[270px]">
              {/* Title */}
              <h1 className="hero-title text-[40px] lg:text-7xl font-extrabold text-white flex flex-wrap justify-center overflow-hidden leading-tight pr-4">
                {slide.title.split("").map((char, i) => (
                  <span
                    key={i}
                    className={`inline-block transform transition-all duration-500 ${
                      active
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-6 sm:translate-x-8"
                    }`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p
                className={`mt-1 text-base sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-xl text-black font-semibold transition-all duration-700 ${
                  active
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {slide.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hero;
