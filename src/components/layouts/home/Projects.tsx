"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { IoArrowForward, IoSparkles, IoRocketOutline } from "react-icons/io5";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-aurora opacity-30"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

        {/* Floating orbs */}
        <div
          className="absolute top-[30%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-primary-500/15 to-transparent blur-[100px] animate-pulse"
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-tl from-primary-400/20 to-transparent blur-[80px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

      <div className="container-section relative">
        <div
          className="text-center md:text-left mb-16 animate-fade-up"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-primary-300 glass-frost rounded-full animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <IoSparkles className="w-4 h-4" />
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-color-text">Featured </span>
            <span className="animated-gradient-text">Projects</span>
          </h2>
          <p className="text-color-text-muted text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
            A selection of projects I&apos;ve worked on recently
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              showFeaturedBadge={true}
            />
          ))}
        </div>

        {/* View all projects button */}
        <div
          className="flex justify-center mt-16 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            href="/projects"
            className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden"
          >
            <span className="absolute inset-0 glass-frost border border-white/10"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative z-10 flex items-center gap-3 text-primary-300 group-hover:text-primary-200 transition-colors">
              <IoRocketOutline className="w-5 h-5" />
              Explore All Projects
              <IoArrowForward className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
