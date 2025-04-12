import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowDown } from "react-icons/io5";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden bg-bg-alt">
      <div className="absolute inset-0 z-0">
        {/* Background decoration elements */}
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary-900/10 blur-3xl"></div>
        <div className="absolute bottom-32 right-[15%] w-72 h-72 rounded-full bg-primary-800/10 blur-3xl"></div>
      </div>

      <motion.div
        className="container-section text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="heading-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hi, I&apos;m <span className="text-primary-400">CodeMeAPixel</span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-color-text-muted mb-8 max-w-2xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          I create beautiful and functional web experiences with modern technologies and a passion for design.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="#projects" className="btn-primary">
            View My Work
          </Link>
          <Link href="#contact" className="btn-secondary">
            Contact Me
          </Link>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="animate-bounce">
            <IoArrowDown className="w-10 h-10 text-color-text-muted" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
