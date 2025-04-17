import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { IoArrowForward } from "react-icons/io5";
import { useState } from "react";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-bg-alt relative z-10">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="heading-primary text-center md:text-left mb-2">
            Featured Projects
          </h2>
          <p className="text-color-text-muted text-center md:text-left">
            Some of my recent work that I'm proud of
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onTouchStart={() => setHoveredProject(project.id)}
            >
              <div className="relative h-full overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 group hover:shadow-lg hover:shadow-primary-900/10">
                {/* Top gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity z-10"></div>

                <div className="overflow-hidden">
                  {/* Image carousel - with responsive height */}
                  <div className="h-56 sm:h-64 md:h-72 relative overflow-hidden border-b border-color-border">
                    <ImageCarousel
                      images={project.images}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80 pointer-events-none"></div>
                  </div>
                </div>

                {/* Content section with improved padding for mobile */}
                <div className="p-5 sm:p-7 relative">
                  {/* Tags with better mobile spacing */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-[10px] sm:text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="tag bg-primary-900/30 border-primary-700/30 text-[10px] sm:text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project title with improved responsive sizing */}
                  <Link href={`/projects/${project.id}`} className="block mb-3 sm:mb-4">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold text-color-text group-hover:text-primary-300 transition-colors leading-tight"
                      animate={hoveredProject === project.id ? { scale: 1.01 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                  </Link>

                  {/* Description with fewer lines on mobile */}
                  <p className="text-color-text-muted mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Links section with better spacing on mobile */}
                  <motion.div
                    className="flex justify-between items-center"
                    animate={hoveredProject === project.id ? { x: 3 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {project.links.demo && (
                        <Link
                          href={project.links.demo}
                          className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 text-xs sm:text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Live Demo</span>
                          <span className="text-xs transform group-hover:translate-x-0.5 transition-transform">↗</span>
                        </Link>
                      )}
                      {project.links.github && (
                        <Link
                          href={project.links.github}
                          className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 text-xs sm:text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Code</span>
                          <span className="text-xs transform group-hover:translate-x-0.5 transition-transform">↗</span>
                        </Link>
                      )}
                    </div>

                    {/* View details button */}
                    <Link
                      href={`/projects/${project.links.slug}`}
                      className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 text-xs sm:text-sm font-medium"
                    >
                      <span>View details</span>
                      <IoArrowForward className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-300 ${hoveredProject === project.id ? 'translate-x-0.5 opacity-100' : 'opacity-80'}`} />
                    </Link>
                  </motion.div>
                </div>

                {/* Touch highlight effect for mobile */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(var(--color-primary-500), 0.1)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/projects" className="btn-primary flex items-center gap-2 group text-sm sm:text-base">
            <span>Explore all projects</span>
            <IoArrowForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
