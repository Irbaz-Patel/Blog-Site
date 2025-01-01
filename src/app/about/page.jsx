'use client'
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { skills } from '../data/skills';
import { educationTimeline } from '../data/education';
import profileImage from '../profileimage/Profile.png';
import Image from "next/image";
import { useEffect, useState } from "react";


const About = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768); // Adjust the width breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 pt-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
       <div className="max-w-4xl mx-auto text-center mb-16">
      {/* <img
        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&h=200"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-8 object-cover shadow-lg"
      /> */}
      <Image
  src={profileImage}
  alt="Profile"
  className="w-32 h-32 rounded-full mx-auto mb-8 object-cover shadow-lg"
  width={128}  // Set the width for the image
  height={128} // Set the height for the image
/>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-indigo-600">Irbaz Ahmed</h1>
      <p className="text-xl text-gray-600 mb-8 dark:text-white">Software Engineer & Front-End Developer</p>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-6">
        <a href="https://github.com/Irbaz-Patel" className="text-gray-600 hover:text-gray-900 dark:text-indigo-600 dark:hover:text-white">
          <Github className="w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/in/irbaz-ahmed-p-m-79a450260/" className="text-gray-600 hover:text-gray-900 dark:text-indigo-600 dark:hover:text-white">
          <Linkedin className="w-6 h-6" />
        </a>
        <a href="https://x.com/irbaz_1711" className="text-gray-600 hover:text-gray-900 dark:text-indigo-600 dark:hover:text-white">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="mailto:mdirbazsk12@gmail.com" className="text-gray-600 hover:text-gray-900 dark:text-indigo-600 dark:hover:text-white">
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </div>
    {/* <motion.div 
      className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
      Welcome! I share insights on tech and programming, making complex ideas easy to understand. 
  With years of experience, I aim to break down challenging concepts into practical knowledge that anyone can apply. 
  Whether you're a beginner or an experienced developer, my goal is to help you stay up-to-date with the latest trends and tools in the tech world.
      </p>
      <p className="text-gray-600 leading-relaxed">
        This blog serves as a platform to share in-depth tutorials, industry insights, 
        and practical guides that help developers and tech enthusiasts stay ahead in 
        our rapidly evolving digital landscape.
      </p>
    </motion.div> */}
    <motion.div 
      className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-indigo-600">About This Blog</h2>
      <p className="text-gray-600 leading-relaxed mb-6 dark:text-white">
        Welcome to my blog, a space where technology meets creativity. Here, I combine my expertise in development and passion for innovation to share valuable insights and practical knowledge. Whether you're just starting your journey in tech or are an experienced professional, you'll find resources designed to inspire and empower.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6 dark:text-white">
        From detailed tutorials and project breakdowns to thought-provoking industry updates, this blog is built to help developers like you stay informed and sharpen your skills. My goal is to simplify complex concepts and create a platform for continuous learning and growth in the tech world.
      </p>
      <p className="text-gray-600 leading-relaxed dark:text-white">
        Take a look at my timeline to explore my journey in tech, browse through my skills to see how I can contribute to your projects, and feel free to connect to discuss opportunities, ideas, or collaborations.
      </p>
    </motion.div>

    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-indigo-600">
        About Me
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        I am a passionate web developer dedicated to crafting intuitive and dynamic user experiences. 
        My expertise includes working with React, Next.js, and Tailwind CSS to create modern, responsive, 
        and visually appealing applications. Beyond coding, I am an avid learner and love exploring new 
        tools and technologies to stay ahead in the ever-evolving tech landscape.
      </p>
      {/* <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
        When I am not coding, I enjoy blogging about tech, contributing to open-source projects, 
        and participating in hackathons. I aim to continuously improve and make a positive impact 
        through my work.
      </p> */}
    </motion.div>

    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-indigo-600 mb-4">
        My Skills
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white rounded-full text-sm font-medium shadow"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>

    <div className="relative">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-indigo-600">
          Education & Experience Timeline
        </h3>
      </div>

      <div className="relative pl-0 sm:pl-10">
        {educationTimeline.map((item, index) => {
          const Content = (
            <div className="relative mb-10">
              <div className="absolute left-0 w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="ml-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                  {item.year} - {item.title}
                </h4>
                <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                  {item.institution}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
              </div>
            </div>
          );

          return isSmallDevice ? (
            <div key={index}>{Content}</div>
          ) : (
            <motion.div
              key={index}
              className="relative mb-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {Content}
            </motion.div>
          );
        })}
      </div>
    </div>
    <footer
      className='py-3 w-100 text-center'
      style={{ bottom: 0 }}
    >
      <div className="container">
        <p className="mb-0">
          © 2024 Made with ❤️ by <strong>Dev Irbaz</strong>
        </p>
      </div>
    </footer>
    </div>
  )
}
export default About;