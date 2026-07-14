"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  Mail,
  ArrowUpRight,
  GraduationCap,
  Trophy,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom SVG Brand Icons to avoid missing lucide-react exports in this version
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

const TwitterIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Navigation links and corresponding section IDs
const navItems = [
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Synchronize component mount state to prevent Next.js hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll detection for sticky background changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Reference to track manual scrolling vs auto-scrolling on click to prevent active link flickering
  const isScrollingRef = React.useRef(false);

  // Actively track scrolled section in viewport to highlight correct navbar link
  useEffect(() => {
    const sections = ["hero", ...navItems.map((item) => item.href.slice(1))];

    const observerCallback = () => {
      // If we are currently programmatically scrolling, ignore observer updates
      if (isScrollingRef.current) return;

      const headerHeight = 72;
      const activeLine = headerHeight + 60; // 132px line threshold below the sticky navbar

      let currentActive = "";

      // Prioritize top boundary check for contiguous sections
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= activeLine && rect.bottom > activeLine) {
            currentActive = id;
            break;
          }
        }
      }

      if (currentActive === "hero" || window.scrollY < 80) {
        setActiveIndex(null);
      } else if (currentActive) {
        const index = navItems.findIndex((item) => item.href === `#${currentActive}`);
        if (index !== -1) {
          setActiveIndex(index);
        }
      }
    };

    // Trigger on intersection crossings, accounting for the sticky navbar height
    const observerOptions = {
      root: null,
      rootMargin: "-72px 0px -60% 0px",
      threshold: [0, 0.1, 0.2, 0.5, 0.8, 1.0],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Sync on scroll end to prevent any observer latency issues
    const handleManualScroll = () => {
      if (!isScrollingRef.current) {
        observerCallback();
      }
    };
    window.addEventListener("scroll", handleManualScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleManualScroll);
    };
  }, []);

  // Custom smooth scroll navigation handler with offset to account for sticky header
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
    href: string
  ) => {
    e.preventDefault();
    isScrollingRef.current = true;

    if (href === "#hero" || href === "#" || href === "") {
      setActiveIndex(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else {
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = 72; // height of the scrolled sticky navbar
        const y = element.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
        window.history.pushState(null, "", href);

        const index = navItems.findIndex((item) => item.href === href);
        if (index !== -1) {
          setActiveIndex(index);
        }
      }
    }

    // Set up scroll end listener to re-enable observer after smooth scroll completes
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
        window.removeEventListener("scroll", handleScrollEnd);
      }, 100);
    };
    window.addEventListener("scroll", handleScrollEnd);

    // Fallback safety timeout in case page cannot scroll further
    setTimeout(() => {
      isScrollingRef.current = false;
      window.removeEventListener("scroll", handleScrollEnd);
    }, 1200);
  };

  // Animation variants for staggered mobile drawer navigation links
  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const mobileItemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  } as const;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
          : "py-5 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          href="#"
          onClick={(e) => handleScrollToSection(e, "#hero")}
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-md p-1"
          aria-label="Ashish Yadav Portfolio Home"
        >
          <div className="relative flex items-center justify-center size-9.5 rounded-xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
            <code className="text-sm font-extrabold font-mono">&lt;/&gt;</code>
            <div className="absolute inset-0 size-full rounded-xl bg-primary/15 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/95 to-foreground/80 group-hover:text-primary transition-colors duration-200">
            Ashish<span className="text-primary font-mono font-normal">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav 
          className="hidden md:flex items-center gap-1 bg-muted/40 dark:bg-muted/10 p-1 rounded-full border border-border/20 backdrop-blur-xs"
          role="navigation"
          aria-label="Desktop navigation"
        >
          {navItems.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Sliding Hover Pill Background */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-muted/85 dark:bg-muted/50 rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                {/* Sliding Active Pill Background */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-background dark:bg-zinc-900 shadow-xs border border-border/30 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}

                <Icon className="size-4 opacity-80" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls (Theme, CTA, Mobile Trigger) */}
        <div className="flex items-center gap-2">
          
          {/* Theme Toggle Button */}
          {mounted ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full relative size-9.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            >
              <motion.div
                animate={{ rotate: resolvedTheme === "dark" ? 180 : 0, scale: resolvedTheme === "dark" ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Sun className="size-4.5 text-foreground" />
              </motion.div>
              <motion.div
                animate={{ rotate: resolvedTheme === "dark" ? 0 : -180, scale: resolvedTheme === "dark" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Moon className="size-4.5 text-foreground" />
              </motion.div>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative size-9.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Switch theme"
              disabled
            >
              <div className="size-4.5 rounded-full border border-dashed border-muted-foreground/35 animate-pulse" />
            </Button>
          )}

          {/* Hire Me CTA Button (Desktop only) */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:inline-flex rounded-full px-4 group/btn focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/50 relative overflow-hidden transition-all duration-300"
          >
            <a href="#contact" onClick={(e) => handleScrollToSection(e, "#contact")}>
              <span>Hire Me</span>
              <ArrowUpRight className="size-4 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </Button>

          {/* Mobile Hamburg Menu Component */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full size-9.5 relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-xs border-l border-border/40 bg-background/95 backdrop-blur-md p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
                      <code className="text-xs font-bold font-mono">&lt;/&gt;</code>
                    </div>
                    <span className="font-heading text-md font-bold">Ashish.dev</span>
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground mt-1">
                    Professional Web Developer Portfolio Navigation
                  </SheetDescription>
                </SheetHeader>

                {/* Mobile Navigation List */}
                <motion.nav
                  variants={mobileContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-2 mt-4"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item, index) => {
                    const isActive = activeIndex === index;
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.label} variants={mobileItemVariants}>
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            handleScrollToSection(e, item.href);
                          }}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-3"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          )}
                        >
                          <Icon className={cn("size-5", isActive ? "text-primary" : "opacity-80")} />
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>

              {/* Mobile Drawer Bottom Section (Socials & CTA) */}
              <div className="flex flex-col gap-6 border-t border-border/40 pt-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                    Let's Connect
                  </span>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-9 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon className="size-4.5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-9 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon className="size-4.5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-9 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Twitter Profile"
                    >
                      <TwitterIcon className="size-4.5" />
                    </a>
                  </div>
                </div>

                <Button
                  className="w-full rounded-xl gap-2 font-medium"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <a href="#contact" onClick={(e) => handleScrollToSection(e, "#contact")}>
                    <span>Hire Me</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}