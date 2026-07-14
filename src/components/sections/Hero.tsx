"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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

  // Mouse coordinates motion values for parallax/spotlight glows
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt Spring configuration
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, { damping: 25, stiffness: 180 });
  const rotateYSpring = useSpring(rotateY, { damping: 25, stiffness: 180 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    
    mouseX.set(relativeX);
    mouseY.set(relativeY);

    // Subtle 3D tilt (up to 3 degrees)
    const rotX = -((relativeY - height / 2) / (height / 2)) * 3;
    const rotY = ((relativeX - width / 2) / (width / 2)) * 3;

    rotateX.set(rotX);
    rotateY.set(rotY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlightGradient = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.15), transparent 80%)`;

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
      className="relative min-h-screen w-full bg-background text-foreground flex items-center justify-center overflow-hidden pt-24 pb-32 md:pb-16 sm:pt-28 md:pt-32 transition-colors duration-300"
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-white"
            >
              Hi, I'm <span className="bg-gradient-to-r from-zinc-800 dark:from-zinc-100 to-zinc-500 dark:to-zinc-400 bg-clip-text text-transparent">{personal.firstName}</span>
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
              className="mt-6 text-base sm:text-lg md:text-xl text-zinc-650 dark:text-zinc-400 max-w-xl font-light leading-relaxed"
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
                  className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 font-semibold rounded-full px-8 py-5 text-base shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
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
                  className="w-full sm:w-auto border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950/50 hover:bg-zinc-200 dark:hover:bg-zinc-900 text-zinc-650 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-full px-8 py-5 text-base hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
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
                    className="flex items-center justify-center size-11 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/40 dark:bg-zinc-950/40 text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 backdrop-blur-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary shadow-xs hover:shadow-[0_0_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
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
              className="relative flex justify-center items-center w-full"
            >
              {/* Soft blurred background glow that adapts to theme for portrait layout */}
              <div className="absolute w-[300px] h-[375px] sm:w-[380px] sm:h-[475px] lg:w-[460px] lg:h-[575px] rounded-[3rem] bg-gradient-to-tr from-violet-500/10 via-indigo-500/10 to-cyan-500/10 dark:from-violet-500/15 dark:via-indigo-500/15 dark:to-cyan-500/15 opacity-80 blur-3xl pointer-events-none" />

              {/* Floating & Parallax Container */}
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
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
                style={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotateX: rotateXSpring,
                        rotateY: rotateYSpring,
                        transformStyle: "preserve-3d",
                        perspective: 1000,
                      }
                }
                className="relative flex justify-center items-center cursor-pointer group"
              >
                {/* Modern Glassmorphism Portrait Container Card */}
                <div 
                  style={{ transform: shouldReduceMotion ? "none" : "translateZ(10px)", transformStyle: "preserve-3d" }}
                  className="relative p-3 md:p-4 rounded-[2rem] bg-white/20 dark:bg-zinc-950/20 border border-zinc-200/40 dark:border-zinc-800/30 backdrop-blur-md shadow-2xl dark:shadow-zinc-950/50 w-[260px] h-[325px] sm:w-[340px] sm:h-[425px] md:w-[380px] md:h-[475px] lg:w-[440px] lg:h-[550px] overflow-hidden"
                >
                  {/* Spotlight Hover Proximity Glow inside the glass frame */}
                  {!shouldReduceMotion && (
                    <motion.div
                      className="absolute -inset-px pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]"
                      style={{ background: spotlightGradient }}
                    />
                  )}

                  {/* Main Portrait Mask Container */}
                  <div 
                    style={{ transform: shouldReduceMotion ? "none" : "translateZ(20px)" }}
                    className="relative w-full h-full rounded-[1.25rem] overflow-hidden bg-zinc-150 dark:bg-zinc-900 shadow-md"
                  >
                    <Image
                      src={personal.avatarUrl}
                      alt={`${personal.name} - ${personal.title} Portrait`}
                      fill
                      sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 440px"
                      priority
                      className="object-cover transition-transform duration-500 hover:scale-103 select-none"
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
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-10"
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