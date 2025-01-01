"use client";

import { useEffect, useState } from "react";

const OnThisPage = ({ htmlcontent }) => {
  const [headings, setHeadings] = useState([]);
  // console.log(htmlcontent)
  useEffect(() => {
    const div = document.createElement("div");
    div.innerHTML = htmlcontent;
    // console.log(div)
    const h2Elements = div.querySelectorAll("h2");
    // console.log(h2Elements)
    const topics = Array.from(h2Elements).map(h2 => ({
      text: h2.textContent,
      id: h2.id
    }));
    // console.log(topics)
    setHeadings(topics);
  }, [htmlcontent]);
  return (
    <>
    <div className="container mx-auto px-4 py-8 hidden md:block">
      <h4 className="lg:text-3xl md:text-2xl font-medium mb-6 text-left">
        on this page
      </h4>
      <ul className="grid grid-cols-1 gap-4">
        {headings.map((heading, index) => (
          <li
            key={index}
            // className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
          >
            {/* <h2 className="text-lg font-medium text-gray-800 text-center"> */}
              <a href={`#${heading.id}`}>{heading.text}</a>
            {/* </h2> */}
          </li>
        ))}
      </ul>
    </div>

    <div className="md:hidden fixed top-4 left-4 right-4 z-10 mt-12 bg-white dark:bg-gray-900 shadow-md p-2 rounded-lg">
    {/* <label htmlFor="headings-dropdown" className="block text-lg font-medium mb-2">
      On This Page
    </label> */}
    <select
      id="headings-dropdown"
      className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-900"
      onChange={(e) => {
        window.location.href = e.target.value;
      }}
    >
      <option value="">On This Page</option>
      {headings.map((heading, index) => (
        <option key={index} value={`#${heading.id}`}>
          {heading.text}
        </option>
      ))}
    </select>
  </div>
    </>
  );
};

export default OnThisPage;
