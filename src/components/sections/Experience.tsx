"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Calendar, CheckCircle2, Cpu, Compass, Layers, Briefcase } from "lucide-react";

// Vercel Custom Minimal SVG Logo
const VercelIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 22.525H0L12 1.475L24 22.525Z" />
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
      className={`relative group bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-zinc-200 dark:border-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-800 rounded-2xl p-6 md:p-8 transition-colors duration-300 shadow-2xl flex flex-col gap-6 overflow-hidden w-full ${item.borderColor}`}
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
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div className={`p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 ${item.textColor}`}>
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <div>
              <h3 id={headerId} className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight leading-none">
                {item.role}
              </h3>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-1">{item.company}</p>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5 text-zinc-500 text-xs font-mono font-medium sm:text-right mt-1">
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <Calendar className="size-3.5 text-zinc-500" aria-hidden="true" />
              <span>{item.duration}</span>
            </div>
            <span>{item.location}</span>
          </div>
        </div>

        {/* Action descriptions */}
        <ul className="space-y-3.5 text-zinc-650 dark:text-zinc-400 text-sm font-light leading-relaxed" role="list">
          {item.description.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className={`size-4.5 mt-0.5 shrink-0 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

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

  // Curated, premium design-phase placeholders to show an Awwwards-grade timeline flow
  const experiences: ExperienceItem[] = [
    {
      company: "Vercel",
      role: "Lead Frontend Engineer",
      duration: "2024 - Present",
      location: "San Francisco, CA (Remote)",
      description: [
        "Pioneered Next.js compiler optimizations, improving page loading performance by 35% across global edge networks.",
        "Spearheaded core component library architectures, shipping accessible, responsive design systems used by millions.",
        "Collaborated closely with product engineering teams to design and implement next-generation page rendering mechanisms."
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Rust"],
      icon: VercelIcon,
      color: "from-zinc-200 to-zinc-400",
      glowColor: "rgba(255, 255, 255, 0.08)",
      borderColor: "group-hover:border-white/20",
      textColor: "text-zinc-200",
    },
    {
      company: "Stripe",
      role: "Senior Full Stack Developer",
      duration: "2022 - 2024",
      location: "Dublin, Ireland (Hybrid)",
      description: [
        "Engineered modular integration APIs for payment validation, reducing transaction latency by 120ms globally.",
        "Designed and maintained dashboard analytical charts tracking real-time client transaction metrics.",
        "Introduced reactive WebSocket subscriptions, ensuring zero-latency merchant payout notifications."
      ],
      technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL", "React"],
      icon: Layers,
      color: "from-indigo-500 to-purple-500",
      glowColor: "rgba(99, 102, 241, 0.15)",
      borderColor: "group-hover:border-indigo-500/30",
      textColor: "text-indigo-400",
    },
    {
      company: "Linear",
      role: "Frontend Developer",
      duration: "2021 - 2022",
      location: "Berlin, Germany (Remote)",
      description: [
        "Constructed fluid, keyboard-driven UI shortcuts that optimized operational work tracking by 40%.",
        "Created physics-based drag-and-drop workflow task grids with smooth Framer Motion transitions.",
        "Integrated client-side database synchronization using IndexedDB for zero-lag offline navigation."
      ],
      technologies: ["React", "TypeScript", "Framer Motion", "GraphQL", "IndexedDB"],
      icon: Compass,
      color: "from-violet-500 to-fuchsia-500",
      glowColor: "rgba(139, 92, 246, 0.15)",
      borderColor: "group-hover:border-violet-500/30",
      textColor: "text-violet-400",
    },
    {
      company: "Apple",
      role: "Software Engineering Intern",
      duration: "2020 - 2021",
      location: "Cupertino, CA",
      description: [
        "Contributed to retail support portals, reducing application memory leaks and enhancing caching modules.",
        "Implemented high-coverage unit testing suites to guarantee stability across retail localizations.",
        "Collaborated with human interface designers to code responsive web interfaces conforming to HIG guidelines."
      ],
      technologies: ["JavaScript", "HTML5", "Sass", "Web APIs", "Jest"],
      icon: Cpu,
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
            {experiences.map((item, idx) => (
              <div key={item.company} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
                
                {/* Left Column (Desktop Only for Even Index) */}
                <div className="hidden md:flex md:col-span-5 justify-end">
                  {idx % 2 === 0 && (
                    <ExperienceCard item={item} shouldReduceMotion={shouldReduceMotion} direction="left" />
                  )}
                </div>

                {/* Center Node (Always visible) */}
                <div className="col-span-12 md:col-span-2 flex justify-start md:justify-center items-center py-6 md:py-8 z-20 pl-2 sm:pl-3 md:pl-0">
                  <div 
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 size-5 rounded-full border-3 border-background dark:border-black bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <div className={`size-3 rounded-full bg-gradient-to-tr ${item.color} shadow-inner`} />
                  </div>
                </div>

                {/* Right Column (Desktop for Odd Index, Mobile for All) */}
                <div className={`col-span-12 md:col-span-5 pl-10 md:pl-0 ${idx % 2 !== 0 ? "" : "md:hidden"}`}>
                  <ExperienceCard item={item} shouldReduceMotion={shouldReduceMotion} direction="right" />
                </div>
                
                {/* Mobile Fallback: If it is an Even index, on mobile render card on the right */}
                {idx % 2 === 0 && (
                  <div className="col-span-12 pl-10 md:hidden">
                    <ExperienceCard item={item} shouldReduceMotion={shouldReduceMotion} direction="right" />
                  </div>
                )}

              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}