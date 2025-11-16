"use client";

import { motion } from "motion/react";
import { useState, memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { FiMail, FiMessageSquare, FiUser, FiSend, FiChevronDown, FiClock, FiHeadphones } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { BsDiscord } from "react-icons/bs";
import Image from "next/image";

const ContactMethod = memo(({ emoji, title, description, action, link, index }: {
    emoji: string;
    title: string;
    description: string;
    action: string;
    link: string;
    index: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
    >
        <div className="p-6 border border-muted rounded-lg bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{emoji}</span>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted mb-4 flex-grow">{description}</p>
            <a
                href={link}
                onClick={(e) => {
                    if (link === '#live-chat') {
                        e.preventDefault();
                        // @ts-ignore
                        if (typeof window !== 'undefined' && (window as any).$chatwoot) {
                            // @ts-ignore
                            (window as any).$chatwoot.toggle();
                        }
                    }
                }}
                target={link.startsWith('http') ? '_blank' : '_self'}
                rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-accent text-sm font-medium hover:underline flex items-center gap-2 group-hover:gap-3 transition-all"
            >
                {action}
                <svg className="w-4 h-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
            </a>
        </div>
    </motion.div>
));

ContactMethod.displayName = 'ContactMethod';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

    const departments = [
        "General Support",
        "Technical Support",
        "Billing & Payments",
        "Sales",
        "Partnerships",
        "Abuse Reports"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const resp = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await resp.json();
            if (!resp.ok || !result.success) {
                throw new Error(result.error || 'Failed to submit');
            }
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", department: "", subject: "", message: "" });
        } catch (err) {
            alert("Failed to send message. Please try again later.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
                <Spotlight />
            </div>
            <Navbar />

            <div className="relative px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 md:mt-32">
                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            We&apos;re Here to Help
                        </h1>
                        <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto">
                            Got questions? Feedback? Just want to say hi? Reach out to our team anytime. We&apos;re committed to providing exceptional support for all your hosting needs.
                        </p>
                    </motion.div>

                    {/* Contact Methods Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    >
                        <ContactMethod
                            emoji="📩"
                            title="General Support"
                            description="Questions about our services or need technical assistance"
                            action="Email us"
                            link="mailto:support@expanse.host"
                            index={0}
                        />

                        <ContactMethod
                            emoji="💬"
                            title="Live Chat"
                            description="Get immediate help from our technical team"
                            action="Start chat"
                            link="#live-chat"
                            index={1}
                        />

                        <ContactMethod
                            emoji="🧾"
                            title="Billing & Payments"
                            description="Questions about invoices, payments, or subscriptions"
                            action="Contact billing"
                            link="https://my.expanse.host/submitticket.php"
                            index={2}
                        />

                        <ContactMethod
                            emoji="🚨"
                            title="Abuse Reports"
                            description="Report abuse or security concerns"
                            action="Submit report"
                            link="mailto:abuse@expanse.host"
                            index={3}
                        />

                        <ContactMethod
                            emoji="🤝"
                            title="Partnerships"
                            description="Explore collaboration opportunities with us"
                            action="Discuss partnership"
                            link="mailto:arc@expanse.host"
                            index={4}
                        />
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Contact Form */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="backdrop-blur-sm border border-muted rounded-lg bg-card/50 p-6">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:border-accent transition-all text-foreground placeholder:text-muted/50"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:border-accent transition-all text-foreground placeholder:text-muted/50"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="department" className="block text-sm font-medium text-foreground mb-2">
                                            Department
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
                                                className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:border-accent transition-all text-foreground text-left flex items-center justify-between"
                                            >
                                                <span className={formData.department ? "text-foreground" : "text-muted/50"}>
                                                    {formData.department || "Select department"}
                                                </span>
                                                <FiChevronDown className={`w-5 h-5 text-muted transition-transform ${isDepartmentOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isDepartmentOpen && (
                                                <div className="absolute z-10 w-full mt-2 bg-card border border-muted rounded-lg shadow-lg overflow-hidden">
                                                    {departments.map((dept) => (
                                                        <button
                                                            key={dept}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, department: dept }));
                                                                setIsDepartmentOpen(false);
                                                            }}
                                                            className="w-full px-4 py-2 text-left text-foreground hover:bg-muted/10 transition-colors"
                                                        >
                                                            {dept}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:border-accent transition-all text-foreground placeholder:text-muted/50"
                                            placeholder="What&apos;s this about?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:border-accent transition-all text-foreground placeholder:text-muted/50 resize-none"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Right Side - Support Hours */}
                        <div>
                            {/* Support Hours */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="backdrop-blur-sm border border-muted rounded-lg bg-card/50 p-6"
                            >
                                <h2 className="text-2xl font-bold text-foreground mb-4">Support Hours</h2>
                                
                                <div className="space-y-4 mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <FiHeadphones className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-1">24/7 Technical Support</h3>
                                            <p className="text-sm text-muted">Our technical team is available around the clock to assist with urgent issues.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <FiClock className="w-5 h-5 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-foreground mb-3">Response Times</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center p-2 bg-muted/10 rounded">
                                                    <span className="text-sm text-foreground">Live Chat</span>
                                                    <span className="text-sm font-medium text-accent">Under 30 minutes</span>
                                                </div>
                                                <div className="flex justify-between items-center p-2 bg-muted/10 rounded">
                                                    <span className="text-sm text-foreground">Support Tickets</span>
                                                    <span className="text-sm font-medium text-accent">Under 3 hours</span>
                                                </div>
                                                <div className="flex justify-between items-center p-2 bg-muted/10 rounded">
                                                    <span className="text-sm text-foreground">Email Inquiries</span>
                                                    <span className="text-sm font-medium text-accent">Under 24 hours</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-muted pt-4 border-t border-muted">
                                    Current Status: All systems operational. Average response time is currently under 15 minutes.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Help Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Looking for instant help?</h2>
                        <p className="text-sm sm:text-base text-muted mb-6">
                            Check our comprehensive knowledge base or join our community for real-time assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://kb.expanse.host"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all"
                            >
                                Visit Help Center
                                <svg className="w-5 h-5" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24">
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://discord.expanse.host"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-muted hover:border-accent text-foreground rounded-lg font-semibold transition-all"
                            >
                                <BsDiscord className="w-5 h-5" />
                                Join Discord Community
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

