"use client";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForward, IoCodeSlash, IoLayers, IoRocket, IoSparkles, IoTrendingUp } from "react-icons/io5";

export default function About() {
  const stats = [
    { label: "Years Experience", value: "10+", icon: IoTrendingUp, color: "from-blue-500 to-cyan-400" },
    { label: "Projects Completed", value: "50+", icon: IoLayers, color: "from-purple-500 to-pink-400" },
    { label: "Technologies", value: "20+", icon: IoCodeSlash, color: "from-amber-500 to-orange-400" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-aurora opacity-40"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

        {/* Floating orbs */}
        <div
          className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px] animate-pulse"
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-primary-400/15 to-transparent blur-[80px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>

      <div className="container-section relative">
        <div
          className="text-center md:text-left mb-20 animate-fade-up"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-primary-300 glass-frost rounded-full animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <IoSparkles className="w-4 h-4" />
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

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Avatar with premium glass design */}
          <div
            className="relative mx-auto lg:mx-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-primary-600/20 to-primary-700/10 rounded-3xl blur-3xl scale-110"></div>

            <div className="relative group perspective-hover">
              {/* Main image container with glass border */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
                {/* Rainbow border effect */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-[2px] rounded-[22px] bg-bg"></div>
                </div>

                <div className="relative w-full h-full rounded-3xl overflow-hidden glass-ultra">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent mix-blend-overlay z-10"></div>
                  <Image
                    src="/character.png"
                    alt="Profile"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    priority
                  />
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 shine-sweep z-20"></div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent"></div>
                </div>
              </div>

              {/* Floating experience badge */}
              <div
                className="absolute -top-4 -left-4 md:-top-6 md:-left-6 animate-fade-in"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative px-4 py-3 rounded-2xl glass-frost">
                    <div className="text-2xl font-black text-primary-300">10+</div>
                    <div className="text-xs text-color-text-muted font-medium">Years Exp.</div>
                  </div>
                </div>
              </div>

              {/* Floating availability badge */}
              <div
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                <div className="relative group/badge">
                  <div className="absolute inset-0 bg-green-500 rounded-2xl blur-lg opacity-30 group-hover/badge:opacity-50 transition-opacity"></div>
                  <div className="relative px-4 py-3 rounded-2xl glass-frost flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-green-400 to-emerald-400"></span>
                    </span>
                    <span className="text-sm font-semibold text-color-text">Available</span>
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div
                className="absolute top-1/4 -right-8 w-4 h-4 rounded-full bg-primary-400/60 animate-float"
              />
              <div
                className="absolute bottom-1/4 -left-6 w-3 h-3 rounded-full bg-primary-300/50 animate-float"
                style={{ animationDelay: '1s' }}
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="space-y-8 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="space-y-6">
              <p className="text-color-text-muted text-lg leading-relaxed">
                Hi, I&apos;m <span className="text-primary-300 font-bold">Tyler</span>! While I go by CodeMeAPixel online, my friends and colleagues know me by my real name.
                I&apos;m a passionate developer with a keen eye for design and a love for creating exceptional digital experiences.
              </p>

              <p className="text-color-text-muted text-lg leading-relaxed">
                My journey in web development has been driven by curiosity and a constant desire to learn and improve.
                I specialize in building modern, responsive, and user-friendly web applications using the latest technologies and best practices.
              </p>
            </div>

            {/* Stats grid with premium cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="relative p-5 rounded-2xl glass-ultra text-center hover:border-primary-500/30 transition-all duration-300 card-lift">
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-black bg-gradient-to-br from-color-text to-color-text-muted bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-xs text-color-text-muted mt-1 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech tags with premium styling */}
            <div
              className="flex flex-wrap gap-2 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map((tech, index) => (
                <span
                  key={tech}
                  className="group relative px-4 py-2 rounded-xl text-sm font-semibold glass-ultra cursor-default overflow-hidden hover:-translate-y-1 hover:scale-102 transition-transform duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.6 + index * 0.05}s` }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
                  <span className="relative text-primary-300 group-hover:text-primary-200 transition-colors">{tech}</span>
                </span>
              ))}
            </div>

            {/* CTA with premium button */}
            <div
              className="pt-4 animate-fade-in"
              style={{ animationDelay: '0.7s' }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl glass-frost hover-glow transition-all duration-300"
              >
                <span className="text-primary-300 font-semibold group-hover:text-primary-200 transition-colors">
                  Learn more about me
                </span>
                <IoArrowForward className="w-5 h-5 text-primary-400 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
