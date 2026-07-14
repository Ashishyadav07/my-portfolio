"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Calendar, CheckCircle2, Cpu, Compass, Layers, Briefcase, Code2 } from "lucide-react";

// Crafted Campus Custom Tech SVG Logo
const CraftedCampusIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 17l-5-5 5-5" />
    <path d="M14 7l5 5-5 5" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Types for Experience item
interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  icon: React.ComponentType<any>;
  color: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  summary?: string;
  employmentType?: string;
  current?: boolean;
}

interface ExperienceCardProps {
  item: ExperienceItem;
  shouldReduceMotion: boolean;
  direction: "left" | "right";
}

function ExperienceCard({ item, shouldReduceMotion, direction }: ExperienceCardProps) {
  const [hovering, setHovering] = useState(false);
  
  // Motion Values for performance-optimized mouse coordinate tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Motion values for 3D spring tilt mechanics (runs entirely outside React re-render loops)
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

    // Dynamic 3D tilt calculation (up to 5 degrees)
    const rotX = -((relativeY - height / 2) / (height / 2)) * 5;
    const rotY = ((relativeX - width / 2) / (width / 2)) * 5;

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

  const headerId = React.useId();
  const spotlightGradient = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${item.glowColor}, transparent 80%)`;
  const Icon = item.icon;

  // Staggered slide in variants based on layout columns direction
  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : (direction === "left" ? -40 : 40),
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={slideVariants}
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
      className={`relative group bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-zinc-200 dark:border-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-800 rounded-2xl p-6 md:p-8 transition-colors duration-300 shadow-2xl flex flex-col justify-between gap-6 overflow-hidden w-full min-h-[450px] md:min-h-[400px] ${item.borderColor}`}
      role="listitem"
      aria-labelledby={headerId}
    >
      {/* Dynamic spotlight cursor glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-px pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: spotlightGradient }}
        />
      )}

      {/* Decorative top corner blur */}
      <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none`} />

      {/* Parallax inner content structure */}
      <div 
        style={{ transform: shouldReduceMotion ? "none" : "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="space-y-5"
      >
        {/* Header section */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-start">
            <div className={`p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 mt-1 shrink-0 ${item.textColor}`}>
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 id={headerId} className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
                  {item.role}
                </h3>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {item.current && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-pulse shrink-0">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      Present
                    </span>
                  )}
                  {item.employmentType && (
                    <span className="inline-flex items-center rounded-full bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/40 dark:border-zinc-850 px-2.5 py-0.5 text-[10px] font-medium text-zinc-650 dark:text-zinc-400 uppercase tracking-wider shrink-0">
                      {item.employmentType}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 text-sm">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300">{item.company}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-start gap-1.5 rounded-md bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 px-2 py-1 text-zinc-650 dark:text-zinc-400 font-mono text-xs w-fit max-w-full">
                    <Calendar className="size-3.5 text-zinc-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="whitespace-normal break-words">{item.duration}</span>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-zinc-100/85 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 px-2 py-1 text-zinc-550 dark:text-zinc-400 text-xs font-medium shrink-0">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Description Summary */}
        {item.summary && (
          <p className="text-sm text-zinc-650 dark:text-zinc-400 font-normal leading-relaxed italic border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-0.5">
            {item.summary}
          </p>
        )}

        {/* Action descriptions */}
        <div className="space-y-3 flex-1">
          <h4 className="text-xs font-semibold text-zinc-450 dark:text-zinc-500 tracking-wider uppercase">Key Achievements</h4>
          <ul className="space-y-3.5 text-zinc-650 dark:text-zinc-400 text-sm font-light leading-relaxed" role="list">
            {item.description.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className={`size-4.5 mt-0.5 shrink-0 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`} aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies badges */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-zinc-100/60 dark:bg-zinc-950/60 text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 text-xs font-mono select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
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
        staggerChildren: 0.25,
        delayChildren: 0.15,
      },
    },
  };

  const headerVariants = {
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

  // Real work experience items for the developer portfolio
  const experiences: ExperienceItem[] = [
    {
      company: "Crafted Campus",
      role: "Full Stack Developer",
      duration: "March 2026 – Present",
      location: "India",
      employmentType: "Full-time",
      current: true,
      summary: "Working as a Full Stack Developer, building scalable web applications and maintaining production websites. Responsible for developing modern frontend interfaces, backend APIs, WordPress solutions, and collaborating with the team to deliver high-quality projects.",
      description: [
        "Developed and maintained multiple production-ready websites.",
        "Built full-stack web applications using the MERN stack.",
        "Created responsive and SEO-friendly user interfaces.",
        "Integrated backend APIs and databases.",
        "Customized WordPress websites for clients.",
        "Improved website performance and user experience."
      ],
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "WordPress",
        "PHP",
        "Laravel (Basic)",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Git",
        "REST APIs"
      ],
      icon: CraftedCampusIcon,
      color: "from-violet-500 to-fuchsia-500",
      glowColor: "rgba(139, 92, 246, 0.15)",
      borderColor: "group-hover:border-violet-500/30",
      textColor: "text-violet-400",
    },
    {
      company: "Crafted Campus",
      role: "Web Development Intern",
      duration: "September 2025 – March 2026 (6 Months)",
      location: "India",
      employmentType: "Internship",
      current: false,
      summary: "Worked as a Web Development Intern where I contributed to the development and maintenance of client websites and web applications. Built responsive user interfaces, customized WordPress websites, collaborated with senior developers, and gained hands-on experience with full-stack web development.",
      description: [
        "Developed responsive client websites.",
        "Customized WordPress themes and plugins.",
        "Assisted in MERN stack application development.",
        "Worked with REST APIs.",
        "Collaborated using Git and GitHub."
      ],
      technologies: [
        "WordPress",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PHP",
        "Laravel (Basic)",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Git"
      ],
      icon: CraftedCampusIcon,
      color: "from-cyan-500 to-blue-500",
      glowColor: "rgba(6, 182, 212, 0.15)",
      borderColor: "group-hover:border-cyan-500/30",
      textColor: "text-cyan-400",
    }
  ];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 w-full bg-background text-foreground transition-colors duration-300 overflow-hidden"
      aria-label="Work Experience"
    >
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

      {/* Floating glowing background spheres */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, -30, 20, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, 40, -20, 0],
          y: [0, -40, 40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-10 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          {/* Badge */}
          <motion.div
            variants={headerVariants}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-400 backdrop-blur-xs mb-4 shadow-[0_0_15px_rgba(139,92,246,0.15)] relative overflow-hidden group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
            </span>
            History
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-zinc-850 dark:from-white to-zinc-650 dark:to-zinc-400 bg-clip-text text-transparent"
          >
            Work Experience
          </motion.h2>
          <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 mt-4" aria-hidden="true" />

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-light leading-relaxed"
          >
            A timeline detailing my professional milestones, core contributions, and technology stack.
          </motion.p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical central timeline line */}
          <div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/80 via-zinc-200 dark:via-zinc-800 to-transparent -translate-x-1/2 pointer-events-none" 
            aria-hidden="true"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col gap-12 md:gap-16"
            role="list"
            aria-label="Professional timeline events"
          >
            {experiences.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={`${item.company}-${item.role}-${idx}`} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch w-full">
                  
                  {/* Left Column (Desktop: Even card, Mobile: Hidden) */}
                  <div className="hidden md:flex md:col-span-5 justify-end items-center">
                    {isEven && (
                      <ExperienceCard item={item} shouldReduceMotion={shouldReduceMotion} direction="left" />
                    )}
                  </div>

                  {/* Spacer Column for Center on Desktop (Hidden on Mobile) */}
                  <div className="hidden md:block md:col-span-2" aria-hidden="true" />

                  {/* Right Column (Desktop: Odd card, Mobile: All cards) */}
                  <div className="col-span-12 md:col-span-5 pl-10 md:pl-0 flex items-center">
                    <div className={`w-full ${isEven ? "md:hidden" : ""}`}>
                      <ExperienceCard item={item} shouldReduceMotion={shouldReduceMotion} direction="right" />
                    </div>
                  </div>

                  {/* Center Node (Always visible and centered vertically relative to row) */}
                  <div 
                    className="absolute left-4 md:left-1/2 top-1/2 size-5 rounded-full border-3 border-background dark:border-black bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-20"
                    style={{ transform: "translate(-50%, -50%)" }}
                    aria-hidden="true"
                  >
                    <div className={`size-3 rounded-full bg-gradient-to-tr ${item.color} shadow-inner`} />
                  </div>

                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}