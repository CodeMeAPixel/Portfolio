"use client";

import Link from "next/link";
import { IoLogoDiscord, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoMailOutline, IoArrowForward, IoSparkles, IoLocationOutline } from "react-icons/io5";

const socialLinks = [
  { href: "https://github.com/CodeMeAPixel", icon: IoLogoGithub, label: "GitHub", gradient: "from-gray-700 to-gray-900" },
  { href: "https://linkedin.com/in/codemeapixel", icon: IoLogoLinkedin, label: "LinkedIn", gradient: "from-blue-600 to-blue-800" },
  { href: "https://twitter.com/codemeapixel", icon: IoLogoTwitter, label: "Twitter", gradient: "from-sky-500 to-sky-700" },
  { href: "https://discord.gg/Vv2bdC44Ge", icon: IoLogoDiscord, label: "Discord", gradient: "from-indigo-500 to-indigo-700" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-aurora opacity-40"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

      {/* Animated orbs */}
      <div
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px] animate-pulse"
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px] animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="container-section relative">
        <div
          className="max-w-4xl mx-auto text-center animate-fade-up"
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-primary-300 glass-frost rounded-full animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <IoMailOutline className="w-4 h-4" />
            Get In Touch
          </span>

          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-color-text">Let&apos;s Work </span>
            <span className="animated-gradient-text">Together</span>
          </h2>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-color-text-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            I&apos;m always open to new opportunities and collaborations.
            Whether you have a project in mind or just want to say hello, I&apos;d love to hear from you!
          </p>

          {/* Premium CTA Card */}
          <div
            className="relative animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-600/20 rounded-[40px] blur-2xl opacity-60"></div>

            <div className="relative p-10 md:p-14 rounded-3xl glass-ultra overflow-hidden">
              {/* Spotlight effect */}
              <div className="absolute inset-0 spotlight opacity-50"></div>

              {/* Decorative elements */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl animate-pulse"
              />
              <div
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-400/15 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1s' }}
              />

              <div className="relative">
                {/* Email CTA - Premium button */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden shine-sweep"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-[gradient-x_3s_linear_infinite]"></span>
                  <span className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-primary-600 to-primary-500"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-500 to-primary-400"></span>
                  <span className="relative z-10 flex items-center gap-3 text-white">
                    <IoMailOutline className="w-6 h-6" />
                    <span>Send me an Email</span>
                    <IoArrowForward className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>

                {/* Divider */}
                <div className="flex items-center gap-6 my-10">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
                  <span className="text-sm text-color-text-muted font-medium px-2">or connect via</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
                </div>

                {/* Social Links - Premium Cards */}
                <div className="flex flex-wrap justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <div
                      key={social.label}
                      className="animate-fade-in"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 px-5 py-3 rounded-xl glass-frost overflow-hidden transition-all duration-300 hover:scale-105"
                        aria-label={social.label}
                      >
                        {/* Hover gradient background */}
                        <span className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>

                        <span className="relative z-10 flex items-center gap-3">
                          <social.icon className="w-5 h-5 text-primary-300 group-hover:text-white transition-colors" />
                          <span className="text-sm font-semibold text-color-text-muted group-hover:text-white transition-colors">
                            {social.label}
                          </span>
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location badge */}
          <div
            className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-xl glass-ultra animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            <IoLocationOutline className="w-5 h-5 text-primary-400" />
            <span className="text-sm text-color-text-muted font-medium">Based in Canada</span>
            <span className="w-1 h-1 rounded-full bg-color-text-muted/50"></span>
            <span className="flex items-center gap-2 text-sm text-primary-300 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for remote work
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
