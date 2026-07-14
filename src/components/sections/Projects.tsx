"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";

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

// Types for Project item
interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  status: string;
  year: string;
  glowColor: string;
  colorClass: string;
  accentGradient: string;
  image: string;
}

interface ProjectCardProps {
  project: ProjectItem;
  shouldReduceMotion: boolean;
  cardVariants: any;
}

// Custom css placeholders removed in favor of direct responsive mockup image rendering

function ProjectCard({ project, shouldReduceMotion, cardVariants }: ProjectCardProps) {
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

    // 3D tilt calculation (up to 5 degrees)
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
  const spotlightGradient = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, ${project.glowColor}, transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
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
      className={`relative group bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-zinc-200 dark:border-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-800 rounded-2xl p-6 md:p-8 transition-colors duration-300 shadow-2xl flex flex-col justify-between h-full overflow-hidden`}
      role="listitem"
      aria-labelledby={headerId}
    >
      {/* Spotlight Cursor Proximity Glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-px pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: spotlightGradient }}
        />
      )}

      {/* Decorative Background Blur */}
      <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-tr ${project.accentGradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl pointer-events-none`} />

      {/* Parallax inner container */}
      <div 
        style={{ transform: shouldReduceMotion ? "none" : "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="space-y-6 flex-grow flex flex-col justify-between"
      >
        {/* Header Elements */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-150/40 dark:bg-zinc-900/40 text-zinc-550 dark:text-zinc-400 text-xs font-medium">
              {project.category}
            </span>
            <div className="flex gap-2 items-center">
              <span className="text-[10px] font-mono text-zinc-550 dark:text-zinc-500">{project.year}</span>
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-400 tracking-wide uppercase">{project.status}</span>
            </div>
          </div>

          <h3 id={headerId} className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight leading-none group-hover:text-zinc-800 dark:group-hover:text-zinc-100">
            {project.title}
          </h3>

          <p className="text-zinc-650 dark:text-zinc-400 text-sm font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Image Mockup */}
        <div 
          style={{ transform: shouldReduceMotion ? "none" : "translateZ(20px)" }}
          className="w-full relative aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-900 bg-zinc-150/40 dark:bg-zinc-900/40 flex items-center justify-center select-none"
        >
          <img
            src={project.image}
            alt={`${project.title} Preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Features list */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">Key Features</h4>
          <ul className="space-y-2 text-zinc-650 dark:text-zinc-400 text-xs font-light leading-relaxed" role="list">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <ShieldCheck className={`size-4 shrink-0 bg-gradient-to-br ${project.accentGradient} bg-clip-text text-transparent`} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-900 bg-zinc-100/60 dark:bg-zinc-950/60 text-zinc-550 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300 transition-colors text-[10px] font-mono select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Links/CTAs */}
        <div 
          style={{ transform: shouldReduceMotion ? "none" : "translateZ(10px)" }}
          className="flex items-center gap-3.5 pt-4 border-t border-zinc-200 dark:border-zinc-900/60 mt-auto"
        >
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-grow px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-950/60 text-zinc-650 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 text-xs font-semibold hover:shadow-[0_0_15px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <GithubIcon className="size-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-grow px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 text-xs font-semibold shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            aria-label={`Launch ${project.title} live demo`}
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
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

  // Projects list: Mappings for Food Delivery and Ecommerce websites from docs/resume.pdf
  // Adds a third project (Aether UI) as a tasteful placeholder to create a balanced three-column grid
  const projects: ProjectItem[] = [
    {
      id: "project-1",
      title: "E-Commerce Website",
      category: "Full Stack Web App",
      description: "A modern full-stack e-commerce platform featuring product browsing, category filtering, shopping cart, user authentication, secure checkout flow, and an intuitive shopping experience.",
      features: [
        "Browse products dynamically and filter catalogs by category.",
        "Full-featured interactive shopping cart and order history.",
        "User registration and login secured with JWT Authentication.",
        "Secure digital checkout workflow with client-side state sync."
      ],
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT Authentication"],
      // TODO: Replace with real deployment URL later
      demoUrl: "#",
      // TODO: Replace with public repository URL later
      githubUrl: "#",
      status: "Completed",
      year: "2026",
      glowColor: "rgba(139, 92, 246, 0.12)", // Violet
      colorClass: "bg-violet-500",
      accentGradient: "from-violet-500 to-fuchsia-600",
      image: "/projects/ecommerce.jpg",
    },
    {
      id: "project-2",
      title: "Food Delivery Website",
      category: "Full Stack Web App",
      description: "A modern food delivery platform where users can browse restaurants, explore menus, add items to the cart, place orders, and enjoy a responsive, user-friendly ordering experience.",
      features: [
        "Interactive restaurant profiles, menu listings, and product cards.",
        "Flexible shopping cart for adding, adjusting, and removing items.",
        "Simulated order placement, tracking, and checkout flows.",
        "Fully responsive interface optimized for desktop, tablet, and mobile."
      ],
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      // TODO: Replace with real deployment URL later
      demoUrl: "#",
      // TODO: Replace with public repository URL later
      githubUrl: "#",
      status: "Completed",
      year: "2026",
      glowColor: "rgba(245, 158, 11, 0.12)", // Amber
      colorClass: "bg-amber-500",
      accentGradient: "from-amber-500 to-orange-600",
      image: "/projects/food-delivery.jpg",
    },
    {
      id: "project-3",
      title: "Grow Digital with Eesha",
      category: "WordPress Website",
      description: "A professional digital marketing agency website designed and developed using WordPress and Elementor with a strong focus on branding, responsiveness, SEO, performance, and modern UI/UX.",
      features: [
        "Custom marketing agency branding and typography styling.",
        "Highly responsive design optimized for mobile and desktop screens.",
        "Engineered with custom Elementor sections and PHP components.",
        "Search engine optimization (SEO) best practices and fast page load speeds."
      ],
      technologies: ["WordPress", "Elementor", "PHP", "Custom CSS"],
      // TODO: Replace with real deployment URL later
      demoUrl: "#",
      // TODO: Replace with public repository URL later
      githubUrl: "#",
      status: "Completed",
      year: "2026",
      glowColor: "rgba(6, 182, 212, 0.12)", // Cyan
      colorClass: "bg-cyan-500",
      accentGradient: "from-cyan-500 to-blue-600",
      image: "/projects/marketing-agency.jpg",
    }
  ];

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 w-full bg-background text-foreground transition-colors duration-300 overflow-hidden"
      aria-label="Portfolio Projects"
    >
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" />

      {/* Floating glowing background spheres */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, -30, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={shouldReduceMotion ? {} : {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"
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
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-xs mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            Showcase
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={headerVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-zinc-855 dark:from-white to-zinc-650 dark:to-zinc-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" aria-hidden="true" />

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-light leading-relaxed"
          >
            A curated showcase of full-stack web applications and interactive design systems built using modern architectures.
          </motion.p>
        </motion.div>

        {/* Projects Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full max-w-7xl mx-auto"
          role="list"
          aria-label="Developer Projects List"
        >
          {projects.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard
                project={project}
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