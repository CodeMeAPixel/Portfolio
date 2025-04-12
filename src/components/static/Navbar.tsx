"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import MobileThemeMenu from "./MobileThemeMenu";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu, IoClose, IoHomeOutline, IoPersonOutline, IoFolderOutline, IoMailOutline, IoConstructOutline } from "react-icons/io5";
import { CMAP } from "@/components/icons/CMAP";
import { FaStar } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isLoaded } = useTheme();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine which section is in view
      const sections = ["home", "about", "projects", "contact"];
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render theme-dependent parts until client-side theme is loaded
  const renderThemeUI = () => {
    if (!isLoaded) {
      // Return a placeholder with the same dimensions
      return <div className="w-10 h-10" />;
    }

    return (
      <div className="mr-2">
        <MobileThemeMenu />
      </div>
    );
  };

  return (
    <>
      <motion.header
        className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="navbar-container">
          <Link
            href="/"
            className="flex items-center"
          >
            <CMAP className="w-10 h-10 mr-2 text-primary-400 fill-primary-500" />
            <span className="text-xl font-bold gradient-text">
              CodeMeAPixel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#home" className={`navbar-link ${activeSection === "home" ? "navbar-link-active" : ""}`}>
              Home
            </Link>
            <Link href="/#about" className={`navbar-link ${activeSection === "about" ? "navbar-link-active" : ""}`}>
              About
            </Link>
            <Link href="/#projects" className={`navbar-link ${activeSection === "projects" ? "navbar-link-active" : ""}`}>
              Projects
            </Link>
            <Link href="/#contact" className={`navbar-link ${activeSection === "contact" ? "navbar-link-active" : ""}`}>
              Contact
            </Link>

            <div className="ml-4">
              <ThemeSelector />
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            {renderThemeUI()}

            <button
              className="p-2 rounded-md text-color-text-muted hover:text-primary-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <IoMenu className="w-6 h-6" />
              ) : (
                <IoClose className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-card/95 backdrop-blur-xl border-y border-color-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-lg mx-auto py-5 px-4">
                <div className="grid gap-2">
                  <Link
                    href="/#home"
                    className={`block px-4 py-3 rounded-lg ${activeSection === "home"
                      ? "bg-primary-900/30 text-primary-300 border border-primary-700/50"
                      : "text-color-text-muted hover:text-primary-300"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <IoHomeOutline className="w-5 h-5 mr-2" />
                      Home
                    </span>
                  </Link>
                  <Link
                    href="/#about"
                    className={`block px-4 py-3 rounded-lg ${activeSection === "about"
                      ? "bg-primary-900/30 text-primary-300 border border-primary-700/50"
                      : "text-color-text-muted hover:text-primary-300"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <IoPersonOutline className="w-5 h-5 mr-2" />
                      About
                    </span>
                  </Link>
                  <Link
                    href="/#projects"
                    className={`block px-4 py-3 rounded-lg ${activeSection === "projects"
                      ? "bg-primary-900/30 text-primary-300 border border-primary-700/50"
                      : "text-color-text-muted hover:text-primary-300"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <IoFolderOutline className="w-5 h-5 mr-2" />
                      Projects
                    </span>
                  </Link>
                  <Link
                    href="/#contact"
                    className={`block px-4 py-3 rounded-lg ${activeSection === "contact"
                      ? "bg-primary-900/30 text-primary-300 border border-primary-700/50"
                      : "text-color-text-muted hover:text-primary-300"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <IoMailOutline className="w-5 h-5 mr-2" />
                      Contact
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Development Banner - Redesigned to blend with navbar */}
        <div className="relative">
          <motion.div
            className={`w-full ${isScrolled ? 'bg-bg/80 backdrop-blur-xl' : 'bg-transparent'} border-t border-primary-700/20 transition-all duration-300`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                <span className="text-xs text-primary-300 font-medium hidden xs:inline-block">
                  Development Preview
                </span>
                <span className="flex items-center px-1.5 py-0.5 text-[10px] sm:text-xs bg-primary-900/30 border border-primary-700/30 rounded-full text-primary-300">
                  <IoConstructOutline className="w-3 h-3 mr-1 text-primary-400" />
                  <span>Beta - Under Active Development</span>
                </span>
              </div>

              <motion.a
                href="https://github.com/CodeMeAPixel/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                whileHover={{ x: 3 }}
              >
                <span className="hidden sm:inline-flex items-center justify-center"><FaStar className="mr-2" />Star on GitHub</span>
                <span className="inline-flex items-center justify-center sm:hidden"><FaStar className="mr-2" />Star on GitHub</span>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Subtle glow effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
        </div>
      </motion.header>
    </>
  );
}
