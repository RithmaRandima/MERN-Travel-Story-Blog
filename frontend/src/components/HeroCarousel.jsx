import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Explore the World 🌍",
    desc: "Discover breathtaking destinations and hidden gems",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Find Your Next Adventure ✈️",
    desc: "Plan trips and تجربة unforgettable journeys",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    title: "Share Your Travel Stories 📖",
    desc: "Inspire others with your experiences around the globe",
    img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  },
  {
    title: "Discover Hidden Places 🗺️",
    desc: "Go beyond tourist spots and explore like a local",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          {/* Image with left-to-right slide */}
          <div className="h-full overflow-hidden relative">
            <img
              src={slide.img}
              alt={slide.title}
              className={`h-full w-full object-cover transform transition-transform duration-1000 ease-in-out ${
                index === current ? "translate-x-0" : "-translate-x-full"
              }`}
            />
            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
          </div>

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1
              className={`text-4xl md:text-5xl font-bold text-white transition-all duration-700 ${
                index === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {slide.title}
            </h1>

            <p
              className={`text-white mt-4 transition-all duration-700 ${
                index === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {slide.desc}
            </p>

            <button
              className={`mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-all duration-700 ${
                index === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              Explore Now
            </button>
          </div>
        </div>
      ))}

      {/* Dots navigation */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
