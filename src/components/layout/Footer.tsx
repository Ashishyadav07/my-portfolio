"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Code2 } from "lucide-react";
import Container from "@/components/common/Container";

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

const LeetCodeIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.52 9.52a1.378 1.378 0 0 0 0 1.948l9.494 9.494a1.378 1.378 0 0 0 1.948 0l9.52-9.52a1.375 1.375 0 0 0 .03-1.921l-9.494-9.494A1.375 1.375 0 0 0 13.483 0zM12.08 3.578h3.313c.466 0 .844.378.844.844v3.313c0 .466-.378.844-.844.844h-3.313a.845.845 0 0 1-.844-.844V4.422c0-.466.378-.844.844-.844zm-4.306 4.306h3.313c.466 0 .844.378.844.844v3.313c0 .466-.378.844-.844.844H7.774a.845.845 0 0 1-.844-.844V8.728c0-.466.378-.844.844-.844zm8.612 0h3.313c.466 0 .844.378.844.844v3.313c0 .466-.378.844-.844.844h-3.313a.845.845 0 0 1-.844-.844V8.728c0-.466.378-.844.844-.844zm-4.306 4.306h3.313c.466 0 .844.378.844.844v3.313c0 .466-.378.844-.844.844h-3.313a.845.845 0 0 1-.844-.844v-3.313c0-.466.378-.844.844-.844z" />
  </svg>
);

export default function Footer() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 72; // Sticky header height
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
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

  const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ];

  const technologies = ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "MongoDB", "Node.js"];

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      role="contentinfo" 
      className="relative bg-background text-foreground border-t border-zinc-200 dark:border-zinc-900 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Top Border Gradient line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-violet-500/25 pointer-events-none" 
        aria-hidden="true"
      />

      {/* Background ambient radial glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <Container className="pt-20 pb-10">
        
        {/* Top Grid Links & Brand info */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200 dark:border-zinc-900/60"
        >
          {/* Column 1: Brand details */}
          <motion.div variants={columnVariants} className="lg:col-span-5 space-y-6">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
              }}
              className="flex items-center gap-2.5 group w-fit"
              aria-label="Ashish Yadav Portfolio Home"
            >
              <div className="relative flex items-center justify-center size-9.5 rounded-xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-md group-hover:scale-105 transition-transform duration-200">
                <code className="text-sm font-extrabold font-mono">&lt;/&gt;</code>
              </div>
              <span className="font-heading text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-850 dark:from-white to-zinc-500 dark:to-zinc-400">
                Ashish<span className="text-primary font-mono font-normal">.dev</span>
              </span>
            </Link>

            <p className="text-zinc-650 dark:text-zinc-400 font-light text-sm leading-relaxed max-w-sm">
              An award-winning Frontend Engineer and UI Motion Designer. Crafting premium, accessible, and highly optimized web interfaces using modern technological stacks.
            </p>

            {/* Micro Technology Badges */}
            <div className="space-y-2">
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Built with</span>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-900 bg-zinc-100/60 dark:bg-zinc-950/60 text-zinc-550 dark:text-zinc-500 text-[9px] font-mono select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={columnVariants} className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold font-mono text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">Quick Navigation</h4>
            <nav aria-label="Footer quick navigation" className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors text-sm font-light flex items-center gap-1 group/link"
                >
                  <span>{link.label}</span>
                  <span className="inline-block opacity-0 group-hover/link:opacity-100 transition-opacity duration-200 text-zinc-500 text-[10px] font-mono">↗</span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Connect links */}
          <motion.div variants={columnVariants} className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold font-mono text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">Connect Details</h4>
            
            <div className="space-y-3.5">
              {/* Email */}
              <a 
                href="mailto:ashishyadav25800@gmail.com"
                className="flex items-center gap-3 text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors text-sm group/contact"
              >
                <Mail className="size-4 text-zinc-500 group-hover/contact:text-white transition-colors" />
                <span className="font-mono">ashishyadav25800@gmail.com</span>
              </a>

              {/* LeetCode */}
              <a 
                href="https://leetcode.com/ashish-007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors text-sm group/contact"
              >
                <LeetCodeIcon className="size-4 text-zinc-500 group-hover/contact:text-white transition-colors" />
                <span>LeetCode / ashish-007</span>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Ashishyadav07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors text-sm group/contact"
              >
                <GithubIcon className="size-4 text-zinc-500 group-hover/contact:text-zinc-950 dark:group-hover/contact:text-white transition-colors" />
                <span>GitHub / Ashishyadav07</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/ashish-yadav-08b9bb228"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors text-sm group/contact"
              >
                <LinkedinIcon className="size-4 text-zinc-500 group-hover/contact:text-zinc-950 dark:group-hover/contact:text-white transition-colors" />
                <span>LinkedIn / ashish-yadav</span>
              </a>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Bar: Copyright & credits */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono border-t border-zinc-200 dark:border-zinc-900/60 w-full">
          <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-4 text-center md:text-left">
            <span>© {currentYear} Ashish Yadav. All rights reserved.</span>
            <span className="hidden md:inline text-zinc-300 dark:text-zinc-800">|</span>
            <span className="text-zinc-600 dark:text-zinc-400">Designed & Developed by Ashish Yadav</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Code2 className="size-3.5 text-zinc-500" />
            <span>Built with Next.js + TypeScript</span>
          </div>
        </div>

      </Container>
    </footer>
  );
}