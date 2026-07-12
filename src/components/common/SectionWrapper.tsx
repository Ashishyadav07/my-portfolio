"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  ariaLabel: string;
  gridBackground?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  ariaLabel,
  gridBackground = true,
  className,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32 w-full bg-background text-foreground transition-colors duration-300 overflow-hidden",
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Grid background overlay */}
      {gridBackground && (
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none" 
          aria-hidden="true"
        />
      )}
      {children}
    </section>
  );
}
