"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const BlogCard = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div key={post.title}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
            {post.slug}
          </div>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">{post.date}</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {post.title}
          </h3>
          <p className="text-gray-600">{post.description}</p>
          <button className="mt-4 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200">
            <Link href={`blogpost/${post.slug}`}> Read More →</Link>
          </button>
          <div className="flex mt-4 space-x-1 text-sm dark:text-white">
            <span aria-hidden="true"></span>
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock h-4 w-4 mr-1"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {post.read}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
