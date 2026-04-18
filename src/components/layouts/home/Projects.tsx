"use client";

import Link from "next/link";
import { projects } from "../../../data/projects";
import { IoArrowForward, IoSparkles, IoRocketOutline } from "react-icons/io5";
import ProjectCard from "../../projects/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-color-border to-transparent" />

      <div className="container-section relative">
        <div
          className="text-center md:text-left mb-16 animate-fade-up"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium text-primary-400 border border-color-border bg-card/50 rounded-full animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <IoSparkles className="w-3.5 h-3.5" />
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-400 text-white font-semibold transition-colors duration-150"
          >
            Explore All Projects
            <IoArrowForward className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
