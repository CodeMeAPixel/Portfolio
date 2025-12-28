"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import MobileThemeMenu from "./MobileThemeMenu";
import { IoMenu, IoClose } from "react-icons/io5";
import { CMAP } from "@/components/icons/CMAP";
import { FaStar } from "react-icons/fa";
import { usePathname } from "next/navigation";
import packageJson from "@/../package.json";
import { IoHomeOutline, IoPersonOutline, IoNewspaperOutline, IoCodeSlashOutline, IoFolderOutline, IoStarOutline, IoMailOutline, IoFlashOutline } from "react-icons/io5";

const navLinks = [
    { href: "/", label: "Home", icon: IoHomeOutline },
    { href: "/about", label: "About", icon: IoPersonOutline },
    { href: "/blog", label: "Blog", icon: IoNewspaperOutline },
    { href: "/skills", label: "Skills", icon: IoCodeSlashOutline },
    { href: "/projects", label: "Projects", icon: IoFolderOutline },
    { href: "/referrals", label: "Referrals", icon: IoStarOutline },
    { href: "/just-ask", label: "Just Ask", icon: IoFlashOutline },
    { href: "/contact", label: "Contact", icon: IoMailOutline }
];

interface LinkComponentProps {
    href: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
}

export function LinkComponent({
    href,
    className,
    children,
    ...rest
}: LinkComponentProps) {
    const pathname = usePathname();
    const isActive = pathname === href ||
        (pathname === "/" && href.startsWith("/#")) ||
        (pathname?.startsWith("/blog") && href === "/blog");

    return href.startsWith("/#") || href.startsWith("http") ? (
        <a
            href={href}
            className={`${className} ${isActive ? "navbar-link-active" : ""}`}
            {...rest}
        >
            {children}
        </a>
    ) : (
        <Link
            href={href}
            className={`${className} ${isActive ? "navbar-link-active" : ""}`}
            {...rest}
        >
            {children}
        </Link>
    );
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isLoaded } = useTheme();
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Track scroll position for background styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Don't render theme-dependent parts until client-side theme is loaded
    const renderThemeUI = () => {
        if (!isLoaded) {
            // Return a placeholder with the same dimensions
            return <div className="w-10 h-10" />;
        }

        return (
            <div className="mr-2">
                <MobileThemeMenu />
            </div>
        );
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: '0s' }}
            >
                {/* Sleek glassmorphism background */}
                <div className={`absolute inset-0 transition-all duration-300 ${isScrolled
                    ? "bg-bg/70 backdrop-blur-2xl border-b border-white/5"
                    : "bg-gradient-to-b from-bg/50 to-transparent backdrop-blur-sm"
                    }`}>
                    {/* Subtle gradient line at bottom when scrolled */}
                    {isScrolled && (
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
                    )}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo - Compact */}
                        <Link href="/" className="flex items-center group relative z-10">
                            <div className="relative hover:scale-105 transition-transform duration-300">
                                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CMAP className="relative w-8 h-8 text-primary-400 fill-primary-500 group-hover:text-primary-300 transition-colors duration-300" />
                            </div>
                            <span className="ml-2 text-lg font-bold text-color-text group-hover:text-primary-300 transition-colors hidden sm:block">
                                CodeMeAPixel
                            </span>
                        </Link>

                        {/* Desktop Navigation - Sleek Centered Pills */}
                        <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                            <div className="flex items-center gap-0.5 px-1 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/5">
                                {navLinks.map(({ href, label }) => {
                                    const isActive = pathname === href || (pathname?.startsWith(href) && href !== '/');
                                    return (
                                        <div key={href} className="relative">
                                            <LinkComponent
                                                href={href}
                                                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${isActive
                                                    ? "text-white"
                                                    : "text-color-text-muted hover:text-color-text"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full transition-all duration-300"
                                                    />
                                                )}
                                                <span className="relative z-10">{label}</span>
                                            </LinkComponent>
                                        </div>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* Right side - Theme + GitHub */}
                        <div className="hidden lg:flex items-center gap-3 relative z-10">
                            <a
                                href="https://github.com/CodeMeAPixel/Portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-medium text-color-text-muted hover:text-primary-400 transition-colors hover:scale-102"
                            >
                                <FaStar className="w-3.5 h-3.5" />
                                <span className="hidden xl:inline">Star</span>
                            </a>
                            <div className="w-px h-4 bg-white/10"></div>
                            <ThemeSelector />
                        </div>

                        {/* Mobile Navigation Toggle */}
                        <div className="flex items-center lg:hidden gap-2 relative z-10">
                            {renderThemeUI()}

                            <button
                                className={`relative p-2 rounded-lg transition-all duration-300 active:scale-95 ${isMenuOpen
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white/5 text-color-text-muted hover:text-primary-400 hover:bg-white/10'
                                    }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMenuOpen}
                            >
                                {!isMenuOpen ? (
                                    <IoMenu className="w-5 h-5" />
                                ) : (
                                    <IoClose className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu - Compact Slide */}
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-md lg:hidden animate-fade-in"
                            style={{ zIndex: 9998 }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Menu Panel - Sleek */}
                        <div
                            className="fixed top-16 left-3 right-3 lg:hidden bg-bg border border-white/10 shadow-2xl overflow-hidden animate-fade-in rounded-2xl"
                            style={{ zIndex: 9999, maxHeight: 'calc(100vh - 80px)' }}
                        >
                            {/* Menu Header with Close Button */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                <span className="text-sm font-medium text-text-muted">Menu</span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-muted hover:text-primary-400 transition-all duration-200 active:scale-95"
                                >
                                    <IoClose className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="py-2 px-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                <div className="grid gap-0.5">
                                    {navLinks.map(({ href, label, icon: Icon }, index) => {
                                        const isActive = pathname === href || (pathname?.startsWith(href) && href !== '/');
                                        return (
                                            <div
                                                key={href}
                                                className="animate-fade-in"
                                                style={{ animationDelay: `${index * 0.03}s` }}
                                            >
                                                <LinkComponent
                                                    href={href}
                                                    className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
                                                        ? "text-white bg-gradient-to-r from-primary-600 to-primary-500"
                                                        : "text-color-text-muted hover:text-color-text hover:bg-white/5"
                                                        }`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {Icon && (
                                                        <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-white' : 'text-primary-400'}`} />
                                                    )}
                                                    <span className="text-sm font-medium">{label}</span>
                                                    {isActive && (
                                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
                                                    )}
                                                </LinkComponent>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Compact footer */}
                            <div className="px-3 py-2.5 border-t border-white/5 bg-white/[0.02]">
                                <div className="flex items-center justify-between text-[10px] text-color-text-muted">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        <span>v{packageJson.version}</span>
                                    </div>
                                    <a
                                        href="https://github.com/CodeMeAPixel/Portfolio"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors"
                                    >
                                        <FaStar className="w-3 h-3" />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </header>

            {/* Spacer to prevent content overlap */}
            <div className="h-16"></div>
        </>
    );
}
