"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import MobileThemeMenu from "./MobileThemeMenu";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import { CMAP } from "@/components/icons/CMAP";
import { FaStar } from "react-icons/fa";
import { usePathname } from "next/navigation";
import packageJson from "@/../package.json";
import { IoHomeOutline, IoPersonOutline, IoNewspaperOutline, IoCodeSlashOutline, IoFolderOutline, IoStarOutline, IoMailOutline, IoFlashOutline } from "react-icons/io5";

const navLinks = [
  { href: "/", label: "Home", icon: IoHomeOutline },
  { href: "/about", label: "About", icon: IoPersonOutline },
  { href: "/blog", label: "Blog", icon: IoNewspaperOutline },
  { href: "/skills", label: "Skills", icon: IoCodeSlashOutline },
  { href: "/projects", label: "Projects", icon: IoFolderOutline },
  { href: "/referrals", label: "Referrals", icon: IoStarOutline },
  { href: "/just-ask", label: "Just Ask", icon: IoFlashOutline },
  { href: "/contact", label: "Contact", icon: IoMailOutline }
];

interface LinkComponentProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

export function LinkComponent({
  href,
  className,
  children,
  ...rest
}: LinkComponentProps) {
  const pathname = usePathname();
  const isActive = pathname === href ||
    (pathname === "/" && href.startsWith("/#")) ||
    (pathname?.startsWith("/blog") && href === "/blog");

  return href.startsWith("/#") || href.startsWith("http") ? (
    <a
      href={href}
      className={`${className} ${isActive ? "navbar-link-active" : ""}`}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <Link
      href={href}
      className={`${className} ${isActive ? "navbar-link-active" : ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoaded } = useTheme();
  const pathname = usePathname();

  const { scrollY } = useScroll();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Track scroll position for background styling (no hiding)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Sleek glassmorphism background */}
        <div className={`absolute inset-0 transition-all duration-300 ${isScrolled
          ? "bg-bg/70 backdrop-blur-2xl border-b border-white/5"
          : "bg-gradient-to-b from-bg/50 to-transparent backdrop-blur-sm"
          }`}>
          {/* Subtle gradient line at bottom when scrolled */}
          {isScrolled && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
          )}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Compact */}
            <Link href="/" className="flex items-center group relative z-10">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CMAP className="relative w-8 h-8 text-primary-400 fill-primary-500 group-hover:text-primary-300 transition-colors duration-300" />
              </motion.div>
              <span className="ml-2 text-lg font-bold text-color-text group-hover:text-primary-300 transition-colors hidden sm:block">
                CodeMeAPixel
              </span>
            </Link>

            {/* Desktop Navigation - Sleek Centered Pills */}
            <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-0.5 px-1 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/5">
                {navLinks.map(({ href, label }) => {
                  const isActive = pathname === href || (pathname?.startsWith(href) && href !== '/');
                  return (
                    <motion.div key={href} className="relative">
                      <LinkComponent
                        href={href}
                        className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${isActive
                          ? "text-white"
                          : "text-color-text-muted hover:text-color-text"
                          }`}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full"
                            layoutId="navbar-pill"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </LinkComponent>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Right side - Theme + GitHub */}
            <div className="hidden lg:flex items-center gap-3 relative z-10">
              <motion.a
                href="https://github.com/CodeMeAPixel/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-color-text-muted hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <FaStar className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Star</span>
              </motion.a>
              <div className="w-px h-4 bg-white/10"></div>
              <ThemeSelector />
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center lg:hidden gap-2 relative z-10">
              {renderThemeUI()}

              <motion.button
                className={`relative p-2 rounded-lg transition-all duration-300 ${isMenuOpen
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-color-text-muted hover:text-primary-400 hover:bg-white/10'
                  }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {!isMenuOpen ? (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <IoMenu className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <IoClose className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Compact Slide */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                style={{ zIndex: 998 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Panel - Sleek */}
              <motion.div
                className="fixed top-16 left-3 right-3 lg:hidden bg-bg/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                style={{ zIndex: 999, maxHeight: 'calc(100vh - 80px)' }}
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Menu Header with Close Button */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="text-sm font-medium text-text-muted">Menu</span>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-muted hover:text-primary-400 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IoClose className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="py-2 px-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                  <div className="grid gap-0.5">
                    {navLinks.map(({ href, label, icon: Icon }, index) => {
                      const isActive = pathname === href || (pathname?.startsWith(href) && href !== '/');
                      return (
                        <motion.div
                          key={href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <LinkComponent
                            href={href}
                            className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
                              ? "text-white bg-gradient-to-r from-primary-600 to-primary-500"
                              : "text-color-text-muted hover:text-color-text hover:bg-white/5"
                              }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {Icon && (
                              <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-white' : 'text-primary-400'}`} />
                            )}
                            <span className="text-sm font-medium">{label}</span>
                            {isActive && (
                              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
                            )}
                          </LinkComponent>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Compact footer */}
                <div className="px-3 py-2.5 border-t border-white/5 bg-white/[0.02]">
                  <div className="flex items-center justify-between text-[10px] text-color-text-muted">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span>v{packageJson.version}</span>
                    </div>
                    <a
                      href="https://github.com/CodeMeAPixel/Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <FaStar className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
}
