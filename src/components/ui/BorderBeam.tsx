"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  colorFrom = "#3B82F6", // Blue
  colorTo = "#A1A1AA", // Zinc
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1] overflow-hidden rounded-[inherit]",
        className
      )}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
        className="absolute inset-0 w-full h-full"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 70%, ${colorTo} 85%, ${colorFrom} 100%)`,
          width: `${size}%`,
          height: `${size}%`,
          left: `-${(size - 100) / 2}%`,
          top: `-${(size - 100) / 2}%`,
        }}
      />
    </div>
  );
}
