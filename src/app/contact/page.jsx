'use client'
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    });
  
      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        setIsSubmitting(false);
        setErrorMessage('');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    // <section className="py-16 bg-gray-100 dark:bg-gray-900">
    //   <div className="container mx-auto px-4">
    //     <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Contact Me</h2>

    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //       <div>
    //         <h3 className="text-xl font-semibold mb-4 text-indigo-600">Get in Touch</h3>
    //         <p className="mb-6 text-gray-700 dark:text-white">
    //           Feel free to reach out for inquiries, collaborations, or just to say hello.
    //         </p>

    //         {/* <div className="flex items-center mb-4">
    //           <FaMapMarkerAlt className="text-2xl text-gray-700 mr-2" />
    //           <p>Your Address Here</p>
    //         </div> */}

    //         <div className="flex items-center mb-4">
    //           <FaPhone className="text-2xl mr-2 text-indigo-600" />
    //           <p className='text-gray-700 dark:text-white'>+1 (123) 456-7890</p>
    //         </div>

    //         <div className="flex items-center">
    //           <FaEnvelope className="text-2xl text-indigo-600 mr-2" />
    //           <p className='text-gray-700 dark:text-white'>your.email@example.com</p>
    //         </div>
    //       </div>

    //       <div>
    //         <h3 className="text-xl font-semibold mb-4 text-indigo-600">Send a Message</h3>
    //         {successMessage && (
    //           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
    //             {successMessage}
    //           </div>
    //         )}
    //         {errorMessage && (
    //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    //             {errorMessage}
    //           </div>
    //         )}
    //         <form onSubmit={handleSubmit}>
    //           <div className="mb-4">
    //             <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
    //               Name
    //             </label>
    //             <input
    //               type="text"
    //               id="name"
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //               className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-black"
    //               required
    //             />
    //           </div>

    //           <div className="mb-4">
    //             <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
    //               Email
    //             </label>
    //             <input
    //               type="email"
    //               id="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-black"
    //               required
    //             />
    //           </div>

    //           <div className="mb-4">
    //             <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white">
    //               Message
    //             </label>
    //             <textarea
    //               id="message"
    //               rows="4"
    //               value={message}
    //               onChange={(e) => setMessage(e.target.value)}
    //               className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-black"
    //               required
    //             ></textarea>
    //           </div>

    //           <button
    //             type="submit"
    //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //           >
    //             Send Message
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="py-16 bg-gradient-to-b from-background to-muted">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="text-center mb-12 hidden sm:block">
      <h2 className="text-4xl font-bold tracking-tight mb-4 text-primary dark:text-indigo-600">
        Contact Me
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-[-2rem] sm:mt-0">
      <div className="p-6 h-full">
        <div className="space-y-8 pt-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight dark:text-indigo-600">
              Get in Touch
            </h3>
            <p className="text-muted-foreground">
              Feel free to reach out for inquiries, collaborations, or just to say hello.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <FaPhone className="h-6 w-6 text-primary dark:text-indigo-600" />
              </div>
              <div>
                <p className="font-medium dark:text-indigo-600">Phone</p>
                <p className="text-muted-foreground">+91 8428199620</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <FaEnvelope className="h-6 w-6 text-primary dark:text-indigo-600" />
              </div>
              <div>
                <p className="font-medium dark:text-indigo-600">Email</p>
                <p className="text-muted-foreground">irbazahmed1711@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight dark:text-indigo-600">
              Send a Message
            </h3>
            <p className="text-muted-foreground">
              Fill out the form below and I'll get back to you shortly
            </p>
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium dark:text-indigo-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-black"
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium dark:text-indigo-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-black"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium dark:text-indigo-600">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-black"
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}

export default Contact;

