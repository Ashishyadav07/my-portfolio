"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowConfig {
  colorClass: string;
  sizeClass?: string;
  positionClass: string;
  animateX?: number[];
  animateY?: number[];
  duration?: number;
}

interface GlowBackgroundProps {
  glows?: GlowConfig[];
}

export default function GlowBackground({ glows }: GlowBackgroundProps) {
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

  // Sensible default glows to match the brand design system
  const defaultGlows: GlowConfig[] = [
    {
      colorClass: "bg-violet-600/5",
      sizeClass: "w-80 h-80 sm:w-96 sm:h-96",
      positionClass: "top-1/4 left-10",
      animateX: [0, 30, -30, 0],
      animateY: [0, -40, 20, 0],
      duration: 15,
    },
    {
      colorClass: "bg-cyan-500/5",
      sizeClass: "w-80 h-80 sm:w-96 sm:h-96",
      positionClass: "bottom-1/4 right-10",
      animateX: [0, -30, 30, 0],
      animateY: [0, 40, -20, 0],
      duration: 18,
    },
  ];

  const activeGlows = glows || defaultGlows;

  return (
    <>
      {activeGlows.map((glow, idx) => (
        <motion.div
          key={idx}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: glow.animateX || [0, 20, -20, 0],
                  y: glow.animateY || [0, -30, 30, 0],
                  scale: [1, 1.05, 0.95, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? {}
              : {
                  duration: glow.duration || 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className={cn(
            "absolute rounded-full blur-[100px] sm:blur-[120px] pointer-events-none -z-10",
            glow.sizeClass || "w-80 h-80 sm:w-96 sm:h-96",
            glow.colorClass,
            glow.positionClass
          )}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
