"use client";

import * as React from "react";
import { cn } from "./utils";

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styling
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-1 text-base transition-[color,box-shadow] outline-none",
        // File input styles
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Placeholder + selection
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        // Focus, validation & disabled states
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Dark mode & custom
        "dark:bg-input/30",
        "md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
