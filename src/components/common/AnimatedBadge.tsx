"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps extends HTMLMotionProps<"span"> {
  shouldScale?: boolean;
}

export default function AnimatedBadge({
  children,
  shouldScale = true,
  className,
  ...props
}: AnimatedBadgeProps) {
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

  return (
    <motion.span
      whileHover={shouldReduceMotion || !shouldScale ? {} : { scale: 1.05, y: -1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={cn(
        "px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-zinc-100/60 dark:bg-zinc-950/60 text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-200 text-xs font-mono font-medium shadow-xs hover:shadow-[0_0_10px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.02)] select-none cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
}
