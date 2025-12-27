import { motion } from "framer-motion";
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
        <motion.div
          className="absolute top-[30%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-primary-500/15 to-transparent blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-tl from-primary-400/20 to-transparent blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

      <div className="container-section relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-primary-300 glass-frost rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <IoSparkles className="w-4 h-4" />
            My Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-color-text">Featured </span>
            <span className="animated-gradient-text">Projects</span>
          </h2>
          <p className="text-color-text-muted text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
            A selection of projects I&apos;ve worked on recently
          </p>
        </motion.div>

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
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
        </motion.div>
      </div>
    </section>
  );
}
