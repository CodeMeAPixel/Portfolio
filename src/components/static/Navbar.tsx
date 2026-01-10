"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import MobileThemeMenu from "./MobileThemeMenu";
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { CMAP } from "@/components/icons/CMAP";
import { FaStar } from "react-icons/fa";
import { usePathname } from "next/navigation";
import packageJson from "@/../package.json";
import {
    IoHomeOutline, IoPersonOutline, IoNewspaperOutline, IoCodeSlashOutline,
    IoFolderOutline, IoStarOutline, IoMailOutline, IoFlashOutline,
    IoGameControllerOutline, IoGridOutline, IoBookOutline, IoLogoGithub
} from "react-icons/io5";

// Primary navigation links (always visible)
const primaryLinks = [
    { href: "/", label: "Home", icon: IoHomeOutline },
    { href: "/about", label: "About", icon: IoPersonOutline },
    { href: "/blog", label: "Blog", icon: IoNewspaperOutline },
];

// Dropdown menu items
const workDropdown = {
    label: "Work",
    icon: IoGridOutline,
    items: [
        { href: "/skills", label: "Skills", icon: IoCodeSlashOutline, description: "Technologies I work with" },
        { href: "/projects", label: "Projects", icon: IoFolderOutline, description: "Things I've built/worked on" },
        { href: "/other-works", label: "Other Works", icon: IoLogoGithub, description: "Open source on GitHub", isNew: true },
        { href: "/fivem", label: "FiveM Scripts", icon: IoGameControllerOutline, description: "Scripts for FiveM servers", isNew: true },
    ]
};

const moreDropdown = {
    label: "More",
    icon: IoStarOutline,
    items: [
        { href: "/referrals", label: "Referrals", icon: IoStarOutline, description: "Services I recommend" },
        { href: "/just-ask", label: "Just Ask", icon: IoFlashOutline, description: "Chat etiquette guide" }
    ]
};

// All links for mobile menu
const allNavLinks = [
    { href: "/", label: "Home", icon: IoHomeOutline },
    { href: "/about", label: "About", icon: IoPersonOutline },
    { href: "/blog", label: "Blog", icon: IoNewspaperOutline },
    { href: "/skills", label: "Skills", icon: IoCodeSlashOutline },
    { href: "/projects", label: "Projects", icon: IoFolderOutline },
    { href: "/other-works", label: "Other Works", icon: IoLogoGithub },
    { href: "/fivem", label: "FiveM Scripts", icon: IoGameControllerOutline, isNew: true },
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
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { isLoaded } = useTheme();
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    // Check if any item in a dropdown is active
    const isDropdownActive = (items: typeof workDropdown.items) => {
        return items.some(item => pathname === item.href || pathname?.startsWith(item.href + '/'));
    };

    // Don't render theme-dependent parts until client-side theme is loaded
    const renderThemeUI = () => {
        if (!isLoaded) {
            return <div className="w-10 h-10" />;
        }
        return (
            <div className="mr-2">
                <MobileThemeMenu />
            </div>
        );
    };

    // Dropdown component
    const NavDropdown = ({ dropdown, id }: { dropdown: typeof workDropdown; id: string }) => {
        const isOpen = activeDropdown === id;
        const hasActiveItem = isDropdownActive(dropdown.items);

        return (
            <div className="relative">
                <button
                    onClick={() => setActiveDropdown(isOpen ? null : id)}
                    className={`relative flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${hasActiveItem
                        ? "text-white"
                        : "text-color-text-muted hover:text-color-text"
                        }`}
                >
                    {hasActiveItem && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full" />
                    )}
                    <span className="relative z-10">{dropdown.label}</span>
                    <IoChevronDown className={`relative z-10 w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 py-2 bg-bg border border-white/10 rounded-xl shadow-2xl shadow-black/50 animate-fade-in z-50">
                        {dropdown.items.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-start gap-3 px-4 py-2.5 transition-all duration-200 ${isActive
                                        ? "bg-primary-500/10 text-primary-400"
                                        : "text-color-text-muted hover:text-color-text hover:bg-white/5"
                                        }`}
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-primary-400' : 'text-primary-500/70'}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{item.label}</span>
                                            {item.isNew && (
                                                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full">
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[11px] text-color-text-muted/70 line-clamp-1">{item.description}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
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

                        {/* Desktop Navigation - Clean with Dropdowns */}
                        <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2" ref={dropdownRef}>
                            <div className="flex items-center gap-0.5 px-1 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/5">
                                {/* Primary Links */}
                                {primaryLinks.map(({ href, label }) => {
                                    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
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
                                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full transition-all duration-300" />
                                                )}
                                                <span className="relative z-10">{label}</span>
                                            </LinkComponent>
                                        </div>
                                    );
                                })}

                                {/* Divider */}
                                <div className="w-px h-4 bg-white/10 mx-1"></div>

                                {/* Work Dropdown */}
                                <NavDropdown dropdown={workDropdown} id="work" />

                                {/* More Dropdown */}
                                <NavDropdown dropdown={moreDropdown} id="more" />

                                {/* Divider */}
                                <div className="w-px h-4 bg-white/10 mx-1"></div>

                                {/* Contact - Always visible */}
                                <LinkComponent
                                    href="/contact"
                                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${pathname === '/contact'
                                        ? "text-white"
                                        : "text-color-text-muted hover:text-color-text"
                                        }`}
                                >
                                    {pathname === '/contact' && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full transition-all duration-300" />
                                    )}
                                    <span className="relative z-10">Contact</span>
                                </LinkComponent>
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
                                    {allNavLinks.map(({ href, label, icon: Icon, isNew }, index) => {
                                        const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
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
                                                    {isNew && (
                                                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full">
                                                            NEW
                                                        </span>
                                                    )}
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

        </>
    );
}
