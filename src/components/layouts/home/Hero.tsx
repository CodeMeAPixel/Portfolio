"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { IoSparkles, IoRocket, IoCodeSlash, IoLayers, IoFlash } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse tracking
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform values for parallax layers
  const parallaxX1 = useTransform(smoothMouseX, [0, 1], [-30, 30]);
  const parallaxY1 = useTransform(smoothMouseY, [0, 1], [-30, 30]);
  const parallaxX2 = useTransform(smoothMouseX, [0, 1], [-50, 50]);
  const parallaxY2 = useTransform(smoothMouseY, [0, 1], [-50, 50]);
  const parallaxX3 = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const parallaxY3 = useTransform(smoothMouseY, [0, 1], [-20, 20]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden bg-bg py-24"
    >
      {/* Multi-layer animated background */}
      <div className="absolute inset-0 z-0">
        {/* Base aurora gradient */}
        <div className="absolute inset-0 bg-aurora opacity-80"></div>

        {/* Animated gradient orbs with parallax */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full morph"
          style={{ x: parallaxX1, y: parallaxY1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-primary-600/20 to-transparent blur-[80px] animate-pulse" />
        </motion.div>

        <motion.div
          className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] rounded-full morph"
          style={{ x: parallaxX2, y: parallaxY2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-primary-400/25 via-primary-500/15 to-transparent blur-[100px]"
            style={{ animationDelay: '2s' }} />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full"
          style={{ x: parallaxX3, y: parallaxY3 }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary-300/20 to-transparent blur-[60px] animate-pulse"
            style={{ animationDelay: '1s' }} />
        </motion.div>

        {/* Spotlight effect following mouse */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            x: useTransform(smoothMouseX, [0, 1], ['-25%', '75%']),
            y: useTransform(smoothMouseY, [0, 1], ['-25%', '75%']),
            background: 'radial-gradient(circle, rgba(var(--color-primary-500), 0.12) 0%, transparent 60%)',
          }}
        />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-[15%] left-[15%] w-3 h-3 rounded-full bg-primary-400/60"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] right-[20%] w-2 h-2 rounded-full bg-primary-300/50"
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-4 h-4 rounded-full bg-primary-500/40"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[15%] w-2 h-2 rounded-full bg-primary-400/50"
        animate={{ y: [0, -18, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Main content */}
      <motion.div
        className="container-section text-center z-10 max-w-5xl relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Premium status badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <span className="relative group">
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 blur-md opacity-50 group-hover:opacity-75 transition-opacity"></span>
            <span className="relative px-5 py-2.5 rounded-full text-sm font-semibold glass-frost flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-primary-400 to-primary-300"></span>
              </span>
              <span className="text-primary-200">Available for work</span>
              <IoSparkles className="w-4 h-4 text-primary-300" />
            </span>
          </span>
        </motion.div>

        {/* Main heading with spectacular gradient */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-color-text block sm:inline">Hi, I&apos;m </span>
          <span className="relative inline-block">
            <span className="animated-gradient-text text-shadow-glow">CodeMeAPixel</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            />
            {/* Decorative sparkle */}
            <motion.span
              className="absolute -top-4 -right-4"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
            >
              <IoSparkles className="w-6 h-6 text-primary-400" />
            </motion.span>
          </span>
        </motion.h1>

        {/* Animated role title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-ultra">
            <IoCodeSlash className="w-6 h-6 text-primary-400" />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 bg-clip-text text-transparent">
              Fullstack Developer
            </span>
            <IoLayers className="w-6 h-6 text-primary-400" />
          </div>
        </motion.div>

        {/* Description with highlighted keywords */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-color-text-muted mb-14 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          I craft{" "}
          <span className="relative inline-block">
            <span className="text-primary-300 font-semibold">beautiful</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400/50 rounded-full"></span>
          </span>{" "}
          and{" "}
          <span className="relative inline-block">
            <span className="text-primary-300 font-semibold">functional</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400/50 rounded-full"></span>
          </span>{" "}
          web experiences with modern technologies and a passion for pixel-perfect design.
        </motion.p>

        {/* CTA Buttons with premium styling */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href="#projects"
            className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden shine-sweep"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-[gradient-x_3s_linear_infinite]"></span>
            <span className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-primary-600 to-primary-500"></span>
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-500 to-primary-400"></span>
            <span className="relative z-10 flex items-center gap-2 text-white">
              <IoRocket className="w-5 h-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition-transform duration-300" />
              View My Work
              <IoFlash className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </span>
          </Link>

          <Link
            href="#contact"
            className="group relative px-8 py-4 rounded-2xl font-bold text-lg glass-frost hover-glow transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 text-primary-300 group-hover:text-primary-200">
              <IoSparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Get in Touch
            </span>
          </Link>
        </motion.div>

        {/* Tech stack with premium glass cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
        >
          {[
            { name: 'React', delay: 0 },
            { name: 'Next.js', delay: 0.1 },
            { name: 'TypeScript', delay: 0.2 },
            { name: 'Node.js', delay: 0.3 },
            { name: 'Tailwind', delay: 0.4 }
          ].map((tech) => (
            <motion.span
              key={tech.name}
              className="group relative px-4 py-2 text-sm font-medium rounded-xl glass-ultra cursor-default overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8 + tech.delay, type: "spring", stiffness: 200 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative text-color-text-muted group-hover:text-primary-300 transition-colors">
                {tech.name}
              </span>
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator with modern design */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 20 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3 cursor-pointer group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs text-color-text-muted/50 tracking-[0.2em] font-medium uppercase group-hover:text-primary-400 transition-colors">
              Scroll
            </span>
            <motion.div
              className="relative w-6 h-10 rounded-full glass-ultra flex justify-center items-start pt-2 group-hover:border-primary-400/30 transition-colors"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-gradient-to-b from-primary-400 to-primary-500"
                animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
