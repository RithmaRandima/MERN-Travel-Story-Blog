import React from "react";
import { useBlog } from "../context/Blog-Context";
import AuthorCard from "./AuthorCard";

const AuthorsSection = () => {
  const { allAuthors } = useBlog();
  return (
    <div className="min-h-screen w-full bg-red-300">
      <h1>meet Best Travelers</h1>
      <div className="grid grid-cols-4 w-[85%] mx-auto gap-9">
        {allAuthors.map((author, i) => {
          return <AuthorCard key={i} author={author} />;
        })}
      </div>
    </div>
  );
};

export default AuthorsSection;
