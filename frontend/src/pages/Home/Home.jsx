import React from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import AuthorsSection from "../../components/AuthorsSection";
import CallToActionSection from "../../components/CallToActionSection";
import LatestStory from "../../components/LatestStory";
import Features from "../../components/Features";

const Example = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      {/* 🔍 SEARCH
      <div className="max-w-5xl mx-auto mt-[-30px] px-4">
        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full p-4 rounded-xl shadow-lg border outline-none"
        />
      </div> */}

      <Categories />

      {/* 🧭 CATEGORIES */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex gap-4 flex-wrap">
          {["Beaches", "Mountains", "Cities", "Nature", "Food"].map((cat) => (
            <div
              key={cat}
              className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full cursor-pointer hover:bg-sky-200"
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
      <Features />
      {/* ⭐ FEATURED BLOG */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Story</h2>
        <div className="grid md:grid-cols-2 gap-6 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1493558103817-58b2924bce98"
            alt="featured"
            className="h-full w-full object-cover"
          />
          <div className="p-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold">My Journey Through the Alps</h3>
            <p className="mt-3 text-gray-600">
              تجربه unforgettable moments in the mountains with breathtaking
              views.
            </p>
            <button className="mt-4 w-fit bg-sky-500 text-white px-4 py-2 rounded-lg">
              Read More
            </button>
          </div>
        </div>
      </div>
      {/* 📰 BLOG CARDS */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-semibold mb-6">Latest Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={`https://source.unsplash.com/random/300x200?travel,${item}`}
                alt="blog"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">Beautiful Destination</h3>
                <p className="text-sm text-gray-500 mt-2">
                  A short description of the travel story...
                </p>

                {/* 👤 AUTHOR */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <span>By John</span>
                  <span>❤️ 24</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LatestStory />
      {/* 💬 TESTIMONIALS */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          What Travelers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah",
              text: "This blog helped me discover amazing hidden gems around the world!",
            },
            {
              name: "Michael",
              text: "I love the travel tips and beautiful stories shared here.",
            },
            {
              name: "Anjali",
              text: "A must-visit site for anyone who loves traveling.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-xl shadow text-center"
            >
              <p className="text-gray-600 italic">"{t.text}"</p>
              <h4 className="mt-4 font-semibold text-sky-600">- {t.name}</h4>
            </div>
          ))}
        </div>
      </div>
      {/* 🚀 CALL TO ACTION */}
      <CallToActionSection />
      {/* 📊 STATS */}
      <div className="bg-sky-50 mt-16 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-3 text-center">
          <div>
            <h3 className="text-2xl font-bold text-sky-600">120+</h3>
            <p>Destinations</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-sky-600">500+</h3>
            <p>Stories</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-sky-600">1K+</h3>
            <p>Travelers</p>
          </div>
        </div>
      </div>

      <AuthorsSection />

      {/* 🔻 FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Logo / About */}
          <div>
            <h3 className="text-xl font-bold text-white">TravelBlog</h3>
            <p className="mt-3 text-sm">
              Discover new destinations, read inspiring stories, and share your
              travel experiences with the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Blogs</li>
              <li className="hover:text-white cursor-pointer">Categories</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-4 text-sm">
              <span className="hover:text-white cursor-pointer">Facebook</span>
              <span className="hover:text-white cursor-pointer">Instagram</span>
              <span className="hover:text-white cursor-pointer">Twitter</span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-8 text-gray-500">
          © {new Date().getFullYear()} TravelBlog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Example;
