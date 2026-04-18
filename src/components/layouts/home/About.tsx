"use client";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForward, IoCodeSlash, IoDocumentTextOutline, IoLayers, IoRocket, IoSparkles, IoTrendingUp } from "react-icons/io5";

export default function About() {
  const stats = [
    { label: "Years Experience", value: "10+", icon: IoTrendingUp, color: "from-blue-500 to-cyan-400" },
    { label: "Projects Completed", value: "50+", icon: IoLayers, color: "from-purple-500 to-pink-400" },
    { label: "Technologies", value: "20+", icon: IoCodeSlash, color: "from-amber-500 to-orange-400" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-color-border to-transparent" />

      <div className="container-section relative">
        <div
          className="text-center md:text-left mb-20 animate-fade-up"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium text-primary-400 border border-color-border bg-card/50 rounded-full animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <IoSparkles className="w-3.5 h-3.5" />
            Get to know me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-color-text">About </span>
            <span className="animated-gradient-text">Me</span>
          </h2>
          <p className="text-color-text-muted text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
            Passionate developer crafting digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left col: avatar + meta */}
          <div
            className="mx-auto lg:mx-0 animate-fade-in lg:sticky lg:top-32"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative group">
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden border border-color-border bg-card">
                <Image
                  src="/character.png"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Meta row below image */}
            <div className="mt-4 flex items-center gap-3 text-sm text-color-text-muted flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available
              </span>
              <span className="text-color-border">·</span>
              <span>Canada</span>
              <span className="text-color-border">·</span>
              <span>10+ yrs exp.</span>
            </div>
          </div>

          {/* Right col: bio + stats + tech + CTAs */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4">
              <p className="text-color-text-muted text-lg leading-relaxed">
                Hey there! I&apos;m <span className="text-primary-300 font-bold">Tyler</span>, though you might know me as CodeMeAPixel, Pixel or Pixelated online. I&apos;m a full stack developer from Canada with a passion for building beautiful, functional web experiences that users actually love.
              </p>
              <p className="text-color-text-muted text-lg leading-relaxed">
                Over the past decade, I&apos;ve worked with everything from startups to established companies, helping bring ideas to life through thoughtful design and solid engineering. I believe the best digital products are the ones that feel natural to use and look great doing it.
              </p>
              <p className="text-color-text-muted text-lg leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new tools, contributing to open source projects, or probably drinking way too much coffee. I&apos;m always open to interesting projects and love collaborating with talented people.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-xl border border-color-border bg-card text-center"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-3 text-primary-400" />
                  <div className="text-2xl md:text-3xl font-black text-color-text">{stat.value}</div>
                  <div className="text-xs text-color-text-muted mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-md text-sm font-medium border border-color-border bg-card/50 text-color-text-muted hover:text-color-text hover:border-primary-500/30 transition-colors duration-150"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-400 text-white text-sm font-semibold transition-colors duration-150"
              >
                Learn more
                <IoArrowForward className="w-4 h-4" />
              </Link>
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-color-border hover:border-primary-500/30 text-color-text-muted hover:text-color-text text-sm font-medium transition-all duration-150"
              >
                <IoDocumentTextOutline className="w-4 h-4" />
                Download CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
