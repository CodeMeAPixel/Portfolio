"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoPersonOutline, IoSchoolOutline, IoBriefcaseOutline, IoTimeOutline, IoCode, IoRocketOutline, IoArrowForward, IoHeart, IoSparkles, IoLocationOutline } from "react-icons/io5";

export default function AboutContent() {
    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Animated floating orbs */}
            <motion.div
                className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Main content section */}
            <div className="container-section max-w-6xl relative">
                {/* Hero section with profile */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    {/* Badge */}
                    <div className="flex justify-center md:justify-start mb-8">
                        <motion.span
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-frost rounded-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <IoSparkles className="w-4 h-4" />
                            About Me
                        </motion.span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-8">
                        <span className="text-color-text">The Story Behind </span>
                        <span className="animated-gradient-text text-shadow-glow">the Code</span>
                    </h1>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Profile image section */}
                        <motion.div
                            className="relative mx-auto lg:mx-0 order-1 lg:order-none"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {/* Premium glow effect */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-primary-500/30 via-primary-400/20 to-primary-600/30 rounded-[32px] blur-3xl opacity-60 animate-pulse"></div>

                            <div className="relative group perspective-hover">
                                {/* Rainbow border effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 rounded-[28px] opacity-50 group-hover:opacity-80 blur-sm transition-opacity duration-500"></div>

                                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-3xl overflow-hidden glass-ultra">
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 shine-sweep"></div>

                                    <Image
                                        src="/character.png"
                                        alt="Profile"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60"></div>
                                </div>

                                {/* Floating availability badge */}
                                <motion.div
                                    className="absolute -bottom-4 -right-4 md:bottom-6 md:-right-8 px-5 py-3 rounded-2xl glass-ultra shadow-2xl shadow-black/30"
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
                                        </span>
                                        <span className="text-sm font-semibold text-color-text">Available for work</span>
                                    </div>
                                </motion.div>

                                {/* Experience badge */}
                                <motion.div
                                    className="absolute -top-4 -left-4 md:top-6 md:-left-8 px-5 py-3 rounded-2xl glass-ultra shadow-2xl shadow-black/30"
                                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-center">
                                        <div className="text-3xl font-black animated-gradient-text">10+</div>
                                        <div className="text-xs text-color-text-muted font-semibold">Years Exp.</div>
                                    </div>
                                </motion.div>

                                {/* Location badge */}
                                <motion.div
                                    className="absolute bottom-6 -left-4 md:bottom-20 md:-left-8 px-4 py-2 rounded-xl glass-frost"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <div className="flex items-center gap-2 text-sm text-primary-300 font-semibold">
                                        <IoLocationOutline className="w-4 h-4" />
                                        <span>Canada</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Bio section */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="prose prose-lg prose-invert max-w-none">
                                <p className="text-xl md:text-2xl text-color-text leading-relaxed">
                                    Hello! I&apos;m <span className="animated-gradient-text font-bold">Tyler</span>, a passionate fullstack developer with a keen eye for design and a love for creating exceptional digital experiences.
                                </p>

                                <p className="text-color-text-muted mt-6 text-lg leading-relaxed">
                                    My journey in web development began over 10 years ago, driven by curiosity and a desire to build things that people love to use. I specialize in creating modern, responsive, and accessible web applications that not only look great but also deliver outstanding user experiences.
                                </p>

                                <p className="text-color-text-muted mt-4 text-lg leading-relaxed">
                                    When I&apos;m not coding, I enjoy spending quality time with my family. I&apos;m a proud husband and father of two wonderful children who inspire me every day.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/contact"
                                    className="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden shine-sweep"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-[gradient-x_3s_linear_infinite]"></span>
                                    <span className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-primary-600 to-primary-500"></span>
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>Get In Touch</span>
                                        <IoArrowForward className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                </Link>
                                <Link
                                    href="/projects"
                                    className="group px-8 py-4 rounded-2xl font-bold text-primary-400 glass-frost hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>View My Work</span>
                                    <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Experience section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 rounded-xl glass-frost">
                            <IoBriefcaseOutline className="w-6 h-6 text-primary-400" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-color-text">Experience</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent"></div>
                    </div>

                    <div className="grid gap-5">
                        <TimelineItem
                            title="System Administrator"
                            company="Purrquinox Technologies"
                            period="Present"
                            description="Manage and maintain the IT infrastructure, ensuring system reliability and security. I also handle network administration, server management, and user support."
                            delay={0.2}
                        />
                        <TimelineItem
                            title="Chief of Operations"
                            company="NodeByte"
                            period="2024 - Present"
                            description="Help lead the development team, contribute to daily operations within the company, and ensure the quality of our products. I also mentor junior developers."
                            delay={0.1}
                        />

                        <TimelineItem
                            title="Chief Executive Officer"
                            company="ByteBrush Studios"
                            period="2020 - Present"
                            description="Oversee the strategic direction of the company, manage client relationships, and ensure the successful delivery of projects."
                            delay={0.2}
                        />
                    </div>
                </motion.div>

                {/* Education section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 rounded-xl glass-frost">
                            <IoSchoolOutline className="w-6 h-6 text-primary-400" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-color-text">Certifications</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent"></div>
                    </div>

                    <div className="grid gap-5">
                        <TimelineItem
                            title="Fullstack Development"
                            company="Free Code Camp"
                            period="2020 - 2021"
                            description="Completed a comprehensive curriculum covering HTML, CSS, JavaScript, React, Node.js, and MongoDB."
                            delay={0.2}
                        />
                        <TimelineItem
                            title="Frontend Development"
                            company="Free Code Camp"
                            period="2017-2018"
                            description="Completed a comprehensive curriculum covering HTML, CSS, JavaScript, and responsive design."
                            delay={0.1}
                        />
                        <TimelineItem
                            title="Backend Development"
                            company="Free Code Camp"
                            period="2016-2017"
                            description="Completed a curriculum focused on Node.js, Express, and MongoDB. Developed RESTful APIs."
                            delay={0.1}
                        />
                    </div>
                </motion.div>

                {/* Personal interests section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 rounded-xl glass-frost">
                            <IoHeart className="w-6 h-6 text-primary-400" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-color-text">Beyond Coding</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

                        <InterestCard
                            icon={<IoSchoolOutline />}
                            title="Mentoring"
                            description="I love mentoring aspiring developers and sharing my knowledge to help them grow in their careers."
                            delay={0.4}
                        />

                        <InterestCard
                            icon={<IoHeart />}
                            title="Family Time"
                            description="Spending quality time with my family is important to me. I cherish moments with my wife and two kids."
                            delay={0.5}
                        />

                        <InterestCard
                            icon={<IoCode />}
                            title="Web Development"
                            description="I have a passion for finding and exploring new areas in web development, from frontend to backend."
                            delay={0.6}
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

function TimelineItem({ title, company, period, description, delay }: TimelineItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group"
        >
            <div className="relative p-6 md:p-8 rounded-2xl glass-ultra overflow-hidden transition-all duration-500">
                {/* Animated glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Spotlight effect */}
                <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors">{title}</h3>
                            <span className="text-primary-400 font-semibold">{company}</span>
                        </div>
                        <span className="text-xs font-semibold glass-frost text-primary-300 px-4 py-2 rounded-full">
                            {period}
                        </span>
                    </div>
                    <p className="text-color-text-muted leading-relaxed">{description}</p>
                </div>
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
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group"
        >
            <div className="h-full p-6 md:p-8 rounded-2xl glass-ultra overflow-hidden transition-all duration-500 relative">
                {/* Animated glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Spotlight effect */}
                <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                {/* Shine sweep */}
                <div className="absolute inset-0 shine-sweep opacity-0 group-hover:opacity-100"></div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl glass-frost flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl text-primary-400">{icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-color-text mb-3 group-hover:text-primary-300 transition-colors">{title}</h3>
                    <p className="text-color-text-muted text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}
