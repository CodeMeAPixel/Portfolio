"use client";

import Link from "next/link";
import { CMAP } from "@/components/icons/CMAP";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoLogoDiscord, IoHeart, IoArrowUp } from "react-icons/io5";

const socialLinks = [
    { href: "https://github.com/CodeMeAPixel", icon: IoLogoGithub, label: "GitHub" },
    { href: "https://linkedin.com/in/codemeapixel", icon: IoLogoLinkedin, label: "LinkedIn" },
    { href: "https://twitter.com/codemeapixel", icon: IoLogoTwitter, label: "Twitter" },
    { href: "https://discord.gg/Vv2bdC44Ge", icon: IoLogoDiscord, label: "Discord" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative z-10">
            {/* Gradient line at top */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            <div className="bg-bg border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Logo + Copyright */}
                        <div className="flex items-center gap-3 text-sm text-color-text-muted">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <CMAP className="relative w-6 h-6 text-primary-400 fill-primary-500 group-hover:text-primary-300 transition-colors" />
                                </div>
                                <span className="font-semibold text-color-text group-hover:text-primary-300 transition-colors">CodeMeAPixel</span>
                            </Link>
                            <span className="hidden sm:inline w-px h-4 bg-white/10"></span>
                            <span className="text-xs">© {currentYear}</span>
                            <span className="hidden sm:flex items-center gap-1.5 text-xs">
                                <span>·</span>
                                <span>Made with</span>
                                <IoHeart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                                <span>in Canada</span>
                            </span>
                        </div>

                        {/* Social links + Back to top */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-2.5 rounded-xl text-color-text-muted hover:text-primary-400 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
                                    <social.icon className="relative w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                </a>
                            ))}
                            <div className="w-px h-4 bg-white/10 mx-1"></div>
                            <button
                                onClick={scrollToTop}
                                className="group relative p-2.5 rounded-xl text-color-text-muted hover:text-primary-400 transition-all duration-300"
                                aria-label="Scroll to top"
                            >
                                <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
                                <IoArrowUp className="relative w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
