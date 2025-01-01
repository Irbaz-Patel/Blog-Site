"use client";
import Image from "next/image";
import React from "react";
import Typed from "typed.js";
import Blog from "../app/blog/page";
import Link from "next/link";

export default function Home() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        '<span class="font-bold text-indigo-600 text-2xl"> React 19 </span>',
        '<span class="font-bold text-indigo-600 text-2xl"> Web Development </span>',
        '<span class="font-bold text-indigo-600 text-2xl"> Javascript </span>',
        // '<span class="font-bold text-indigo-600 text-2xl"> React js </span>',
        '<span class="font-bold text-indigo-600 text-2xl"> Web Architecture </span>',
        '<span class="font-bold text-indigo-600 text-2xl"> Next js </span>',
        // '<span class="font-bold text-indigo-600 text-2xl"> tailwind css </span>',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="relative bg-white overflow-hidden mt-7 z-0 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 dark:bg-gray-900">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon
                points="50,0 100,0 50,100 0,100"
                className="fill-white dark:fill-gray-900"
              />
            </svg>
            <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <div className="animate-fade-in-up">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    {/* <span className="block xl:inline">Create beautiful</span>{" "} */}
                    <span className="block text-indigo-600 xl:inline">
                      Welcome to My Blog
                    </span>
                  </h1>
                  {/* <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Dive deep into the latest trends in <span ref={el} /> */}
                    {/* <span ref={el} /> */}
                  {/* </p> */}
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
    Dive deep into the latest trends in{' '}
    <span className="dynamic-line-break" ref={el} />
  </p>
                </div>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start animate-fade-in-up-delayed">
                  <div className="rounded-md shadow">
                    <a
                      href="#latest"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105"
                    >
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right ml-2 h-5 w-5"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/blog"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full animate-fade-in-up-delayed"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Team working on web development"
          />
        </div>
      </div>

      <section className="relative py-16 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 mt-7">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-indigo-600 mb-6">
            Explore Our Blog Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Discover a wide range of topics and expert insights on the latest in
            tech, programming, and web development.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-400 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Tech Tutorials
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Step-by-step guides to mastering the latest web development
                  frameworks and tools.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-400 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Expert Insights
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Articles from industry experts sharing their knowledge and
                  experiences in tech and development.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-400 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Coding Challenges
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Engage with interactive coding challenges and exercises to
                  sharpen your programming skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="latest">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Latest Posts
        </h2>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          <article className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Introduction to Web Development"
              />
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <Link
                    className="hover:underline dark:text-white"
                    href={"/blogpost/react-19-guide"}
                  >
                    React v19  →
                  </Link>
                </p>
                <a
                  className="block mt-2"
                  href="/blog/introduction-to-web-development"
                >
                  <p className="text-xl font-semibold text-gray-900 dark:text-indigo-600">
                    Introduction to v19 Stable
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                  As of September 2024, React 19 is in the Release Candidate (RC) stage. It's feature-complete and ready for testing but not yet recommended for production use.
                  </p>
                </a>
              </div>
              <div className="mt-2 flex items-center">
                <div className="">
                  <div className="flex space-x-1 text-sm dark:text-white">
                    <time dateTime="2024-12-01">Dec 5, 2024</time>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock h-4 w-4 mr-1"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      17 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Mastering JavaScript for Web"
              />
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-white text-indigo-600">
                  <Link
                    className="hover:underline"
                    href="/blogpost/web-javascript"
                  >
                    JavaScript →
                  </Link>
                </p>
                <a
                  className="block mt-2"
                  href="/blog/mastering-javascript-for-web"
                >
                  <p className="text-xl font-semibold text-gray-900 dark:text-indigo-600">
                    Mastering JavaScript for Web
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Deep dive into JavaScript concepts and how they power modern
                    web applications.
                  </p>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <div className="">
                  <div className="flex space-x-1 text-sm dark:text-white">
                    <time dateTime="2024-11-29">Nov 29, 2024</time>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock h-4 w-4 mr-1"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      8 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Building Scalable Web Apps"
              />
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-white text-indigo-600">
                  <Link
                    className="hover:underline"
                    href="/blogpost/web-architecture"
                  >
                    Web Architecture →
                  </Link>
                </p>
                <a
                  className="block mt-2"
                  href="/blog/building-scalable-web-apps"
                >
                  <p className="text-xl font-semibold text-gray-900 dark:text-indigo-600">
                    Building Scalable Web Apps
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    Best practices for building scalable and performant web
                    applications.
                  </p>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <div className="">
                  <div className="flex space-x-1 text-sm dark:text-white">
                    <time dateTime="2024-11-28">Nov 28, 2024</time>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock h-4 w-4 mr-1"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      10 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <footer className="bg-white border-t dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-xl font-bold text-indigo-600">
                IrbazBlog
              </span>
              <p className="mt-4 text-gray-500">
                Exploring the latest in web development, technology, and
                software engineering.
              </p>
              <div className="mt-4 flex space-x-6">
                <a href="https://github.com/Irbaz-Patel" className="text-gray-400 hover:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-github h-6 w-6 dark:text-white"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a href="https://x.com/irbaz_1711" className="text-gray-400 hover:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter h-6 w-6 dark:text-white"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/irbaz-ahmed-p-m-79a450260/" className="text-gray-400 hover:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin h-6 w-6 dark:text-white"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width={4} height={12} x={2} y={9} />
                    <circle cx={4} cy={4} r={2} />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase dark:text-white">
                Navigation
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    href="/blog"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase dark:text-white">
                Categories
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    href="/category/technology"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    href="/blogpost/started-react"
                  >
                    React
                  </Link>
                </li>
                <li>
                  <a
                    className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    href="/blogpost/web-architecture"
                  >
                    Architecture
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center dark:text-white">
              © 2024 DevIrbaz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
