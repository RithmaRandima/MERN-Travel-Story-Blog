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
import Testimonials from "../../components/Testimonials";

const Example = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <Categories />
      <Features />
      <StatsSection />
      <LatestStory />
      <CallToActionSection />
      <Testimonials />
      <AuthorsSection />
      <Footer />
    </div>
  );
};

export default Example;
