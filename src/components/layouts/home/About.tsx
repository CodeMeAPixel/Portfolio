import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-bg relative z-10">
      <div className="container-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-primary text-center md:text-left mb-10"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-center">
          {/* Avatar - now uses 2/5 of the space on larger screens */}
          <motion.div
            className="md:col-span-2 mx-auto md:mx-0 w-full max-w-[280px] md:max-w-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-highlight animate-pulse-glow p-0.4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-card-alt">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-bg-alt/80 rounded-lg animate-float mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/character.png"
                    alt="Profile"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover brightness-75 rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content - now uses 3/5 of the space on larger screens */}
          <motion.div
            className="md:col-span-3 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-color-text-muted">
              Hi, I&apos;m Tyler! While I go by CodeMeAPixel online, my friends and colleagues know me by my real name.
              I&apos;m a passionate developer with a keen eye for design and a love for creating exceptional digital experiences.
            </p>

            <p className="text-color-text-muted">
              My journey in web development has been driven by curiosity and a constant desire to learn and improve.
              I specialize in building modern, responsive, and user-friendly web applications using the latest technologies and best practices.
            </p>

            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag">Node.js</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
