"use client";

import Link from "next/link";
import { IoSparkles, IoRocket, IoCodeSlash, IoLayers, IoFlash } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        {/* Animated gradient orbs with CSS animations */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full morph hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-primary-600/20 to-transparent blur-[80px] animate-pulse" />
        </div>

        <div className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] rounded-full morph hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-tl from-primary-400/25 via-primary-500/15 to-transparent blur-[100px] animate-pulse"
            style={{ animationDelay: '2s' }} />
        </div>

        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full hidden md:block">
          <div className="absolute inset-0 bg-gradient-radial from-primary-300/20 to-transparent blur-[60px] animate-pulse"
            style={{ animationDelay: '1s' }} />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      {/* Floating decorative elements */}
      <div
        className="absolute top-[15%] left-[15%] w-3 h-3 rounded-full bg-primary-400/60 animate-float"
      />
      <div
        className="absolute top-[25%] right-[20%] w-2 h-2 rounded-full bg-primary-300/50 animate-float"
        style={{ animationDelay: '0.5s' }}
      />
      <div
        className="absolute bottom-[30%] left-[10%] w-4 h-4 rounded-full bg-primary-500/40 animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-[20%] right-[15%] w-2 h-2 rounded-full bg-primary-400/50 animate-float"
        style={{ animationDelay: '1.5s' }}
      />

      {/* Main content */}
      <div
        className="container-section text-center z-10 max-w-5xl relative animate-fade-in"
      >
        {/* Premium status badge */}
        <div
          className="inline-flex items-center gap-2 mb-10 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
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
        </div>

        {/* Main heading with spectacular gradient */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="text-color-text block sm:inline">Hi, I&apos;m </span>
          <span className="relative inline-block">
            <span className="animated-gradient-text text-shadow-glow">CodeMeAPixel</span>
            <span
              className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 rounded-full w-full animate-fade-in"
              style={{ animationDelay: '1.2s' }}
            />
            {/* Decorative sparkle */}
            <span
              className="absolute -top-4 -right-4 animate-fade-in"
              style={{ animationDelay: '1.5s' }}
            >
              <IoSparkles className="w-6 h-6 text-primary-400" />
            </span>
          </span>
        </h1>

        {/* Animated role title */}
        <div
          className="mb-8 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-ultra">
            <IoCodeSlash className="w-6 h-6 text-primary-400" />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 bg-clip-text text-transparent">
              Fullstack Developer
            </span>
            <IoLayers className="w-6 h-6 text-primary-400" />
          </div>
        </div>

        {/* Description with highlighted keywords */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-color-text-muted mb-14 max-w-3xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.5s' }}
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
        </p>

        {/* CTA Buttons with premium styling */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
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
        </div>

        {/* Tech stack with premium glass cards */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-20 animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          {[
            { name: 'React', delay: 0 },
            { name: 'Next.js', delay: 0.1 },
            { name: 'TypeScript', delay: 0.2 },
            { name: 'Node.js', delay: 0.3 },
            { name: 'Tailwind', delay: 0.4 }
          ].map((tech) => (
            <span
              key={tech.name}
              className="group relative px-4 py-2 text-sm font-medium rounded-xl glass-ultra cursor-default overflow-hidden hover:-translate-y-1 hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${0.8 + tech.delay}s` }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative text-color-text-muted group-hover:text-primary-300 transition-colors">
                {tech.name}
              </span>
            </span>
          ))}
        </div>

        {/* Scroll indicator with modern design */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-400 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
        >
          <div
            className="flex flex-col items-center gap-3 cursor-pointer group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs text-color-text-muted/50 tracking-[0.2em] font-medium uppercase group-hover:text-primary-400 transition-colors">
              Scroll
            </span>
            <div
              className="relative w-6 h-10 rounded-full glass-ultra flex justify-center items-start pt-2 group-hover:border-primary-400/30 transition-colors animate-bounce"
            >
              <div
                className="w-1 h-2 rounded-full bg-gradient-to-b from-primary-400 to-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
