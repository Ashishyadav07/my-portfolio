"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/common/SectionWrapper";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import GlassCard from "@/components/common/GlassCard";
import AnimatedBadge from "@/components/common/AnimatedBadge";
import GlowBackground from "@/components/common/GlowBackground";
import { cn } from "@/lib/utils";

// Custom SVG Icons for Brands to avoid missing exports in Lucide React
const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API Submission Delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });

      // Reset success status after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <SectionWrapper id="contact" ariaLabel="Contact Info and Feedback">
      {/* Background glow effects */}
      <GlowBackground />

      <Container>
        {/* Section Header */}
        <SectionHeader
          badgeText="Connect"
          title="Get In Touch"
          subtitle="Let's build something exceptional together. Feel free to reach out for projects, hiring, or inquiries."
          badgeGlowColor="violet"
          dividerGradient="from-violet-500 to-cyan-400"
        />

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Copy & Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Let's collaborate on your next venture.
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed text-base">
                Whether you have an application idea, an engineering vacancy to fill, or simply wish to say hello, I'm always open to talking tech. Fill out the form, or reach me directly through my coordinates.
              </p>
              
              <div className="flex gap-2">
                <AnimatedBadge shouldScale={false}>Available for Work</AnimatedBadge>
                <AnimatedBadge shouldScale={false}>Remote / Hybrid</AnimatedBadge>
              </div>
            </div>

            {/* Direct Contact GlassCard */}
            <GlassCard
              glowColor="rgba(139, 92, 246, 0.12)" // Violet glow
              borderColorClass="hover:border-violet-500/30"
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="p-6 md:p-8 space-y-6">
                <h4 className="text-lg font-bold text-white border-b border-zinc-900 pb-3 flex items-center justify-between">
                  <span>Contact Information</span>
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center gap-4 text-sm text-zinc-300">
                    <div className="size-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                      <span className="font-bold text-xs select-none">AY</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Name</span>
                      <span className="font-semibold text-white">Ashish Yadav</span>
                    </div>
                  </div>

                  {/* Email */}
                  <a 
                    href="mailto:ashishyadav25800@gmail.com"
                    className="flex items-center gap-4 text-sm text-zinc-300 hover:text-white transition-colors group/link"
                  >
                    <div className="size-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover/link:text-white transition-colors">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Email</span>
                      <span className="font-mono">ashishyadav25800@gmail.com</span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a 
                    href="tel:+918240280153"
                    className="flex items-center gap-4 text-sm text-zinc-300 hover:text-white transition-colors group/link"
                  >
                    <div className="size-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover/link:text-white transition-colors">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Phone</span>
                      <span className="font-mono">+91 8240280153</span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 text-sm text-zinc-300">
                    <div className="size-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Location</span>
                      <span>Kolkata, West Bengal, India</span>
                    </div>
                  </div>
                </div>

                {/* Social links grid */}
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-900/60">
                  <a
                    href="https://github.com/Ashishyadav07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all shadow-xs"
                    aria-label="GitHub profile"
                  >
                    <GithubIcon className="size-4.5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/ashish-yadav-08b9bb228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all shadow-xs"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedinIcon className="size-4.5" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard
              glowColor="rgba(6, 182, 212, 0.12)" // Cyan glow
              borderColorClass="hover:border-cyan-500/30"
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white border-b border-zinc-900 pb-3">
                    Send a Message
                  </h4>

                  {/* Name and Email side-by-side on large devices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-900 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-zinc-700"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-900 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-zinc-700"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-zinc-700"
                      placeholder="Collaborative Project Inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 resize-none placeholder:text-zinc-700"
                      placeholder="Tell me about your project, timing, and requirements..."
                    />
                  </div>
                </div>

                {/* Submitting CTA Button & Success Animation */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black transition-all duration-300 text-sm font-semibold select-none cursor-pointer disabled:opacity-50 shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  >
                    {isSubmitting ? (
                      <div className="size-4.5 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 justify-center py-2 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold backdrop-blur-xs shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Message dispatched successfully! I will reply shortly.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </GlassCard>
          </div>

        </div>
      </Container>
    </SectionWrapper>
  );
}