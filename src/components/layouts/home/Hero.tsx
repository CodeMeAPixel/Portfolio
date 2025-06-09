import { motion } from "framer-motion";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Occasionally trigger glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 500);
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden bg-bg-alt py-24">
      <div className="absolute inset-0 z-0">
        {/* Enhanced background decoration elements */}
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary-900/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-[15%] w-72 h-72 rounded-full bg-primary-800/10 blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-[80%] w-48 h-48 rounded-full bg-primary-700/5 blur-3xl animate-pulse-slow delay-2000"></div>

        {/* Enhanced glitching pixel grid */}
        <div className={`absolute inset-0 pixel-bg ${glitchActive ? 'glitch-active' : ''}`}>
          <div className="absolute inset-0 pixel-grid-layer-1"></div>
          <div className="absolute inset-0 pixel-grid-layer-2"></div>
          {/* Glitch overlay only appears when glitching */}
          {glitchActive && (
            <>
              <div className="absolute inset-0 glitch-slice-1"></div>
              <div className="absolute inset-0 glitch-slice-2"></div>
              <div className="absolute inset-0 glitch-noise"></div>
            </>
          )}
        </div>
      </div>

      <motion.div
        className="container-section text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-block mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-500/10 text-primary-300 border border-primary-500/20">
            Fullstack Developer
          </span>
        </motion.div>

        <motion.h1
          className="heading-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hi, I&apos;m <span className="text-primary-400 relative">
            CodeMeAPixel
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary-500/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
            {/* Occasional glitch overlay on name */}
            {glitchActive && (
              <span className="absolute inset-0 text-primary-300 glitch-text">CodeMeAPixel</span>
            )}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-color-text-muted mb-10 max-w-2xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          I create beautiful and functional web experiences with modern technologies and a passion for design.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="#projects" className="btn-primary group relative overflow-hidden">
            <span className="relative z-10">View My Work</span>
            <motion.span
              className="absolute inset-0 bg-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          <Link href="#contact" className="btn-secondary">
            Contact Me
          </Link>
        </motion.div>

        {/* Simplified scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-xs text-color-text-muted/80 tracking-wider font-medium uppercase">Scroll</span>
            <IoChevronDown className="w-5 h-5 text-primary-400/90" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
