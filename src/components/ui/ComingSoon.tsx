"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHome, IoTimeOutline, IoRocketOutline } from "react-icons/io5";

interface ComingSoonProps {
    title?: string;
    description?: string;
    showNavbar?: boolean;
    showBackToHome?: boolean;
    showNotification?: boolean;
    launchDate?: Date;
    completionPercentage?: number;
    customBackLink?: {
        href: string;
        label: string;
    };
}

export default function ComingSoon({
    title = "Coming Soon",
    description = "We're working hard to finish the development of this page. Stay tuned for something amazing!",
    showNavbar = false,
    showBackToHome = true,
    showNotification = true,
    launchDate,
    completionPercentage = 75,
    customBackLink,
}: ComingSoonProps) {
    const [mounted, setMounted] = useState(false);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Set a future date if not provided - 30 days from now by default
    useEffect(() => {
        setMounted(true);

        const targetDate = launchDate || new Date(new Date().setDate(new Date().getDate() + 30));

        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalId);
    }, [launchDate]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-bg-alt relative">
            {/* Background grid effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 pixel-grid-layer-1"></div>
                <div className="absolute inset-0 pixel-grid-layer-2"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden blur-lg">
                <motion.div
                    className="absolute text-primary-900/10 text-[8rem] md:text-[12rem] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Coming Soon
                </motion.div>

                <motion.div
                    className="absolute top-[15%] right-[10%] text-primary-700/30 font-mono transform rotate-12 pointer-events-none z-0"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="text-xs md:text-base bg-primary-900/10 px-3 py-1 rounded-md border border-primary-700/20">
                        {'<UnderConstruction />'}
                    </div>
                </motion.div>
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center mb-6 bg-primary-900/20 text-primary-300 px-4 py-2 rounded-lg border border-primary-700/30">
                        <IoRocketOutline className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Under Construction</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {title}
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl text-color-text-muted mb-10 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {description}
                </motion.p>

                {/* Countdown timer */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <CountdownUnit value={countdown.days} label="Days" />
                    <CountdownUnit value={countdown.hours} label="Hours" />
                    <CountdownUnit value={countdown.minutes} label="Minutes" />
                    <CountdownUnit value={countdown.seconds} label="Seconds" />
                </motion.div>

                {/* Progress indicator - MOVED ABOVE BUTTONS */}
                <motion.div
                    className="mx-auto max-w-md mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="bg-card border border-primary-800/30 rounded-lg p-4 shadow-lg">
                        <div className="flex items-center mb-2">
                            <IoTimeOutline className="w-5 h-5 text-primary-400 mr-2" />
                            <p className="text-sm text-color-text-muted">Development progress</p>
                        </div>
                        <div className="w-full bg-bg-alt rounded-full h-2.5 mb-1 overflow-hidden">
                            <motion.div
                                className="bg-gradient-to-r from-primary-600 to-primary-400 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${completionPercentage}%` }}
                                transition={{ duration: 1, delay: 0.7 }}
                            />
                        </div>
                        <p className="text-right text-xs text-primary-300">{completionPercentage}% complete</p>
                    </div>
                </motion.div>

                {/* Action buttons - NOW BELOW PROGRESS BAR */}
                <motion.div
                    className="flex flex-wrap gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {showBackToHome && (
                        <Link
                            href={customBackLink?.href || "/"}
                            className="btn-primary group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center">
                                <IoHome className="mr-2 w-5 h-5" />
                                {customBackLink?.label || "Back to Home"}
                            </span>
                            <motion.span
                                className="absolute inset-0 bg-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    )}

                    {showNotification && <NotificationForm />}
                </motion.div>
            </div>
        </div>
    );
}

// Countdown unit component
function CountdownUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex-1 min-w-[80px] bg-card border border-primary-800/30 rounded-lg p-3 shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-300 mb-1">
                {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-color-text-muted uppercase tracking-wider">
                {label}
            </div>
        </div>
    );
}

// Notification signup form
function NotificationForm() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the email to your API
        console.log("Email submitted:", email);
        setIsSubmitted(true);
        setEmail("");

        // Reset the submitted state after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="relative group">
            {!isSubmitted ? (
                <button
                    onClick={() => document.getElementById('notify-form')?.classList.toggle('hidden')}
                    className="btn-secondary flex items-center"
                >
                    Notify Me
                </button>
            ) : (
                <div className="btn-secondary text-primary-300 flex items-center">
                    ✓ We'll notify you!
                </div>
            )}

            <form
                id="notify-form"
                onSubmit={handleSubmit}
                className="hidden absolute top-full mt-2 right-0 w-64 p-3 bg-card border border-primary-800/30 rounded-lg shadow-lg z-20"
            >
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-2 rounded bg-bg-alt border border-primary-800/30 text-color-text text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}
