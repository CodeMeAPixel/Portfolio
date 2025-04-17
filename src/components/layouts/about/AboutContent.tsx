"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoPersonOutline, IoSchoolOutline, IoBriefcaseOutline, IoTimeOutline, IoCode, IoRocketOutline } from "react-icons/io5";

export default function AboutContent() {
    return (
        <section className="py-24 bg-bg-alt relative z-10">
            <div className="container-section max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="heading-primary text-center md:text-left mb-6">About Me</h1>

                    <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
                        {/* Profile image section */}
                        <motion.div
                            className="md:col-span-2 mx-auto md:mx-0 w-full max-w-[300px] md:max-w-none"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="card-highlight animate-pulse-glow p-0.4 overflow-hidden rounded-xl max-w-[300px] md:max-w-none">
                                <div className="relative aspect-square rounded-lg overflow-hidden bg-card-alt">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-bg-alt/80 rounded-lg animate-float mix-blend-overlay"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                            src="/character.png"
                                            alt="Profile"
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover brightness-95 rounded-lg"
                                            priority
                                        />
                                    </div>
                                    {/* Decorative elements */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 font-medium text-sm px-4 opacity-20">
                                        © CodeMeAPixel
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bio section */}
                        <motion.div
                            className="md:col-span-3 space-y-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="prose prose-invert max-w-none">
                                <p className="text-lg text-color-text-muted leading-relaxed">
                                    Hello! I'm <span className="text-primary-300 font-medium">CodeMeAPixel</span>, a passionate fullstack developer with a keen eye for design and a love for creating exceptional digital experiences.
                                </p>

                                <p className="text-color-text-muted mt-4">
                                    My journey in web development began over 10 years ago, driven by curiosity and a desire to build things that people love to use. I specialize in creating modern, responsive, and accessible web applications that not only look great but also deliver outstanding user experiences.
                                </p>

                                <p className="text-color-text-muted mt-4">
                                    When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing my knowledge through writing and mentoring. I believe in continuous learning and staying up-to-date with the latest trends and best practices in web development.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                                <Link href="/contact" className="btn-primary flex items-center gap-2">
                                    <span>Get In Touch</span>
                                </Link>
                                <Link href="/projects" className="btn-secondary flex items-center gap-2">
                                    <span>View My Work</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Experience section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-16"
                >
                    <h2 className="heading-secondary text-center md:text-left mb-8 flex items-center gap-2">
                        <IoBriefcaseOutline className="text-primary-400 text-2xl" />
                        Experience
                    </h2>

                    <div className="grid gap-6">
                        <TimelineItem
                            title="Chief of Operations"
                            company="NodeByte"
                            period="2024 - Present"
                            description="Help lead the development team, contibute to daily operations within the company, and ensure the quality of our products. I also mentor junior developers and help them grow their skills. And contribute to documentation and knowledge sharing."
                            delay={0.1}
                        />

                        <TimelineItem
                            title="Lead Developer"
                            company="Infinity Development"
                            period="2020 - Present"
                            description="Led a team of developers in creating web applications using React, Node.js, MongoDB, PostgreSQL, Rust and more. Collaborated with designers to implement user-friendly interfaces and optimized application performance."
                            delay={0.2}
                        />
                    </div>
                </motion.div>

                {/* Education section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-16"
                >
                    <h2 className="heading-secondary text-center md:text-left mb-8 flex items-center gap-2">
                        <IoSchoolOutline className="text-primary-400 text-2xl" />
                        Certification
                    </h2>

                    <div className="grid gap-6">
                        <TimelineItem
                            title="Frontend Development"
                            company="Free Code Camp"
                            period="2018"
                            description="Completed a comprehensive curriculum covering HTML, CSS, JavaScript, and responsive design. Built several projects to demonstrate skills."
                            delay={0.1}
                            isLast={true}
                        />
                        <TimelineItem
                            title="Backend Development"
                            company="Free Code Camp"
                            period="2017"
                            description="Completed a curriculum focused on Node.js, Express, and MongoDB. Developed RESTful APIs and integrated them with frontend applications."
                            delay={0.1}
                            isLast={true}
                        />
                    </div>
                </motion.div>

                {/* Personal interests section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h2 className="heading-secondary text-center md:text-left mb-8 flex items-center gap-2">
                        <IoPersonOutline className="text-primary-400 text-2xl" />
                        Beyond Coding
                    </h2>

                    <div className="grid md:grid-cols-3 gap-5">
                        <InterestCard
                            icon={<IoCode />}
                            title="Open Source"
                            description="I actively contribute to open-source projects and believe in giving back to the community."
                            delay={0.1}
                        />

                        <InterestCard
                            icon={<IoTimeOutline />}
                            title="Continuous Learning"
                            description="I dedicate time to learning new technologies and improving my skills through courses and self-study."
                            delay={0.2}
                        />

                        <InterestCard
                            icon={<IoRocketOutline />}
                            title="Technology Exploration"
                            description="I enjoy exploring emerging technologies and experimenting with new tools and frameworks."
                            delay={0.3}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

interface TimelineItemProps {
    title: string;
    company: string;
    period: string;
    description: string;
    delay: number;
    isLast?: boolean;
}

function TimelineItem({ title, company, period, description, delay, isLast = false }: TimelineItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="relative pl-8 pb-8"
        >
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-primary-800/30"></div>
            )}

            {/* Timeline dot */}
            <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-primary-900/50 border-2 border-primary-500/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-400"></div>
            </div>

            <div className="card hover:border-primary-700/30 transition-colors">
                <h3 className="text-xl font-bold text-color-text">{title}</h3>
                <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                    <span className="text-primary-300 font-medium">{company}</span>
                    <span className="text-xs font-medium bg-primary-900/30 text-primary-300 px-2 py-1 rounded-full border border-primary-700/30">
                        {period}
                    </span>
                </div>
                <p className="text-color-text-muted">{description}</p>
            </div>
        </motion.div>
    );
}

interface InterestCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

function InterestCard({ icon, title, description, delay }: InterestCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="card hover:border-primary-700/30 transition-colors"
        >
            <div className="bg-primary-900/30 text-primary-300 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-primary-700/30">
                <div className="text-2xl">{icon}</div>
            </div>
            <h3 className="text-xl font-bold text-color-text mb-2">{title}</h3>
            <p className="text-color-text-muted">{description}</p>
        </motion.div>
    );
}
