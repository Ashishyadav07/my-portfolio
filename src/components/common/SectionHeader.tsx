"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  subtitle: string;
  badgeGlowColor?: "cyan" | "violet" | "emerald" | "amber" | "rose";
  dividerGradient?: string;
  className?: string;
}

export default function SectionHeader({
  badgeText,
  title,
  subtitle,
  badgeGlowColor = "violet",
  dividerGradient = "from-violet-500 to-cyan-400",
  className,
}: SectionHeaderProps) {
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

  const glowStyles = {
    violet: {
      border: "border-violet-500/30",
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      shadow: "shadow-[0_0_15px_rgba(139,92,246,0.15)]",
      pingBg: "bg-violet-500",
      pingCore: "bg-violet-400",
    },
    cyan: {
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      shadow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
      pingBg: "bg-cyan-500",
      pingCore: "bg-cyan-400",
    },
    emerald: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      shadow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      pingBg: "bg-emerald-500",
      pingCore: "bg-emerald-400",
    },
    amber: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      shadow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      pingBg: "bg-amber-500",
      pingCore: "bg-amber-400",
    },
    rose: {
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      shadow: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
      pingBg: "bg-rose-500",
      pingCore: "bg-rose-400",
    },
  };

  const style = glowStyles[badgeGlowColor];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("flex flex-col items-center text-center mb-16 md:mb-20", className)}
    >
      {/* Badge */}
      <motion.div
        variants={headerVariants}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-xs mb-4 relative overflow-hidden group",
          style.border,
          style.bg,
          style.text,
          style.shadow
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", style.pingCore)}></span>
          <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", style.pingBg)}></span>
        </span>
        {badgeText}
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={headerVariants}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>
      <div className={cn("h-1.5 w-12 rounded-full mt-4 bg-gradient-to-r", dividerGradient)} aria-hidden="true" />

      {/* Subtitle */}
      <motion.p
        variants={headerVariants}
        className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
