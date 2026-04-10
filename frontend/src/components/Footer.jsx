import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Wonder<span className="text-sky-500">Ink</span>
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            A travel journal where stories meet destinations. Discover hidden
            places, unforgettable journeys, and inspiration from around the
            world.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Explore</h4>

          <ul className="space-y-3 text-sm">
            {["Home", "Stories", "Destinations", "Categories", "About"].map(
              (item) => (
                <li
                  key={item}
                  className="hover:text-sky-500 transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Connect</h4>

          <p className="text-sm text-gray-500 mb-4">
            Follow WonderInk for fresh travel stories and inspiration.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full border border-gray-200 hover:bg-sky-50 hover:border-sky-400 transition"
            >
              <FaFacebook className="text-sky-500" size={18} />
            </a>

            <a
              href="#"
              className="p-2 rounded-full border border-gray-200 hover:bg-sky-50 hover:border-sky-400 transition"
            >
              <FaInstagram className="text-sky-500" size={18} />
            </a>

            <a
              href="#"
              className="p-2 rounded-full border border-gray-200 hover:bg-sky-50 hover:border-sky-400 transition"
            >
              <FaTwitter className="text-sky-500" size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} WonderInk. Crafted with stories from around
        the world.
      </div>
    </footer>
  );
};

export default Footer;
