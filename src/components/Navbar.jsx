"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import ModeToggle from "./theme-btn";
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/50 sticky top-0 backdrop-blur border-b z-10 text-foreground">
      <div className="max-w-7xl sm:mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-indigo-600">IrbazBlog</h1>
          </div>

          {/* Right Side: Links and Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
            >
              Contact
            </Link>
            <Button className="mx-1" variant="outline">
              Login
            </Button>
            <Button className="mx-1" variant="outline">
              Signup
            </Button>
            <ModeToggle/>
          </div>

          <div className="md:hidden flex gap-2">
            <Sheet>
            <ModeToggle/>
              <SheetTrigger>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  {/* <SheetTitle className='text-left'>IrbazBlog</SheetTitle> */}
                  <SheetDescription>
                    <div className="flex items-center gap-6 flex-col mt-8">
                      {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"> */}
                      <Link
                        href="/"
                        className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
                      >
                        Home
                      </Link>
                      <Link
                        href="/about"
                        className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
                      >
                        About
                      </Link>
                      <Link
                        href="/blog"
                        className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
                      >
                        Blog
                      </Link>
                      <Link
                        href="/contact"
                        className="font-medium transform transition duration-200 hover:scale-110 hover:font-bold"
                      >
                        Contact
                      </Link>
                      <div>
                        <Button className="mx-1 text-xs" variant="outline">
                          Login
                        </Button>
                        <Button className="mx-1 text-xs" variant="outline">
                          Signup
                        </Button>
                      </div>
                      {/* </div> */}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
