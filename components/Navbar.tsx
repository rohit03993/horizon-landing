"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-black border-b border-gray-800"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="hover:opacity-90 transition-opacity"
            >
              <Logo showText={true} />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#home"
              className="text-white hover:text-yellow-400 font-bold transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#contact"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-lg font-black transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Admissions
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-gray-900 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-black",
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-2 pt-2 pb-4 space-y-2 border-t border-gray-800 mt-2">
            <a
              href="#home"
              className="block px-4 py-3 rounded-lg text-white hover:bg-yellow-400 hover:text-black transition-colors font-bold"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#contact"
              className="block px-4 py-3 rounded-lg bg-yellow-400 text-black text-center font-black shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Admissions
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
