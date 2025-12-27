"use client";

import { motion } from "framer-motion";
import { IoTimeOutline, IoCheckmarkCircle, IoCloseCircle, IoChatbubblesOutline, IoFlashOutline, IoHeartOutline, IoSparkles, IoCopyOutline, IoCheckmark } from "react-icons/io5";
import { useState } from "react";

interface ChatMessage {
    text: string;
    time: string;
    day?: string;
}

interface ChatBubbleProps {
    messages: ChatMessage[];
    isRight?: boolean;
    avatar: string;
    name: string;
    delay?: number;
}

function ChatBubble({ messages, isRight = false, avatar, name, delay = 0 }: ChatBubbleProps) {
    return (
        <motion.div
            className={`flex gap-3 ${isRight ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, x: isRight ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
        >
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold ${isRight ? 'bg-gradient-to-br from-primary-500 to-primary-600' : 'bg-gradient-to-br from-gray-600 to-gray-700'} shadow-lg`}>
                {avatar}
            </div>

            {/* Messages */}
            <div className={`flex flex-col gap-1.5 max-w-[280px] ${isRight ? 'items-end' : 'items-start'}`}>
                <span className={`text-xs text-color-text-muted px-1 ${isRight ? 'text-right' : ''}`}>{name}</span>
                {messages.map((msg, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                        {msg.day && (
                            <span className="text-[10px] text-color-text-muted/60 px-2 py-1 text-center">{msg.day}</span>
                        )}
                        <div className={`px-4 py-2.5 rounded-2xl ${isRight
                            ? 'bg-gradient-to-br from-primary-500/90 to-primary-600/90 text-white rounded-br-md'
                            : 'glass-frost rounded-bl-md'
                            }`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className={`text-[10px] text-color-text-muted/60 px-2 ${isRight ? 'text-right' : ''}`}>{msg.time}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function JustAskContent() {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText("https://codemeapixel.dev/just-ask");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden min-h-screen">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Animated floating orbs */}
            <motion.div
                className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="absolute top-[50%] left-[50%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 blur-[80px]"
                animate={{ scale: [1, 1.2, 1], x: [-50, 50, -50], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container-section max-w-4xl relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <motion.span
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-frost rounded-full mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <IoFlashOutline className="w-4 h-4" />
                        Communication Etiquette
                    </motion.span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="text-color-text">Just </span>
                        <span className="animated-gradient-text text-shadow-glow">Ask</span>
                    </h1>

                    <p className="text-lg md:text-xl text-color-text-muted max-w-2xl mx-auto leading-relaxed">
                        Skip the pleasantries. Respect my time, and I&apos;ll respect yours.
                        Let&apos;s communicate efficiently.
                    </p>
                </motion.div>

                {/* Why Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="glass-ultra rounded-3xl p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute inset-0 shine-sweep"></div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center">
                                <IoTimeOutline className="w-6 h-6 text-primary-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-color-text">Why?</h2>
                        </div>

                        <div className="space-y-4 text-color-text-muted leading-relaxed">
                            <p>
                                Unnecessary pleasantries waste time in task-based conversations.
                                When you message just &ldquo;Hello&rdquo; and wait for a response before asking your actual question,
                                you&apos;re creating unnecessary back-and-forth that can stretch a simple exchange over hours or even days.
                            </p>
                            <p>
                                If someone shared this link with you or you see it in my profile, it means
                                <span className="text-primary-400 font-medium"> I won&apos;t be offended</span> if you skip the pleasantries
                                and get straight to the point. Do still be polite, and feel free to have social conversations when appropriate!
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Comparison Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {/* Bad Example */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="glass-ultra rounded-3xl p-6 md:p-8 relative overflow-hidden border border-red-500/20">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                    <IoCloseCircle className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-color-text">The Painful Way</h3>
                                    <p className="text-xs text-color-text-muted">9 messages over 3 days</p>
                                </div>
                            </div>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                <ChatBubble
                                    avatar="Y"
                                    name="You"
                                    isRight={true}
                                    messages={[{ text: "Hey", time: "14:30", day: "Monday" }]}
                                    delay={0.1}
                                />
                                <ChatBubble
                                    avatar="C"
                                    name="CodeMeAPixel"
                                    messages={[{ text: "Hi there!", time: "16:45" }]}
                                    delay={0.2}
                                />
                                <ChatBubble
                                    avatar="Y"
                                    name="You"
                                    isRight={true}
                                    messages={[{ text: "How's it going?", time: "16:52" }]}
                                    delay={0.3}
                                />
                                <ChatBubble
                                    avatar="C"
                                    name="CodeMeAPixel"
                                    messages={[{ text: "Good, you?", time: "17:30" }]}
                                    delay={0.4}
                                />
                                <ChatBubble
                                    avatar="Y"
                                    name="You"
                                    isRight={true}
                                    messages={[{ text: "Great! So I have a question about React...", time: "10:15", day: "Tuesday" }]}
                                    delay={0.5}
                                />
                                <ChatBubble
                                    avatar="C"
                                    name="CodeMeAPixel"
                                    messages={[{ text: "Sure, what's up?", time: "15:08" }]}
                                    delay={0.6}
                                />
                                <ChatBubble
                                    avatar="Y"
                                    name="You"
                                    isRight={true}
                                    messages={[{ text: "How do I fix hydration errors in Next.js?", time: "15:22" }]}
                                    delay={0.7}
                                />
                                <ChatBubble
                                    avatar="C"
                                    name="CodeMeAPixel"
                                    messages={[{ text: "Add suppressHydrationWarning to the html tag and use a mounted state for client-only code.", time: "11:30", day: "Wednesday" }]}
                                    delay={0.8}
                                />
                                <ChatBubble
                                    avatar="Y"
                                    name="You"
                                    isRight={true}
                                    messages={[{ text: "That fixed it! Thanks!", time: "14:15" }]}
                                    delay={0.9}
                                />
                            </div>

                            <div className="mt-6 pt-4 border-t border-red-500/10">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-color-text-muted">Total time wasted:</span>
                                    <span className="text-red-400 font-bold">~3 days</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Good Example */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative"
                    >
                        <div className="glass-ultra rounded-3xl p-6 md:p-8 relative overflow-hidden border border-green-500/20">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <IoCheckmarkCircle className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-color-text">The Better Way</h3>
                                    <p className="text-xs text-color-text-muted">3 messages in 10 minutes</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <ChatBubble
                                    avatar="Y"
                                    name="You"
                                    isRight={true}
                                    messages={[{
                                        text: "Hey! Quick question - I'm getting hydration errors in Next.js when using localStorage. The error says server/client mismatch. Any ideas?",
                                        time: "14:30",
                                        day: "Monday"
                                    }]}
                                    delay={0.2}
                                />
                                <ChatBubble
                                    avatar="C"
                                    name="CodeMeAPixel"
                                    messages={[{
                                        text: "Hey! Classic issue. Add a mounted state, return null until mounted, then access localStorage in useEffect. Also add suppressHydrationWarning to your html tag. 👍",
                                        time: "14:42"
                                    }]}
                                    delay={0.4}
                                />
                                <ChatBubble
                                    avatar="Y"
                                    name="You"
                                    isRight={true}
                                    messages={[{ text: "Perfect, that fixed it! Appreciate the quick help 🙏", time: "14:55" }]}
                                    delay={0.6}
                                />
                            </div>

                            <div className="mt-6 pt-4 border-t border-green-500/10">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-color-text-muted">Total time:</span>
                                    <span className="text-green-400 font-bold">10 minutes</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Key Points */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="glass-ultra rounded-3xl p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute inset-0 shine-sweep"></div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center">
                                <IoChatbubblesOutline className="w-6 h-6 text-primary-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-color-text">The Key Points</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: IoFlashOutline,
                                    title: "Include Context",
                                    description: "Put your question in the first message. Don't make me wait to find out what you need."
                                },
                                {
                                    icon: IoHeartOutline,
                                    title: "Still Be Polite",
                                    description: "Being efficient doesn't mean being rude. A friendly tone is always welcome."
                                },
                                {
                                    icon: IoTimeOutline,
                                    title: "Respect Time",
                                    description: "Every unnecessary message adds delay. Context-switching has a real cost."
                                },
                                {
                                    icon: IoSparkles,
                                    title: "Be Specific",
                                    description: "The more details you provide upfront, the faster I can give you a helpful answer."
                                }
                            ].map((point, i) => (
                                <motion.div
                                    key={point.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                                        <point.icon className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-color-text mb-1">{point.title}</h3>
                                        <p className="text-sm text-color-text-muted">{point.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="glass-ultra rounded-3xl p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5"></div>
                        <div className="absolute inset-0 shine-sweep"></div>

                        <div className="relative">
                            <h2 className="text-2xl md:text-3xl font-bold text-color-text mb-4">
                                Share This Philosophy
                            </h2>
                            <p className="text-color-text-muted mb-8 max-w-lg mx-auto">
                                Feel free to share this page with others. Let&apos;s make async communication more efficient, together.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.button
                                    onClick={handleCopyLink}
                                    className="group relative px-8 py-4 rounded-2xl font-semibold overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-400 to-primary-500 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center gap-2 text-white">
                                        {copied ? (
                                            <>
                                                <IoCheckmark className="w-5 h-5" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <IoCopyOutline className="w-5 h-5" />
                                                Copy Link
                                            </>
                                        )}
                                    </span>
                                </motion.button>

                                <motion.a
                                    href="/contact"
                                    className="group relative px-8 py-4 rounded-2xl font-semibold glass-frost overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary-500/10 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center gap-2 text-color-text">
                                        <IoChatbubblesOutline className="w-5 h-5" />
                                        Contact Me
                                    </span>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-sm text-color-text-muted mt-12"
                >
                    Inspired by{" "}
                    <a
                        href="https://nohello.club"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        nohello.club
                    </a>
                </motion.p>
            </div>
        </section>
    );
}
