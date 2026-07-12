"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Code2, Briefcase, Award } from "lucide-react";
import SectionWrapper from "@/components/common/SectionWrapper";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import GlassCard from "@/components/common/GlassCard";
import AnimatedBadge from "@/components/common/AnimatedBadge";
import GlowBackground from "@/components/common/GlowBackground";
import { cn } from "@/lib/utils";

interface AchievementItem {
  title: string;
  badge: string;
  description: string;
  year: string;
  icon: React.ComponentType<any>;
  glowColor: string;
  colorClass: string;
  badgeColor: "amber" | "cyan" | "violet" | "rose";
}

export default function Achievements() {
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

  // Real achievements derived strictly from docs/resume.pdf
  const achievements: AchievementItem[] = [
    {
      title: "200+ Problems Solved",
      badge: "Problem Solving",
      description: "Solved 200+ competitive coding challenges on LeetCode and GeeksforGeeks, mastering algorithms, complex data structures, and optimized logics.",
      year: "2026",
      icon: Trophy,
      glowColor: "rgba(245, 158, 11, 0.12)", // Amber
      colorClass: "from-amber-500/10 to-orange-500/10 text-amber-400 border-amber-500/20",
      badgeColor: "amber",
    },
    {
      title: "Academic Excellence",
      badge: "Academics",
      description: "Maintained a high-performance profile throughout post-grad, achieving a 8.94 CGPA in MCA at Gurunanak Institute of Technology and 8.34 CGPA in BCA.",
      year: "2025",
      icon: Award,
      glowColor: "rgba(244, 63, 94, 0.12)", // Rose
      colorClass: "from-rose-500/10 to-pink-500/10 text-rose-400 border-rose-500/20",
      badgeColor: "rose",
    },
    {
      title: "MERN Stack Engineering",
      badge: "Development",
      description: "Successfully built production-ready full-stack applications (Food Delivery and E-commerce sites) integrating RESTful APIs, JWT states, and Stripe payments.",
      year: "2024",
      icon: Code2,
      glowColor: "rgba(6, 182, 212, 0.12)", // Cyan
      colorClass: "from-cyan-500/10 to-blue-500/10 text-cyan-400 border-cyan-500/20",
      badgeColor: "cyan",
    },
    {
      title: "Web Developer Intern",
      badge: "Professional",
      description: "Secured a selective internship at Crafted Campus, contributing to responsive web projects utilizing modular React architectures and custom WordPress plugins.",
      year: "2025 - Present",
      icon: Briefcase,
      glowColor: "rgba(139, 92, 246, 0.12)", // Violet
      colorClass: "from-violet-500/10 to-fuchsia-500/10 text-violet-400 border-violet-500/20",
      badgeColor: "violet",
    },
  ];

  return (
    <SectionWrapper id="achievements" ariaLabel="Achievements and Milestones">
      {/* Background ambient glow blurs */}
      <GlowBackground />

      <Container>
        {/* Section Header */}
        <SectionHeader
          badgeText="Milestones"
          title="Achievements"
          subtitle="Celebrating key career highlights, coding metrics, and academic milestones."
          badgeGlowColor="cyan"
          dividerGradient="from-cyan-400 to-blue-500"
        />

        {/* Card Grid Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          role="list"
          aria-label="Achievements List"
        >
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            const headerId = `achievement-header-${idx}`;
            
            return (
              <GlassCard
                key={idx}
                glowColor={item.glowColor}
                borderColorClass={cn(
                  "hover:border-zinc-300 dark:hover:border-zinc-800",
                  item.badgeColor === "amber" && "hover:border-amber-500/30",
                  item.badgeColor === "rose" && "hover:border-rose-500/30",
                  item.badgeColor === "cyan" && "hover:border-cyan-500/30",
                  item.badgeColor === "violet" && "hover:border-violet-500/30"
                )}
                variants={cardVariants}
              >
                <div className="p-6 md:p-8 flex flex-col gap-5 h-full justify-between">
                  
                  {/* Top Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <AnimatedBadge shouldScale={false} className="border-zinc-200 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/40 text-zinc-655 dark:text-zinc-405">
                        {item.badge}
                      </AnimatedBadge>
                      <span className="text-xs font-mono text-zinc-500">{item.year}</span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className={cn("p-3 rounded-xl border bg-gradient-to-br shadow-inner shrink-0", item.colorClass)}>
                        <Icon className="size-6" aria-hidden="true" />
                      </div>
                      <h3 id={headerId} className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-800 dark:group-hover:text-zinc-100">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-zinc-650 dark:text-zinc-400 text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative Border & Graphic */}
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-900/60 flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none">
                    <span>Verified Milestone</span>
                    <div className="flex gap-1" aria-hidden="true">
                      <div className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                      <div className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                      <div className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                    </div>
                  </div>

                </div>
              </GlassCard>
            );
          })}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
