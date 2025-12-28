"use client";

import { useState } from "react";
import { IoMailOutline, IoLocationOutline, IoSendOutline, IoPersonOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoLogoGithub, IoLogoTwitter, IoLogoLinkedin, IoSparkles, IoArrowForward } from "react-icons/io5";

export default function ContactContent() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        try {
            // Create mailto URL with form data
            const subject = encodeURIComponent(formData.subject);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            );

            // Open default email client with pre-filled fields
            window.location.href = `mailto:hey@codemeapixel.dev?subject=${subject}&body=${body}`;

            // Set success state and reset form
            setFormState('success');
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Error opening email client:", error);
            setFormState('error');
        }
    };

    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Animated floating orbs - CSS animations */}
            <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[120px] animate-float-slow" />
            <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[100px] animate-float-medium" />

            <div className="container-section max-w-6xl relative">
                <div className="mb-20 text-center animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-frost text-primary-300 text-sm font-semibold mb-8 animate-fade-in-up">
                        <IoSparkles className="w-4 h-4" />
                        <span>Let&apos;s Connect</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-color-text mb-6">
                        Get In <span className="animated-gradient-text text-shadow-glow">Touch</span>
                    </h1>
                    <p className="text-color-text-muted max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                        Have a question or want to work together? Feel free to reach out using the form below
                        or connect with me on social media.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Contact info column */}
                    <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="space-y-6">
                            {/* Contact Information Card */}
                            <div className="relative p-8 rounded-3xl glass-ultra overflow-hidden">
                                {/* Spotlight effect */}
                                <div className="absolute inset-0 spotlight opacity-40"></div>

                                {/* Decorative orb */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl"></div>

                                <div className="relative">
                                    <h2 className="text-2xl font-bold text-color-text mb-8">Contact Information</h2>

                                    <ul className="space-y-6">
                                        <li className="group">
                                            <a href="mailto:hey@codemeapixel.dev" className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl glass-frost text-primary-300 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                    <IoMailOutline className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold text-color-text mb-1">Email</h3>
                                                    <span className="text-primary-400 group-hover:text-primary-300 transition-colors">
                                                        hey@codemeapixel.dev
                                                    </span>
                                                </div>
                                            </a>
                                        </li>

                                        <li className="flex items-start gap-4 group">
                                            <div className="p-3 rounded-xl glass-frost text-primary-300 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <IoLocationOutline className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-color-text mb-1">Location</h3>
                                                <p className="text-color-text-muted">In a Igloo in Canada</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                    <span className="text-xs text-green-400 font-medium">Available for remote work</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Social Links Card */}
                            <div className="relative p-8 rounded-3xl glass-ultra overflow-hidden">
                                {/* Spotlight effect */}
                                <div className="absolute inset-0 spotlight opacity-40"></div>

                                <div className="relative">
                                    <h2 className="text-2xl font-bold text-color-text mb-6">Connect With Me</h2>
                                    <div className="flex flex-wrap gap-3">
                                        <SocialButton
                                            icon={<IoLogoGithub className="w-5 h-5" />}
                                            label="GitHub"
                                            href="https://github.com/codemeapixel"
                                            gradient="from-gray-700 to-gray-900"
                                        />
                                        <SocialButton
                                            icon={<IoLogoTwitter className="w-5 h-5" />}
                                            label="Twitter"
                                            href="https://twitter.com/codemeapixel"
                                            gradient="from-sky-500 to-sky-700"
                                        />
                                        <SocialButton
                                            icon={<IoLogoLinkedin className="w-5 h-5" />}
                                            label="LinkedIn"
                                            href="https://linkedin.com/in/codemeapixel"
                                            gradient="from-blue-600 to-blue-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact form column */}
                    <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="relative p-8 md:p-10 rounded-3xl glass-ultra overflow-hidden">
                            {/* Spotlight effect */}
                            <div className="absolute inset-0 spotlight opacity-30"></div>

                            {/* Decorative elements */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/15 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl"></div>

                            <div className="relative">
                                <h2 className="text-2xl font-bold text-color-text mb-8">Send Me a Message</h2>

                                {formState === 'success' ? (
                                    <div className="flex flex-col items-center text-center py-12 animate-fade-in">
                                        <div className="p-5 rounded-2xl glass-frost text-green-400 mb-6">
                                            <IoCheckmarkCircleOutline className="w-16 h-16" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-color-text mb-3">Message Sent!</h3>
                                        <p className="text-color-text-muted mb-8 text-lg">
                                            Thank you for reaching out. I&apos;ll get back to you as soon as possible!
                                        </p>
                                        <button
                                            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold overflow-hidden shine-sweep hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                            onClick={() => setFormState('idle')}
                                        >
                                            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></span>
                                            <span className="relative z-10 text-white flex items-center gap-2">
                                                Send Another Message
                                                <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </button>
                                    </div>
                                ) : formState === 'error' ? (
                                    <div className="flex flex-col items-center text-center py-12 animate-fade-in">
                                        <div className="p-5 rounded-2xl glass-frost text-red-400 mb-6">
                                            <IoCloseCircleOutline className="w-16 h-16" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-color-text mb-3">Something Went Wrong</h3>
                                        <p className="text-color-text-muted mb-8 text-lg">
                                            There was an error sending your message. Please try again or contact me directly via email.
                                        </p>
                                        <button
                                            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold overflow-hidden shine-sweep hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                            onClick={() => setFormState('idle')}
                                        >
                                            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></span>
                                            <span className="relative z-10 text-white">Try Again</span>
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-color-text text-sm font-semibold mb-3">
                                                    Your Name
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                        <IoPersonOutline className="text-primary-400 w-5 h-5" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full p-4 pl-12 rounded-xl glass-frost border-0 focus:ring-2 focus:ring-primary-500/50 transition-all text-color-text placeholder:text-color-text-muted/50"
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-color-text text-sm font-semibold mb-3">
                                                    Your Email
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                        <IoMailOutline className="text-primary-400 w-5 h-5" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full p-4 pl-12 rounded-xl glass-frost border-0 focus:ring-2 focus:ring-primary-500/50 transition-all text-color-text placeholder:text-color-text-muted/50"
                                                        placeholder="email@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-color-text text-sm font-semibold mb-3">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl glass-frost border-0 focus:ring-2 focus:ring-primary-500/50 transition-all text-color-text placeholder:text-color-text-muted/50"
                                                placeholder="How can I help you?"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-color-text text-sm font-semibold mb-3">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl glass-frost border-0 focus:ring-2 focus:ring-primary-500/50 transition-all text-color-text placeholder:text-color-text-muted/50 resize-y"
                                                placeholder="Your message here..."
                                                required
                                            ></textarea>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg overflow-hidden shine-sweep w-full sm:w-auto justify-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                                disabled={formState === 'submitting'}
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-[gradient-x_3s_linear_infinite]"></span>
                                                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-500 to-primary-400"></span>
                                                <span className="relative z-10 flex items-center gap-3 text-white">
                                                    {formState === 'submitting' ? (
                                                        <>
                                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span>Sending...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IoSendOutline className="w-5 h-5" />
                                                            <span>Send Message</span>
                                                            <IoArrowForward className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface SocialButtonProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    gradient: string;
}

function SocialButton({ icon, label, href, gradient }: SocialButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-5 py-3 rounded-xl glass-frost overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
        >
            {/* Hover gradient background */}
            <span className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>

            <span className="relative z-10 flex items-center gap-3">
                <span className="text-primary-300 group-hover:text-white transition-colors">{icon}</span>
                <span className="text-sm font-semibold text-color-text-muted group-hover:text-white transition-colors">{label}</span>
            </span>
        </a>
    );
}
