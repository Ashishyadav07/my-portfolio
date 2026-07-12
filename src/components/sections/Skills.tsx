"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { LayoutTemplate, Server, Terminal } from "lucide-react";

// Types for Skills Categories
interface Category {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  skills: string[];
  glowColor: string;
  colorClass: string;
}

interface SkillsCardProps {
  category: Category;
  shouldReduceMotion: boolean;
  cardVariants: any;
}

function SkillsCard({ category, shouldReduceMotion, cardVariants }: SkillsCardProps) {
  // Performance Optimization: Use motion values to track mouse coordinates.
  // This bypasses React's state re-rendering cycle on mousemove for 60fps performance.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const Icon = category.icon;
  const headerId = React.useId();

  // Create radial gradient string template outside render loops
  const spotlightGradient = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${category.glowColor}, transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      variants={cardVariants}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="relative group bg-zinc-950/45 backdrop-blur-md border border-zinc-900/80 hover:border-zinc-800 rounded-2xl p-6 md:p-8 transition-colors duration-300 shadow-2xl flex flex-col h-full overflow-hidden"
      role="listitem"
      aria-labelledby={headerId}
    >
      {/* Spotlight Cursor Glow (runs entirely on CSS transitions via Motion Values) */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-px pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: spotlightGradient }}
        />
      )}

      {/* Decorative top corner blur */}
      <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full ${category.colorClass}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none`} />

      {/* Card Content Wrapper */}
      <div className="relative z-10 flex flex-col h-full space-y-6">
        
        {/* Category Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-white group-hover:border-zinc-700 transition-all duration-300 group-hover:scale-105">
            <Icon className="size-6 transition-transform duration-500 group-hover:rotate-6" aria-hidden="true" />
          </div>
          <div>
            <h3 id={headerId} className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight">
              {category.title}
            </h3>
            <p className="text-xs text-zinc-500 font-light mt-0.5">
              {category.description}
            </p>
          </div>
        </div>

        {/* Skill Badges list (Semantic markup with ul/li for Screen Readers) */}
        <ul className="flex flex-wrap gap-2.5 pt-2 flex-grow items-start" role="list">
          {category.skills.map((skill) => (
            <motion.li
              key={skill}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="px-3 py-1.5 rounded-lg border border-zinc-900 bg-zinc-950/60 text-zinc-400 hover:text-white hover:border-zinc-800 transition-all duration-200 text-xs font-mono font-medium shadow-xs hover:shadow-[0_0_10px_rgba(255,255,255,0.02)] select-none cursor-default"
              role="listitem"
            >
              {skill}
            </motion.li>
          ))}
        </ul>

      </div>
    </motion.div>
  );
}

export default function Skills() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const headerVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 16,
      },
    },
  };

  // Static list containing ONLY technologies and skills mentioned in the resume
  const categories: Category[] = [
    {
      title: "Frontend",
      description: "Developing clean, structured layouts and interactive interfaces.",
      icon: LayoutTemplate,
      skills: ["HTML", "CSS", "JavaScript", "React.js", "React Hooks", "Context API", "React Router", "WordPress", "SEO"],
      glowColor: "rgba(139, 92, 246, 0.15)", // Violet
      colorClass: "bg-violet-500",
    },
    {
      title: "Backend",
      description: "Architecting structured databases, REST APIs, and core logic systems.",
      icon: Server,
      skills: ["Node.js", "Express", "MongoDB", "SQL", "RESTful APIs", "Java", "C"],
      glowColor: "rgba(6, 182, 212, 0.15)", // Cyan
      colorClass: "bg-cyan-500",
    },
    {
      title: "Tools & Technologies",
      description: "Using developer utilities and displaying problem-solving frameworks.",
      icon: Terminal,
      skills: ["Github", "Visual Studio Code", "LeetCode", "GeeksforGeeks", "Leadership", "Teamwork", "Active Communication"],
      glowColor: "rgba(245, 158, 11, 0.15)", // Amber
      colorClass: "bg-amber-500",
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 w-full bg-black text-white overflow-hidden"
      aria-label="Skills and Technologies"
    >
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

      {/* Floating glowing circles */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, -20, 15, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.03, 0.97, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-10 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-cyan-500/5 blur-[100px] sm:blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, 30, -15, 0],
          y: [0, -30, 30, 0],
          scale: [1, 0.97, 1.03, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-10 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-violet-600/5 blur-[100px] sm:blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            variants={headerVariants}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-xs mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            Stack
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </motion.h2>
          <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" aria-hidden="true" />

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed"
          >
            I leverage a modern, robust, and curated stack of technologies to build applications that are performant, visually premium, and highly scalable.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full max-w-6xl mx-auto"
          role="list"
          aria-label="Technology Categories"
        >
          {categories.map((category) => (
            <div key={category.title} className="h-full">
              <SkillsCard
                category={category}
                shouldReduceMotion={shouldReduceMotion}
                cardVariants={cardVariants}
              />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}