import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
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
            <div className="flex gap-4 text-sky-600">
              <FaFacebook
                size={20}
                className="cursor-pointer hover:text-sky-800"
              />
              <FaInstagram
                size={20}
                className="cursor-pointer hover:text-pink-500"
              />
              <FaTwitter
                size={20}
                className="cursor-pointer hover:text-blue-400"
              />
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

export default Footer;
