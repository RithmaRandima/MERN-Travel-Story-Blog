import React from "react";

const Testimonials = () => {
  return (
    <div className="my-30">
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
    </div>
  );
};

export default Testimonials;
