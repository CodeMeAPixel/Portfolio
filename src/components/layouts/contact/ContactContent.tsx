"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoMailOutline, IoLocationOutline, IoSendOutline, IoPersonOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoLogoGithub, IoLogoTwitter, IoLogoLinkedin, IoCodeSlashOutline } from "react-icons/io5";

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
        <section className="py-24 bg-bg-alt relative z-10">
            <div className="container-section max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h1 className="heading-primary mb-4">Get In Touch</h1>
                    <p className="text-color-text-muted max-w-2xl mx-auto">
                        Have a question or want to work together? Feel free to reach out using the form below
                        or connect with me on social media.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
                    {/* Contact info column */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="space-y-8">
                            <div className="card">
                                <h2 className="heading-secondary mb-6">Contact Information</h2>

                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary-900/30 text-primary-300 p-3 rounded-lg flex-shrink-0 border border-primary-700/30">
                                            <IoMailOutline className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-color-text mb-1">Email</h3>
                                            <a
                                                href="mailto:hello@codemeapixel.dev"
                                                className="text-primary-400 hover:text-primary-300 transition-colors"
                                            >
                                                hey@codemeapixel.dev
                                            </a>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary-900/30 text-primary-300 p-3 rounded-lg flex-shrink-0 border border-primary-700/30">
                                            <IoLocationOutline className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-color-text mb-1">Location</h3>
                                            <p className="text-color-text-muted">Alberta, Canada</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="card">
                                <h2 className="heading-secondary mb-6">Connect With Me</h2>
                                <div className="flex flex-wrap gap-3">
                                    <SocialButton
                                        icon={<IoLogoGithub className="w-5 h-5" />}
                                        label="GitHub"
                                        href="https://github.com/codemeapixel"
                                    />
                                    <SocialButton
                                        icon={<IoLogoTwitter className="w-5 h-5" />}
                                        label="Twitter"
                                        href="https://twitter.com/codemeapixel"
                                    />
                                    <SocialButton
                                        icon={<IoLogoLinkedin className="w-5 h-5" />}
                                        label="LinkedIn"
                                        href="https://linkedin.com/in/codemeapixel"
                                    />
                                    <SocialButton
                                        icon={<IoCodeSlashOutline className="w-5 h-5" />}
                                        label="Portfolio"
                                        href="/"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact form column */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="card">
                            <h2 className="heading-secondary mb-6">Send Me a Message</h2>

                            {formState === 'success' ? (
                                <div className="flex flex-col items-center text-center py-8">
                                    <div className="bg-primary-900/30 text-primary-300 p-4 rounded-full mb-4 border border-primary-700/30">
                                        <IoCheckmarkCircleOutline className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-color-text mb-2">Message Sent!</h3>
                                    <p className="text-color-text-muted mb-6">
                                        Thank you for reaching out. I&apos;ll get back to you as soon as possible!
                                    </p>
                                    <button
                                        className="btn-primary"
                                        onClick={() => setFormState('idle')}
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : formState === 'error' ? (
                                <div className="flex flex-col items-center text-center py-8">
                                    <div className="bg-red-900/30 text-red-300 p-4 rounded-full mb-4 border border-red-700/30">
                                        <IoCloseCircleOutline className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-color-text mb-2">Something Went Wrong</h3>
                                    <p className="text-color-text-muted mb-6">
                                        There was an error sending your message. Please try again or contact me directly via email.
                                    </p>
                                    <button
                                        className="btn-primary"
                                        onClick={() => setFormState('idle')}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-color-text-muted text-sm font-medium mb-2">
                                                Your Name
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <IoPersonOutline className="text-primary-400 w-5 h-5" />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full p-3 pl-10 rounded-lg bg-card-alt border border-color-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-color-text"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-color-text-muted text-sm font-medium mb-2">
                                                Your Email
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <IoMailOutline className="text-primary-400 w-5 h-5" />
                                                </div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full p-3 pl-10 rounded-lg bg-card-alt border border-color-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-color-text"
                                                    placeholder="email@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-color-text-muted text-sm font-medium mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg bg-card-alt border border-color-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-color-text"
                                            placeholder="How can I help you?"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-color-text-muted text-sm font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg bg-card-alt border border-color-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-color-text resize-y"
                                            placeholder="Your message here..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn-primary w-full sm:w-auto flex items-center gap-2 justify-center"
                                            disabled={formState === 'submitting'}
                                        >
                                            {formState === 'submitting' ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <IoSendOutline className="w-5 h-5" />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

interface SocialButtonProps {
    icon: React.ReactNode;
    label: string;
    href: string;
}

function SocialButton({ icon, label, href }: SocialButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary-900/30 hover:bg-primary-800/40 text-primary-300 rounded-lg transition-colors border border-primary-700/30 hover:border-primary-600/40"
        >
            {icon}
            <span>{label}</span>
        </a>
    );
}
