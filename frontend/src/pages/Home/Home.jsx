import React from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import AuthorsSection from "../../components/AuthorsSection";
import CallToActionSection from "../../components/CallToActionSection";
import LatestStory from "../../components/LatestStory";
import Features from "../../components/Features";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import StatsSection from "../../components/StatsSection";
import Footer from "../../components/Footer";

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
      {/* Stats Section */}
      <Features />
      <StatsSection />
      <LatestStory />
      <CallToActionSection />

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
      <AuthorsSection />

      <Footer />
    </div>
  );
};

export default Example;
