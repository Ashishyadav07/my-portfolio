"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export default function Container({
  children,
  clean = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 md:px-6 relative z-10",
        !clean && "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
