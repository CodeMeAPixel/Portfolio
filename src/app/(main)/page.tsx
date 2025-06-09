"use client";

import Hero from "@/components/layouts/home/Hero";
import About from "@/components/layouts/home/About";
import Projects from "@/components/layouts/home/Projects";
import Contact from "@/components/layouts/home/Contact";

export default function Home() {
  return (
    <div className="min-h-screen pixel-bg">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
