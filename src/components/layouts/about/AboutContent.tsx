"use client";

import Image from "next/image";
import Link from "next/link";
import { IoPersonOutline, IoSchoolOutline, IoBriefcaseOutline, IoTimeOutline, IoCode, IoRocketOutline, IoArrowForward, IoHeart, IoSparkles, IoLocationOutline, IoOpenOutline, IoDocumentTextOutline } from "react-icons/io5";
import DiscordPresence from "../../discord/DiscordPresence";

export default function AboutContent() {
    return (
        <section className="pt-20 pb-24 md:pt-24 md:pb-32 bg-bg relative z-10 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-dot-pattern opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-color-border to-transparent" />

            {/* Main content section */}
            <div className="container-section max-w-6xl relative">
                {/* Hero section with profile */}
                <div
                    className="mb-24 animate-fade-up"
                >
                    {/* Badge */}
                    <div className="flex justify-center md:justify-start mb-8">
                        <span
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 border border-color-border bg-card rounded-full animate-fade-in"
                        >
                            <IoSparkles className="w-4 h-4" />
                            About Me
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-8">
                        <span className="text-color-text">The Story Behind </span>
                        <span className="animated-gradient-text">the Code</span>
                    </h1>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Profile image section */}
                        <div
                            className="relative mx-auto lg:mx-0 order-1 lg:order-none animate-fade-in"
                            style={{ animationDelay: '0.1s' }}
                        >
                            <div className="relative group">
                                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden border border-color-border bg-card">
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
                            </div>

                            {/* Meta row below image */}
                            <div className="mt-4 flex items-center gap-3 text-sm text-color-text-muted flex-wrap">
                                <span className="flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Available for remote work
                                </span>
                                <span className="text-color-border">·</span>
                                <span>Canada</span>
                                <span className="text-color-border">·</span>
                                <span>10+ yrs exp.</span>
                            </div>
                        </div>

                        {/* Bio section */}
                        <div
                            className="space-y-8 animate-fade-up"
                            style={{ animationDelay: '0.2s' }}
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
                                    className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-400 text-white font-semibold transition-colors duration-150"
                                >
                                    <span>Get In Touch</span>
                                    <IoArrowForward className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </Link>
                                <Link
                                    href="/projects"
                                    className="group border border-color-border bg-card hover:border-primary-500/30 text-color-text-muted hover:text-color-text transition-all duration-150 px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                                >
                                    <span>View My Work</span>
                                    <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/cv"
                                    className="group border border-color-border bg-card hover:border-primary-500/30 text-color-text-muted hover:text-color-text transition-all duration-150 px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                                >
                                    <IoDocumentTextOutline className="w-5 h-5" />
                                    <span>Download CV</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Discord Presence Section */}
                <DiscordPresence />

                {/* Experience section */}
                <div
                    className="mb-24 animate-fade-up"
                    style={{ animationDelay: '0.3s' }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 rounded-xl border border-color-border bg-card">
                            <IoBriefcaseOutline className="w-6 h-6 text-primary-400" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-color-text">Experience</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent"></div>
                    </div>

                    <div className="grid gap-5">
                        <TimelineItem
                            title="Chief Executive Officer"
                            company="NodeByte"
                            period="Present"
                            description="Driving the company's strategic vision and technical roadmap. I oversee full-stack architectural decisions, lead high-level operations, and foster a culture of excellence through direct mentorship of the engineering team."
                            delay={0.1}
                        />
                        <TimelineItem
                            title="System Administrator"
                            company="Purrquinox Technologies"
                            period="Present"
                            description="Manage and maintain the IT infrastructure, ensuring system reliability and security. I also handle network administration, server management, and user support."
                            delay={0.2}
                        />
                    </div>
                </div>

                {/* Education section */}
                <div
                    className="mb-24 animate-fade-up"
                    style={{ animationDelay: '0.4s' }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 rounded-xl border border-color-border bg-card">
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
                </div>

                {/* Personal interests section */}
                <div
                    className="animate-fade-up"
                    style={{ animationDelay: '0.5s' }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 rounded-xl border border-color-border bg-card">
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
                </div>
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

// Company to URL mapping
const COMPANY_URLS: Record<string, string> = {
    "Purrquinox Technologies": "https://purrquinox.com/",
    "ByteBrush Studios": "https://bytebrush.dev/",
    "NodeByte": "https://nodebyte.co.uk/",
};

function TimelineItem({ title, company, period, description, delay }: TimelineItemProps) {
    const companyUrl = COMPANY_URLS[company];
    const isClickable = !!companyUrl;

    return (
        <div
            className="group animate-fade-up transition-transform duration-200"
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="relative p-6 md:p-8 rounded-2xl border border-color-border bg-card overflow-hidden transition-all duration-500">
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors">{title}</h3>
                            {isClickable ? (
                                <a
                                    href={companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="group/company inline-flex items-center gap-1.5 text-primary-400 font-semibold hover:text-primary-300 transition-colors duration-200"
                                    title={`Visit ${company}`}
                                >
                                    <span className="relative">
                                        {company}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover/company:w-full transition-all duration-300"></span>
                                    </span>
                                    <IoOpenOutline className="w-4 h-4 opacity-0 group-hover/company:opacity-100 group-hover/company:translate-x-0.5 transition-all duration-200" />
                                </a>
                            ) : (
                                <span className="text-primary-400 font-semibold">{company}</span>
                            )}
                        </div>
                        <span className="text-xs font-semibold border border-color-border bg-card text-primary-300 px-4 py-2 rounded-full">
                            {period}
                        </span>
                    </div>
                    <p className="text-color-text-muted leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
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
        <div
            className="group animate-fade-up transition-transform duration-200"
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="h-full p-6 md:p-8 rounded-2xl border border-color-border bg-card overflow-hidden transition-all duration-500 relative">
                {/* Content */}
                <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl border border-color-border bg-card flex items-center justify-center mb-5">
                        <div className="text-2xl text-primary-400">{icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-color-text mb-3 group-hover:text-primary-300 transition-colors">{title}</h3>
                    <p className="text-color-text-muted text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}
