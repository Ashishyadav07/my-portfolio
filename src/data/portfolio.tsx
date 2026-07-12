import { Briefcase, Code2, GraduationCap, Target, LayoutTemplate, Server, Terminal, Mail, LucideIcon } from "lucide-react";
import React from "react";

// Custom SVG Icons for Brands (GitHub, LinkedIn) to avoid missing exports in Lucide React
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

const LinkedinIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Type Definitions
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  label: string;
}

export interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  color: string;
  borderColor: string;
  textColor: string;
  glowColor: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
  glowColor: string;
  colorClass: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  role?: string;
  technologies: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  current: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade?: string;
  description?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    username: string;
    github: string;
    linkedin: string;
    availableForFreelance: boolean;
    avatarUrl: string;
    resumeUrl: string;
    about: {
      intro: string;
      paragraph1: string;
      paragraph2: string;
    };
  };
  stats: StatItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  socialLinks: SocialLink[];
}

// Centralized Portfolio Data
export const portfolioData: PortfolioData = {
  personal: {
    name: "Ashish Yadav",
    firstName: "Ashish",
    lastName: "Yadav",
    title: "Full Stack Web Developer",
    tagline: "I build fast, modern, scalable, and user-friendly web applications.",
    location: "India",
    email: "contact@ashish.dev",
    username: "Ashishyadav07",
    github: "https://github.com/Ashishyadav07",
    linkedin: "https://linkedin.com/in/ashish-yadav",
    availableForFreelance: true,
    avatarUrl: "/profile.jpg",
    resumeUrl: "/Resume.pdf",
    about: {
      intro: "I am a passionate Full Stack Web Developer dedicated to crafting high-performance, responsive, and scalable web experiences.",
      paragraph1: "I am a passionate Full Stack Web Developer dedicated to crafting high-performance, responsive, and scalable web experiences. With a strong eye for detail, I engineer fluid user interfaces and optimize web speed.",
      paragraph2: "My primary expertise lies in Next.js, React, TypeScript, and Node.js. I specialize in building complete, end-to-end applications from database architecture and secure API routes to front-end states and animations."
    }
  },
  stats: [
    {
      icon: Briefcase,
      value: "25+",
      label: "Projects Completed",
      description: "Successfully built and deployed production web applications.",
      color: "from-violet-500/10 to-fuchsia-500/10",
      borderColor: "group-hover:border-violet-500/30",
      textColor: "text-violet-400",
      glowColor: "rgba(139, 92, 246, 0.12)",
    },
    {
      icon: Code2,
      value: "15+",
      label: "Technologies",
      description: "Proven expertise in Next.js, React, Node.js, and databases.",
      color: "from-cyan-500/10 to-blue-500/10",
      borderColor: "group-hover:border-cyan-500/30",
      textColor: "text-cyan-400",
      glowColor: "rgba(6, 182, 212, 0.12)",
    },
    {
      icon: GraduationCap,
      value: "Continuous",
      label: "Learning Journey",
      description: "Constantly expanding skill set with modern web standards.",
      color: "from-amber-500/10 to-orange-500/10",
      borderColor: "group-hover:border-amber-500/30",
      textColor: "text-amber-400",
      glowColor: "rgba(245, 158, 11, 0.12)",
    },
    {
      icon: Target,
      value: "100%",
      label: "Client Focus",
      description: "Dedicated to solving real-world problems and creating value.",
      color: "from-emerald-500/10 to-teal-500/10",
      borderColor: "group-hover:border-emerald-500/30",
      textColor: "text-emerald-400",
      glowColor: "rgba(16, 185, 129, 0.12)",
    },
  ],
  skills: [
    {
      title: "Frontend Development",
      description: "Building responsive, modern, and interactive user interfaces.",
      icon: LayoutTemplate,
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
      glowColor: "rgba(139, 92, 246, 0.15)",
      colorClass: "bg-violet-500",
    },
    {
      title: "Backend Engineering",
      description: "Designing database structures and constructing secure API endpoints.",
      icon: Server,
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
      glowColor: "rgba(6, 182, 212, 0.15)",
      colorClass: "bg-cyan-500",
    },
    {
      title: "Tools & Design",
      description: "Utilizing modern tools to streamline coding and interface workflows.",
      icon: Terminal,
      skills: ["Git", "GitHub", "VS Code", "Figma", "Postman"],
      glowColor: "rgba(245, 158, 11, 0.15)",
      colorClass: "bg-amber-500",
    },
  ],
  projects: [
    {
      id: "project-1",
      title: "Aether UI",
      description: "A premium, accessible UI component library built for React and Tailwind CSS.",
      longDescription: "Aether UI is a highly customizable component library prioritizing aesthetics and accessibility. It integrates screen reader support, full keyboard accessibility, and beautiful glassmorphism variants out of the box.",
      tags: ["React", "TypeScript", "Tailwind CSS", "A11y"],
      image: "/projects/aether.jpg",
      demoUrl: "https://aether-ui.example.com",
      githubUrl: "https://github.com/Ashishyadav07/aether-ui",
      featured: true,
      role: "Lead Engineer",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "project-2",
      title: "Linear Task Sync",
      description: "A fully functional clone of the Linear issue tracker, featuring real-time client state sync.",
      longDescription: "Linear Task Sync implements instant state updates using web sockets, offline support, keyboard shortcuts, and dark/light dynamic theme layouts.",
      tags: ["Next.js", "Node.js", "Socket.io", "MongoDB"],
      image: "/projects/linear.jpg",
      demoUrl: "https://linear-sync.example.com",
      githubUrl: "https://github.com/Ashishyadav07/linear-sync",
      featured: true,
      role: "Full Stack Developer",
      technologies: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    },
    {
      id: "project-3",
      title: "DevSpaces",
      description: "An online collaborative code editor with dynamic compiler and terminal previews.",
      longDescription: "DevSpaces is an interactive editor enabling multiple developers to write, build, and debug code simultaneously. It compiles and tests code within secure sandboxed environments.",
      tags: ["React", "TypeScript", "Node.js", "Docker"],
      image: "/projects/devspaces.jpg",
      demoUrl: "https://devspaces.example.com",
      githubUrl: "https://github.com/Ashishyadav07/devspaces",
      featured: true,
      role: "Full Stack Engineer",
      technologies: ["React", "TypeScript", "Node.js", "Express", "Docker", "Tailwind CSS"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Full Stack Engineer",
      company: "TechCorp Inc.",
      location: "India",
      duration: "2024 - Present",
      description: [
        "Led a team of frontend developers to migrate legacy systems to Next.js App Router, resulting in a 40% improvement in PageSpeed metrics.",
        "Created custom utility hooks and shared design system tokens, streamlining interface building time across 3 separate product teams.",
        "Designed and implemented high-performance REST and GraphQL API routes using Node.js, Express, and Redis caching."
      ],
      current: true,
    },
    {
      id: "exp-2",
      role: "Full Stack Developer",
      company: "StartupX",
      location: "India",
      duration: "2022 - 2024",
      description: [
        "Built responsive, mobile-first web applications using React, TypeScript, and Tailwind CSS.",
        "Integrated secure authentication systems (OAuth & JWT) and handled database modeling using MongoDB and PostgreSQL.",
        "Participated in agile code reviews and set up CI/CD GitHub action pipelines to automate building and linting."
      ],
      current: false,
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Technology in Computer Science",
      institution: "Tech University",
      location: "India",
      duration: "2018 - 2022",
      grade: "9.2 CGPA",
      description: "Specialized in Software Engineering, Database Systems, and Web Application Architecture."
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "TechHack 2022 Winner",
      issuer: "National Hackathon Association",
      date: "2022",
      description: "Won first place out of 200+ teams by designing and building a real-time collaborative workspace tool."
    },
    {
      id: "ach-2",
      title: "Open Source Contributor",
      issuer: "React Ecosystems",
      date: "2023 - Present",
      description: "Contributed to performance optimizations and documentation edits for popular React and Framer Motion libraries."
    }
  ],
  socialLinks: [
    {
      name: "GitHub",
      href: "https://github.com/Ashishyadav07",
      icon: GithubIcon,
      label: "GitHub Profile",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/ashish-yadav",
      icon: LinkedinIcon,
      label: "LinkedIn Profile",
    },
    {
      name: "Email",
      href: "mailto:contact@ashish.dev",
      icon: Mail,
      label: "Send Email",
    },
  ]
};
