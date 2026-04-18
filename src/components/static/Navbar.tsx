"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import MobileThemeMenu from "./MobileThemeMenu";
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { CMAP } from "../icons/CMAP";
import { FaStar } from "react-icons/fa";
import { usePathname } from "next/navigation";
import packageJson from "@/../package.json";
import {
    IoHomeOutline, IoPersonOutline, IoNewspaperOutline, IoCodeSlashOutline,
    IoFolderOutline, IoStarOutline, IoMailOutline, IoFlashOutline,
    IoGameControllerOutline, IoGridOutline, IoLogoGithub
} from "react-icons/io5";

const primaryLinks = [
    { href: "/", label: "Home", icon: IoHomeOutline },
    { href: "/about", label: "About", icon: IoPersonOutline },
    { href: "/blog", label: "Blog", icon: IoNewspaperOutline },
];

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
        { href: "/just-ask", label: "Just Ask", icon: IoFlashOutline, description: "Chat etiquette guide" },
        { href: '/docs', label: 'Docs', icon: IoGridOutline, description: 'Documentation for my projects' },
    ]
};

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
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${hasActiveItem
                        ? "text-color-text"
                        : "text-color-text-muted hover:text-color-text"
                        }`}
                >
                    {dropdown.label}
                    <IoChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-52 py-1 bg-card border border-color-border rounded-lg shadow-xl shadow-black/40 animate-fade-in z-50">
                        {dropdown.items.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-start gap-3 px-3 py-2.5 mx-1 rounded-md transition-colors duration-150 ${isActive
                                        ? "bg-primary-500/10 text-primary-400"
                                        : "text-color-text-muted hover:text-color-text hover:bg-card-alt"
                                        }`}
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-primary-400' : ''}`} />
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{item.label}</span>
                                            {item.isNew && (
                                                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-primary-500/20 text-primary-400 rounded border border-primary-500/30">
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[11px] text-color-text-muted/60 line-clamp-1">{item.description}</span>
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
            <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-200">
                {/* Background */}
                <div className={`absolute inset-0 transition-all duration-200 ${isScrolled
                    ? "bg-bg/90 backdrop-blur-xl border-b border-color-border"
                    : "bg-transparent"
                    }`} />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group shrink-0">
                            <CMAP className="w-7 h-7 text-primary-400 fill-primary-500 transition-colors duration-200 group-hover:text-primary-300" />
                            <span className="text-sm font-semibold text-color-text hidden sm:block">
                                CodeMeAPixel
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
                            {primaryLinks.map(({ href, label }) => {
                                const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
                                return (
                                    <LinkComponent
                                        key={href}
                                        href={href}
                                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${isActive
                                            ? "text-color-text"
                                            : "text-color-text-muted hover:text-color-text"
                                            }`}
                                    >
                                        {label}
                                    </LinkComponent>
                                );
                            })}

                            <div className="w-px h-4 bg-color-border mx-1" />
                            <NavDropdown dropdown={workDropdown} id="work" />
                            <NavDropdown dropdown={moreDropdown} id="more" />
                            <div className="w-px h-4 bg-color-border mx-1" />

                            <LinkComponent
                                href="/contact"
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${pathname === '/contact'
                                    ? "text-color-text"
                                    : "text-color-text-muted hover:text-color-text"
                                    }`}
                            >
                                Contact
                            </LinkComponent>
                        </nav>

                        {/* Right side */}
                        <div className="hidden lg:flex items-center gap-2 shrink-0">
                            <a
                                href="https://github.com/CodeMeAPixel/Portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-color-text-muted hover:text-color-text border border-color-border rounded-md hover:border-primary-500/30 transition-all duration-150"
                            >
                                <FaStar className="w-3 h-3" />
                                <span>Star</span>
                            </a>
                            {isLoaded && <ThemeSelector />}
                        </div>

                        {/* Mobile controls */}
                        <div className="flex items-center gap-2 lg:hidden">
                            {isLoaded && <MobileThemeMenu />}
                            <button
                                className={`p-2 rounded-md transition-colors duration-150 ${isMenuOpen
                                    ? 'bg-primary-500/10 text-primary-400'
                                    : 'text-color-text-muted hover:text-color-text hover:bg-card'
                                    }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <IoClose className="w-5 h-5" /> : <IoMenu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                            style={{ zIndex: 9998 }}
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <div
                            className="fixed top-14 left-3 right-3 lg:hidden bg-card border border-color-border shadow-2xl shadow-black/50 overflow-hidden animate-fade-in rounded-xl"
                            style={{ zIndex: 9999, maxHeight: 'calc(100vh - 72px)' }}
                        >
                            <div className="py-2 px-1.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                                {allNavLinks.map(({ href, label, icon: Icon, isNew }) => {
                                    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
                                    return (
                                        <LinkComponent
                                            key={href}
                                            href={href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ${isActive
                                                ? "bg-primary-500/10 text-primary-400"
                                                : "text-color-text-muted hover:text-color-text hover:bg-card-alt"
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                                            <span className="text-sm font-medium">{label}</span>
                                            {isNew && (
                                                <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold bg-primary-500/20 text-primary-400 rounded border border-primary-500/30">
                                                    NEW
                                                </span>
                                            )}
                                        </LinkComponent>
                                    );
                                })}
                            </div>

                            <div className="px-4 py-2.5 border-t border-color-border flex items-center justify-between">
                                <span className="text-[11px] text-color-text-muted">v{packageJson.version}</span>
                                <a
                                    href="https://github.com/CodeMeAPixel/Portfolio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[11px] text-primary-400 hover:text-primary-300 transition-colors"
                                >
                                    <FaStar className="w-3 h-3" />
                                    <span>Star on GitHub</span>
                                </a>
                            </div>
                        </div>
                    </>
                )}

            </header >

        </>
    );
}
