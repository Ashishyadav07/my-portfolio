"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Target } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

// Reusable Spring-based 3D Tilt Card with Spotlight Cursor Glow
interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  shouldReduceMotion?: boolean;
}

function PremiumCard({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.12)",
  shouldReduceMotion = false,
}: PremiumCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth spring physics configuration
  const springConfig = { damping: 25, stiffness: 180 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    
    setMousePos({ x: relativeX, y: relativeY });

    // Rotate cards up to 8 degrees on mouse proximity
    const rotX = -((relativeY - height / 2) / (height / 2)) * 8;
    const rotY = ((relativeX - width / 2) / (width / 2)) * 8;

    rotateX.set(rotX);
    rotateY.set(rotY);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      className={`relative group bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-zinc-200 dark:border-zinc-900 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-zinc-300 dark:hover:border-zinc-800/80 shadow-2xl ${className}`}
    >
      {/* Dynamic spotlight cursor glow */}
      {!shouldReduceMotion && hovering && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      <div style={{ transform: shouldReduceMotion ? "none" : "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function About() {
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
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
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

  const { personal, stats } = portfolioData;

  // Retrieve a key subset of technologies for quick showcase badges
  const coreTech = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 w-full bg-background text-foreground transition-colors duration-300 overflow-hidden"
    >
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

      {/* Floating Ambient Glowing Blobs */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, 30, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-violet-600/5 blur-[100px] sm:blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, -30, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-cyan-500/5 blur-[100px] sm:blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-400 backdrop-blur-xs mb-4 shadow-[0_0_15px_rgba(139,92,246,0.15)] relative overflow-hidden group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
            </span>
            About Me
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-zinc-850 dark:from-white to-zinc-650 dark:to-zinc-400 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 mt-4" />
        </div>

        {/* Content Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Side: Bio & Statistics */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Biography */}
            <div className="space-y-6 text-zinc-650 dark:text-zinc-300">
              <motion.h3
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
              >
                Hi, I'm <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">{personal.firstName}</span>.
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl font-light leading-relaxed text-zinc-850 dark:text-zinc-200"
              >
                {personal.about.intro}
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className="text-base text-zinc-550 dark:text-zinc-400 font-light leading-relaxed"
              >
                {personal.about.paragraph2}
              </motion.p>
            </div>

            {/* Tech Stack Badge List */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {coreTech.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-950/60 text-zinc-650 dark:text-zinc-300 text-xs font-mono transition-colors duration-300 hover:border-zinc-350 dark:hover:border-zinc-700 hover:text-zinc-950 dark:hover:text-white"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Statistic Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <PremiumCard
                  key={stat.label}
                  glowColor={stat.glowColor}
                  shouldReduceMotion={shouldReduceMotion}
                  className={stat.borderColor}
                >
                  <div className="p-6 flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-zinc-300 ${stat.textColor} border border-white/5`}>
                      <stat.icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-zinc-855 dark:text-zinc-200">
                        {stat.label}
                      </div>
                      <p className="text-xs text-zinc-550 dark:text-zinc-500 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>

          </div>

          {/* Right Side: Composition of Cards (Interactive Dev Snippet) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <motion.div
              animate={shouldReduceMotion ? {} : {
                y: [0, -10, 0]
              }}
              transition={shouldReduceMotion ? {} : {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative w-full max-w-md flex flex-col gap-6"
            >
              {/* Profile Overview Card */}
              <PremiumCard
                glowColor="rgba(139, 92, 246, 0.15)"
                shouldReduceMotion={shouldReduceMotion}
                className="w-full"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-5">
                    {/* Parallax depth applied to components inside the card */}
                    <div
                      style={{ transform: shouldReduceMotion ? "none" : "translateZ(20px)" }}
                      className="relative size-20 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 shadow-inner"
                    >
                      <img
                        src={personal.avatarUrl}
                        alt={`${personal.name} Portrait`}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                      />
                    </div>
                    <div style={{ transform: shouldReduceMotion ? "none" : "translateZ(15px)" }}>
                      <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-white tracking-tight">{personal.name}</h3>
                      <p className="text-sm font-mono text-zinc-500">@{personal.username}</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-zinc-200 dark:bg-zinc-900" />

                  <div
                    style={{ transform: shouldReduceMotion ? "none" : "translateZ(10px)" }}
                    className="flex justify-between items-center text-xs font-mono text-zinc-500"
                  >
                    <div>Role: {personal.title}</div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Now
                    </div>
                  </div>
                </div>
              </PremiumCard>

              {/* Code Snippet VS Code Card */}
              <PremiumCard
                glowColor="rgba(6, 182, 212, 0.15)"
                shouldReduceMotion={shouldReduceMotion}
                className="w-full"
              >
                {/* VS Code Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-100/20 dark:bg-zinc-900/20">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[#ff5f56]" />
                    <div className="size-3 rounded-full bg-[#ffbd2e]" />
                    <div className="size-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-xs font-mono text-zinc-550 dark:text-zinc-500 select-none">about_me.ts</span>
                  <div className="w-8" />
                </div>

                {/* Styled code */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-zinc-700 dark:text-zinc-300 bg-zinc-50/40 dark:bg-black/40">
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">1</span>
                    <span>
                      <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = &#123;
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">2</span>
                    <span className="pl-4">
                      <span className="text-zinc-400">name:</span> <span className="text-amber-300">"{personal.name}"</span>,
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">3</span>
                    <span className="pl-4">
                      <span className="text-zinc-400">role:</span> <span className="text-amber-300">"{personal.title}"</span>,
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">4</span>
                    <span className="pl-4">
                      <span className="text-zinc-400">focus:</span> <span className="text-cyan-400">&#91;</span>
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">5</span>
                    <span className="pl-8 text-amber-300">
                      "Next.js", "TypeScript", "Tailwind"
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">6</span>
                    <span className="pl-4">
                      <span className="text-cyan-400">&#93;</span>,
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">7</span>
                    <span className="pl-4">
                      <span className="text-zinc-400">location:</span> <span className="text-amber-300">"{personal.location}"</span>,
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">8</span>
                    <span className="pl-4">
                      <span className="text-zinc-400">availableForHire:</span> <span className="text-emerald-400">{personal.availableForFreelance ? "true" : "false"}</span>
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 select-none pr-4 text-right w-8">9</span>
                    <span>&#125;;</span>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}