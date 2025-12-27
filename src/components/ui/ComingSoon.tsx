"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHome, IoTimeOutline, IoRocketOutline, IoSparkles } from "react-icons/io5";

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
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-bg">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-accent-500/15 to-primary-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center mb-6 glass-frost px-4 py-2 rounded-full">
                        <IoRocketOutline className="w-4 h-4 mr-2 text-primary-400" />
                        <span className="text-xs font-medium text-primary-300">Under Construction</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="animated-gradient-text text-shadow-glow">{title}</span>
                </motion.h1>

                <motion.p
                    className="text-base sm:text-lg text-color-text-muted mb-10 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {description}
                </motion.p>

                {/* Countdown timer - Premium Cards */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <CountdownUnit value={countdown.days} label="Days" />
                    <CountdownUnit value={countdown.hours} label="Hours" />
                    <CountdownUnit value={countdown.minutes} label="Minutes" />
                    <CountdownUnit value={countdown.seconds} label="Seconds" />
                </motion.div>

                {/* Progress indicator - Premium Glass */}
                <motion.div
                    className="mx-auto max-w-md mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="glass-ultra rounded-2xl p-5">
                        <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 mr-3">
                                <IoTimeOutline className="w-4 h-4 text-primary-400" />
                            </div>
                            <p className="text-sm text-color-text">Development progress</p>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 mb-2 overflow-hidden">
                            <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${completionPercentage}%` }}
                                transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-right text-xs text-primary-300 font-medium">{completionPercentage}% complete</p>
                    </div>
                </motion.div>

                {/* Action buttons - Premium */}
                <motion.div
                    className="flex flex-wrap gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {showBackToHome && (
                        <Link
                            href={customBackLink?.href || "/"}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] transition-all duration-300"
                        >
                            <IoHome className="w-5 h-5" />
                            {customBackLink?.label || "Back to Home"}
                        </Link>
                    )}

                    {showNotification && <NotificationForm />}
                </motion.div>
            </div>
        </div>
    );
}

// Countdown unit component - Premium Glass
function CountdownUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="glass-ultra rounded-xl p-4 min-w-[80px] shine-sweep">
            <div className="text-2xl sm:text-3xl font-bold animated-gradient-text mb-1">
                {value.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] text-color-text-muted uppercase tracking-wider font-medium">
                {label}
            </div>
        </div>
    );
}

// Notification signup form - Premium Glass
function NotificationForm() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setIsSubmitted(true);
        setEmail("");

        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="relative group">
            {!isSubmitted ? (
                <button
                    onClick={() => document.getElementById('notify-form')?.classList.toggle('hidden')}
                    className="inline-flex items-center gap-2 px-6 py-3 glass-frost text-color-text font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                    <IoSparkles className="w-4 h-4 text-primary-400" />
                    Notify Me
                </button>
            ) : (
                <div className="inline-flex items-center gap-2 px-6 py-3 glass-frost text-primary-300 font-semibold rounded-xl">
                    ✓ We'll notify you!
                </div>
            )}

            <form
                id="notify-form"
                onSubmit={handleSubmit}
                className="hidden absolute top-full mt-2 right-0 w-64 p-4 glass-ultra rounded-xl z-20"
            >
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 mb-2 rounded-lg bg-white/5 border border-white/10 text-color-text text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none placeholder:text-color-text-muted/50 transition-all"
                    required
                />
                <button
                    type="submit"
                    className="w-full px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}
