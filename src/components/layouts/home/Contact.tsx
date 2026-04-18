"use client";

import Link from "next/link";
import { IoLogoDiscord, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoMailOutline, IoArrowForward, IoSparkles, IoLocationOutline } from "react-icons/io5";

const socialLinks = [
  { href: "https://github.com/CodeMeAPixel", icon: IoLogoGithub, label: "GitHub", gradient: "from-gray-600 to-gray-800", hoverBg: "group-hover:bg-gray-700" },
  { href: "https://linkedin.com/in/codemeapixel", icon: IoLogoLinkedin, label: "LinkedIn", gradient: "from-blue-500 to-blue-700", hoverBg: "group-hover:bg-blue-600" },
  { href: "https://twitter.com/codemeapixel", icon: IoLogoTwitter, label: "Twitter", gradient: "from-sky-400 to-sky-600", hoverBg: "group-hover:bg-sky-500" },
  { href: "https://discord.gg/Vv2bdC44Ge", icon: IoLogoDiscord, label: "Discord", gradient: "from-indigo-500 to-indigo-700", hoverBg: "group-hover:bg-indigo-600" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-color-border to-transparent" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="container-section relative">
        <div
          className="max-w-4xl mx-auto text-center animate-fade-up"
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-sm font-medium text-primary-400 border border-color-border bg-card/50 rounded-full animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <IoMailOutline className="w-3.5 h-3.5" />
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

          <div
            className="animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Email CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-400 text-white font-semibold text-base transition-colors duration-150"
            >
              <IoMailOutline className="w-5 h-5" />
              <span>Send me an Email</span>
              <IoArrowForward className="w-4 h-4" />
            </Link>

            {/* Divider */}
            <div className="flex items-center gap-6 my-10">
              <div className="flex-1 h-px bg-color-border"></div>
              <span className="text-sm text-color-text-muted font-medium">or connect via</span>
              <div className="flex-1 h-px bg-color-border"></div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-color-border bg-card-alt hover:border-primary-500/30 hover:text-color-text text-color-text-muted transition-all duration-150"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Location badge */}
          <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-color-border bg-card/50 animate-fade-in">
            <IoLocationOutline className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-color-text-muted">Based in Canada</span>
            <span className="w-px h-3 bg-color-border" />
            <span className="flex items-center gap-1.5 text-sm text-color-text">
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
