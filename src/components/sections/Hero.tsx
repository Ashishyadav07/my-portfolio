"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
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

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 72;
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
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        delay: 0.4,
      },
    },
  };

  const { personal, socialLinks } = portfolioData;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden pt-24 pb-16 sm:pt-28 md:pt-32"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Top ambient glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-violet-600/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-cyan-500/10 blur-[90px] sm:blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full max-w-7xl mx-auto">
          
          {/* Left: Text Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Small Badge */}
            {personal.availableForFreelance && (
              <motion.div variants={fadeUpVariants} className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-xs shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Available for Freelance
                </div>
              </motion.div>
            )}

            {/* Main Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Hi, I'm <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">{personal.firstName}</span>
            </motion.h1>

            {/* Highlight */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent py-1"
            >
              {personal.title}
            </motion.div>

            {/* Short Description */}
            <motion.p
              variants={fadeUpVariants}
              className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-xl font-light leading-relaxed"
            >
              {personal.tagline} using Next.js, React, TypeScript, Node.js, and modern web technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 transition-all duration-300 font-semibold rounded-full px-8 py-5 text-base shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                  asChild
                >
                  <a
                    href="#projects"
                    onClick={(e) => handleScrollToSection(e, "#projects")}
                  >
                    View Projects
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-full px-8 py-5 text-base hover:border-zinc-700 transition-all duration-300"
                  asChild
                >
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollToSection(e, "#contact")}
                  >
                    Contact Me
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex items-center gap-4"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center size-11 rounded-full border border-zinc-800/80 bg-zinc-950/40 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 backdrop-blur-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary shadow-xs hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    aria-label={social.label}
                  >
                    <Icon className="size-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Profile Image Column */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative flex justify-center items-center"
            >
              {/* Circular ambient glow background */}
              <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 opacity-20 blur-3xl" />

              {/* Floating Container */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }
                }
                className="relative flex justify-center items-center"
              >
                {/* Outer decorative ring */}
                <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-zinc-800/60 bg-zinc-950/20 backdrop-blur-xs pointer-events-none" />

                {/* Main Profile Image Ring Wrapper */}
                <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-violet-500/25 via-indigo-500/15 to-cyan-500/25 border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                  <div className="relative rounded-full overflow-hidden w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-zinc-900">
                    <img
                      src={personal.avatarUrl}
                      alt={`${personal.name} - ${personal.title} Portrait`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="eager"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-10"
        onClick={(e) => handleScrollToSection(e, "#about")}
      >
        <span className="text-[10px] tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase font-medium">
          Scroll Down
        </span>
        <div className="w-5 h-8.5 rounded-full border-2 border-zinc-700 group-hover:border-zinc-500 transition-colors flex justify-center p-1.5">
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 10, 0],
                    opacity: [1, 0, 1],
                  }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="w-1 h-1.5 rounded-full bg-zinc-400 group-hover:bg-zinc-200 transition-colors"
          />
        </div>
      </motion.div>
    </section>
  );
}