"use client";

import Link from "next/link";
import { IoArrowForward, IoCodeSlash } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const titles = [
    "Fullstack Developer",
    "Graphics Designer",
    "Full Time Father",
    "Ice Cold Canadian",
    "Open Source Advocate",
    "Coffee to Code Converter",
    "Bug Whisperer",
    "Pixel Perfectionist",
    "TypeScript Enthusiast",
    "CEO of ByteBrush Studios",
    "Ctrl+Z Specialist",
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 250);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 relative overflow-hidden bg-bg pt-16"
    >
      {/* Clean background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient glow from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(var(--color-primary-600),0.12)_0%,transparent_65%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Main content */}
      <div className="container-section text-center z-10 max-w-4xl relative">

        {/* Status badge */}
        <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-color-border bg-card text-color-text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
            </span>
            Available for work
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] tracking-tight animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-color-text">Hi, I&apos;m </span>
          <span className="animated-gradient-text">Tyler</span>
        </h1>

        {/* Animated role - clean badge */}
        <div className="flex justify-center mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border border-color-border bg-card min-w-[260px] sm:min-w-[320px] justify-center">
            <IoCodeSlash className="w-4 h-4 text-primary-400 flex-shrink-0" />
            <span
              className={`text-sm sm:text-base font-medium text-color-text-muted transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
            >
              {titles[titleIndex]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-color-text-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          I craft <span className="text-color-text font-medium">beautiful</span> and <span className="text-color-text font-medium">functional</span> web experiences with modern technologies and a passion for pixel-perfect design.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <Link
            href="#projects"
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium text-sm transition-colors duration-200"
          >
            View My Work
            <IoArrowForward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>

          <Link
            href="#contact"
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-color-border bg-card hover:bg-card-alt hover:border-primary-500/30 text-color-text-muted hover:text-color-text font-medium text-sm transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>

        {/* Tech badges */}
        <div
          className="flex flex-wrap justify-center gap-2 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-md border border-color-border bg-card/40 text-color-text-muted hover:text-color-text hover:border-primary-500/30 transition-colors duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-color-text-muted hover:text-primary-400 transition-colors group"
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-color-border to-transparent group-hover:from-primary-500/50 transition-colors" />
        </button>
      </div>
    </section>
  );
}