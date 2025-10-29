"use client";

import { motion } from "framer-motion";
import { useState, memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { FiMail, FiMessageSquare, FiUser, FiSend } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { BsDiscord } from "react-icons/bs";

const ContactMethod = memo(({ icon, title, description, action, index }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action: string;
    index: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
    >
        <div className="p-6 border-t rounded-r-xl border-b border-r mt-8 border-muted bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full">
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted mb-4">{description}</p>
            <button className="text-accent text-sm font-medium hover:underline flex items-center gap-2">
                {action}
                <svg className="w-4 h-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
            </button>
        </div>
    </motion.div>
));

ContactMethod.displayName = 'ContactMethod';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Add your form submission logic here
        setTimeout(() => {
            setIsSubmitting(false);
            // Reset form or show success message
        }, 2000);
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

            {/* Hero Section */}
            <div className="relative px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 md:mt-32">
                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-left mb-6 "
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            Get in <span className="text-accent">Touch</span>
                        </h1>
                        <p className="text-sm sm:text-base text-muted max-w-2xl">
                            Have questions about our services? Need help with your hosting? Our team is here to help you 24/7.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2  items-start mb-20">
                        {/* Contact Form */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className=" backdrop-blur-sm border border-muted rounded-md">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name Field */}
                                    <div className="px-8 py-2">
                                        <div >
                                            <label htmlFor="name" className="py-2 block text-sm font-medium text-foreground mb-2">
                                                Your Name
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <FiUser className="h-5 w-5 text-muted" />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 rounded-r-full bg-background border-l-4 border-t border-b border-r border-muted  focus:outline-none transition-all text-foreground placeholder:text-muted/50"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label htmlFor="email" className="pt-4 block text-sm font-medium text-foreground mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <FiMail className="h-5 w-5 text-muted" />
                                                </div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 rounded-r-full bg-background border-l-4 border-t border-b border-r border-muted  focus:outline-none transition-all text-foreground placeholder:text-muted/50"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject Field */}
                                        <div>
                                            <label htmlFor="subject" className="pt-4 block text-sm font-medium text-foreground mb-2">
                                                Subject
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <FiMessageSquare className="h-5 w-5 text-muted" />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 rounded-r-full bg-background border-l-4 border-t border-b border-r border-muted  focus:outline-none transition-all text-foreground placeholder:text-muted/50"
                                                    placeholder="How can we help?"
                                                />
                                            </div>
                                        </div>

                                        {/* Message Field */}
                                        <div>
                                            <label htmlFor="message" className="pt-4 block text-sm font-medium text-foreground mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 bg-background border border-muted  focus:outline-none transition-all text-foreground placeholder:text-muted/50 resize-none"
                                                placeholder="Tell us more about your inquiry..."
                                            />
                                        </div>
                                    </div>
                                    {/* Submit Button */}
                                    <div className="flex justify-end  pb-4 ">
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex items-center gap-2 px-6 py-3.5  rounded-l-xl border-t-2 border-b-2 border-l-2 border-dashed border-muted text-whitefont-semibold hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    </div>

                                </form>
                            </div>
                        </motion.div>

                        {/* Contact Methods */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >

                            <div className="space-y-4">
                                <ContactMethod
                                    icon={<BiSupport className="w-6 h-6 text-accent" />}
                                    title="Support Ticket"
                                    description="Get help with technical issues or billing inquiries through our ticketing system."
                                    action="Open a ticket"
                                    index={0}
                                />

                                <ContactMethod
                                    icon={<BsDiscord className="w-6 h-6 text-accent" />}
                                    title="Discord Community"
                                    description="Join our community for quick responses and connect with other users."
                                    action="Join Discord"
                                    index={1}
                                />

                                <ContactMethod
                                    icon={<FiMail className="w-6 h-6 text-accent" />}
                                    title="Email Support"
                                    description="Send us an email at support@expansehost.com and we'll get back to you within 24 hours."
                                    action="Send email"
                                    index={2}
                                />
                            </div>


                        </motion.div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
