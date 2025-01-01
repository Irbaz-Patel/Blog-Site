"use server";
import React from "react";
import fs from "fs";
import matter from "gray-matter";
// import Link from "next/link";
// import { blogPosts } from "../data/blogpost";
import BlogCard from "../blogcard/card";

const dirContent = fs.readdirSync("content");
const blogs = dirContent.map((file) => {
  const fileContent = fs.readFileSync(`content/${file}`);
  const { data } = matter(fileContent);
  // console.log(data)
  return data;
});

const BlogSection = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-indigo-500">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-white">
            Explore our collection of articles covering React, Next.js, AI,
            Node.js, and more. Stay updated with the latest in web development
            and technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* <BlogCard/> */}
          {/* {blogs.map((post) => (
            <BlogCard post={post} key={post.title} />
          ))} */}
          {blogs.slice(0, -1).map((post) => (
            <BlogCard post={post} key={post.title} />
          ))}
        </div>
      </main>
    </>
  );
};

export default BlogSection;
