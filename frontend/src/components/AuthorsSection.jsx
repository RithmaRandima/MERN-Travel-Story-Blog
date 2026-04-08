import React from "react";
import { useBlog } from "../context/Blog-Context";
import AuthorCard from "./AuthorCard";

const AuthorsSection = () => {
  const { allAuthors } = useBlog();
  return (
    <div className="min-h-screen w-full ">
      <h1 className="section-heading text-center text-[60px] py-6 font-semibold">
        Meet Best Travelers
      </h1>
      <div className="grid grid-cols-4 w-[85%] mx-auto gap-9 ">
        {allAuthors.slice(0, 4).map((author, i) => {
          return <AuthorCard key={i} author={author} />;
        })}
      </div>
    </div>
  );
};

export default AuthorsSection;
