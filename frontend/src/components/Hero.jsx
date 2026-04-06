import React, { useState, useEffect } from "react";
import img1 from "../assets/hero-bg-1.jpg";
import img2 from "../assets/hero-bg-2.jpg";

const slides = [
  {
    title: "Explore the World",
    desc: "Discover breathtaking destinations and hidden gems",
    img: img1,
  },
  {
    title: "Find Your Next Adventure",
    desc: "Plan trips and تجربة unforgettable journeys",
    img: img2,
  },
  {
    title: "Share Your Travel Stories",
    desc: "Inspire others with your experiences around the globe",
    img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  },
  {
    title: "Discover Hidden Places",
    desc: "Go beyond tourist spots and explore like a local",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
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
    <div className="relative h-[90vh] overflow-hidden">
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
            <div className="absolute inset-0 flex flex-col pt-60 items-center justify-center text-center px-4">
              <h1 className="hero-title text-4xl py-4 md:text-[80px] px-30  font-extrabold text-white flex flex-wrap justify-center overflow-hidden">
                {slide.title.split("").map((char, i) => (
                  <span
                    key={i}
                    className={`inline-block transform transition-all duration-500 ${
                      active
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                    style={{ transitionDelay: `${i * 50}ms` }} // stagger letters
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <p
                className={`-mt-2 text-[25px] w-[450px] text-black font-bold transition-all duration-700 ${
                  active
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
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
