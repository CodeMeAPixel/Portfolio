"use client";

import Link from "next/link";
import { CMAP } from "@/components/icons/CMAP";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoLogoDiscord, IoHeart } from "react-icons/io5";

const socialLinks = [
    { href: "https://github.com/CodeMeAPixel", icon: IoLogoGithub, label: "GitHub" },
    { href: "https://linkedin.com/in/codemeapixel", icon: IoLogoLinkedin, label: "LinkedIn" },
    { href: "https://twitter.com/codemeapixel", icon: IoLogoTwitter, label: "Twitter" },
    { href: "https://discord.gg/Vv2bdC44Ge", icon: IoLogoDiscord, label: "Discord" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10">
            {/* Gradient line at top */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>

            <div className="bg-bg/70 backdrop-blur-2xl border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Logo + Copyright */}
                        <div className="flex items-center gap-3 text-xs text-color-text-muted">
                            <Link href="/" className="flex items-center gap-1.5 group">
                                <CMAP className="w-5 h-5 text-primary-400 fill-primary-500 group-hover:text-primary-300 transition-colors" />
                            </Link>
                            <span className="hidden sm:inline w-px h-3 bg-white/10"></span>
                            <span>© {currentYear} CodeMeAPixel</span>
                            <span className="hidden sm:flex items-center gap-1">
                                <span>·</span>
                                <span>Made with</span>
                                <IoHeart className="w-3 h-3 text-rose-500" />
                            </span>
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-1">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg text-color-text-muted hover:text-primary-400 hover:bg-white/5 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
