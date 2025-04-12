import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ImageCarousel } from "@/components/ui/ImageCarousel";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-bg-alt relative z-10">
      <div className="container-section">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-primary text-center md:text-left"
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="card group relative overflow-hidden p-0 border gradient-border"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative">
                {/* Inset frame effect - simplified */}
                <div className="absolute inset-0 border-b gradient-border z-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary-800/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                {/* Image carousel */}
                <ImageCarousel 
                  images={project.images} 
                  className="w-full"
                />
                
                {/* Seamless content transition */}
                <div className="absolute -bottom-1 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent z-10"></div>
              </div>
              
              <div className="p-5 relative">
                <motion.h3 
                  className="heading-secondary mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-color-text-muted mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="tag bg-primary-900/30 border-primary-700/30 hover:bg-primary-900/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="flex justify-between"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {project.links.demo && (
                    <Link 
                      href={project.links.demo}
                      className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2 group/link"
                    >
                      <span>Live Demo</span>
                      <span className="text-xs opacity-0 group-hover/link:opacity-100 transition-opacity">↗</span>
                    </Link>
                  )}
                  {project.links.github && (
                    <Link 
                      href={project.links.github}
                      className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2 group/link"
                    >
                      <span>Source Code</span>
                      <span className="text-xs opacity-0 group-hover/link:opacity-100 transition-opacity">↗</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
