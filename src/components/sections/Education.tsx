"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, School } from "lucide-react";
import SectionWrapper from "@/components/common/SectionWrapper";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import GlassCard from "@/components/common/GlassCard";
import AnimatedBadge from "@/components/common/AnimatedBadge";
import GlowBackground from "@/components/common/GlowBackground";
import { cn } from "@/lib/utils";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  gradeLabel: string;
  coursework: string[];
  highlights: string[];
  icon: React.ComponentType<any>;
  glowColor: string;
  colorClass: string;
}

export default function Education() {
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

  // Academic records from docs/resume.pdf
  const educationItems: EducationItem[] = [
    {
      degree: "Master Of Computer Application (MCA)",
      institution: "Gurunanak Institute of Technology",
      location: "Kolkata, West Bengal",
      duration: "2023 - 2025",
      grade: "8.94",
      gradeLabel: "CGPA",
      coursework: ["Advanced Data Structures", "Software Engineering", "Database Systems", "Java Programming"],
      highlights: [
        "Focused on modern web applications, relational databases, and enterprise software engineering.",
        "Excelled in collaborative group project designs and full-stack software development models."
      ],
      icon: GraduationCap,
      glowColor: "rgba(139, 92, 246, 0.12)", // Violet
      colorClass: "bg-violet-500",
    },
    {
      degree: "Bachelor Of Computer Application (BCA)",
      institution: "Techno International Newtown",
      location: "Kolkata, West Bengal",
      duration: "2020 - 2023",
      grade: "8.34",
      gradeLabel: "CGPA",
      coursework: ["OOPs with Java", "SQL & DBMS", "Web Development", "Computer Networks", "Data Structures"],
      highlights: [
        "Built solid foundations in algorithms, programming structures, database modeling, and styling.",
        "Participated in regional coding hackathons and software designing challenges."
      ],
      icon: School,
      glowColor: "rgba(6, 182, 212, 0.12)", // Cyan
      colorClass: "bg-cyan-500",
    },
    {
      degree: "Std XII | Science (ISC)",
      institution: "Calcutta Public School",
      location: "Kolkata, West Bengal",
      duration: "2018 - 2020",
      grade: "71.6%",
      gradeLabel: "Percentage",
      coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      highlights: [
        "Specialized in the Science track with strong components in analytical mathematics and computing.",
        "Gained initial hands-on programming experience with fundamental languages."
      ],
      icon: BookOpen,
      glowColor: "rgba(245, 158, 11, 0.12)", // Amber
      colorClass: "bg-amber-500",
    },
    {
      degree: "Std X | Science (ICSE)",
      institution: "Calcutta Public School",
      location: "Kolkata, West Bengal",
      duration: "2016 - 2018",
      grade: "79%",
      gradeLabel: "Percentage",
      coursework: ["Science", "Mathematics", "Computer Application"],
      highlights: [
        "Completed general secondary education with computer application highlights.",
        "Built basic logical understanding through mathematics and scientific study."
      ],
      icon: Award,
      glowColor: "rgba(244, 63, 94, 0.12)", // Rose
      colorClass: "bg-rose-500",
    },
  ];

  return (
    <SectionWrapper id="education" ariaLabel="Education history">
      {/* Dynamic glowing background spheres */}
      <GlowBackground />

      <Container>
        {/* Animated header section */}
        <SectionHeader
          badgeText="Academics"
          title="Education"
          subtitle="A timeline of my academic background, certificates, and relevant coursework."
          badgeGlowColor="cyan"
          dividerGradient="from-cyan-400 to-blue-500"
        />

        {/* Connected vertical timeline layout */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-12">
          {/* Timeline track vertical line */}
          <div 
            className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-500/80 to-transparent pointer-events-none" 
            aria-hidden="true"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="space-y-12"
            role="list"
            aria-label="Education Milestones"
          >
            {educationItems.map((item, idx) => {
              const Icon = item.icon;
              const cardHeaderId = `edu-card-header-${idx}`;
              
              return (
                <div key={idx} className="relative w-full">
                  {/* Timeline node */}
                  <div 
                    className="absolute -left-8 sm:-left-12 top-8 -translate-x-1/2 flex items-center justify-center z-20"
                    aria-hidden="true"
                  >
                    <div className="relative flex h-5 w-5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${item.colorClass}`} />
                      <div className={`relative inline-flex rounded-full h-5 w-5 border-2 border-black bg-zinc-950 items-center justify-center shadow-lg`}>
                        <div className={`size-2 rounded-full ${item.colorClass}`} />
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphic timeline card */}
                  <GlassCard
                    glowColor={item.glowColor}
                    borderColorClass={cn("hover:border-zinc-800", idx === 0 ? "hover:border-violet-500/30" : "hover:border-cyan-500/30")}
                    variants={cardVariants}
                  >
                    <div className="p-6 md:p-8 flex flex-col gap-6">
                      {/* Top Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex gap-4 items-center">
                          <div className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-white transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-zinc-900 to-zinc-950`}>
                            <Icon className="size-6 text-zinc-300" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 id={cardHeaderId} className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                              {item.degree}
                            </h3>
                            <p className="text-sm font-semibold text-zinc-400 mt-1.5">{item.institution}</p>
                          </div>
                        </div>

                        {/* Grade Score Badge */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0">
                          <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-1.5 shadow-sm">
                            <span className="text-zinc-500">{item.gradeLabel}:</span>
                            <span className="font-bold text-white">{item.grade}</span>
                          </div>
                          <span className="text-xs font-mono text-zinc-500">{item.duration}</span>
                        </div>
                      </div>

                      {/* Highlights Bullet List */}
                      <ul className="space-y-2.5 text-zinc-400 text-sm font-light leading-relaxed" role="list">
                        {item.highlights.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className={`text-sm select-none font-bold bg-gradient-to-br ${idx === 0 ? "from-violet-400 to-fuchsia-400" : "from-cyan-400 to-blue-400"} bg-clip-text text-transparent`} aria-hidden="true">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Coursework Tags */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">Key Coursework</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.coursework.map((course) => (
                            <AnimatedBadge key={course}>
                              {course}
                            </AnimatedBadge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
