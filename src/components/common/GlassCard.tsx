"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  glowColor?: string;
  borderColorClass?: string;
  hoverLift?: boolean;
  tilt?: boolean;
  tiltAngle?: number;
  glowSize?: number;
  innerDepth?: string;
  role?: string;
}

export default function GlassCard({
  children,
  glowColor = "rgba(139, 92, 246, 0.12)",
  borderColorClass = "hover:border-zinc-800/80",
  hoverLift = true,
  tilt = true,
  tiltAngle = 6,
  glowSize = 300,
  innerDepth = "translateZ(30px)",
  role = "listitem",
  className,
  ...props
}: GlassCardProps) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Spotlight mouse tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D spring tilt values
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

    if (tilt) {
      const rotX = -((relativeY - height / 2) / (height / 2)) * tiltAngle;
      const rotY = ((relativeX - width / 2) / (width / 2)) * tiltAngle;
      rotateX.set(rotX);
      rotateY.set(rotY);
    }
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlightGradient = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion || !hoverLift ? {} : { y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      style={
        shouldReduceMotion || !tilt
          ? {}
          : {
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }
      }
      className={cn(
        "relative group bg-zinc-950/45 backdrop-blur-md border border-zinc-900 rounded-2xl transition-colors duration-300 shadow-2xl overflow-hidden flex flex-col h-full",
        borderColorClass,
        className
      )}
      role={role}
      {...props}
    >
      {/* Spotlight Cursor Proximity Glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-px pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: spotlightGradient }}
        />
      )}

      {/* Internal Parallax Content Container */}
      <div 
        style={{ 
          transform: shouldReduceMotion ? "none" : innerDepth, 
          transformStyle: "preserve-3d" 
        }}
        className="w-full h-full flex flex-col flex-grow"
      >
        {children}
      </div>
    </motion.div>
  );
}
