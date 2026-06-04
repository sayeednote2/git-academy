"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export function WordFadeIn({
  words,
  className,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
    visible: (i: any) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { delay: i * delay, duration: 0.8, ease: "easeOut" },
    }),
  },
}: WordFadeInProps) {
  const _words = words.split(" ");

  return (
    <motion.h1
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn("font-bold tracking-[-0.02em]", className)}
    >
      {_words.map((word, i) => (
        <motion.span key={i} custom={i} variants={variants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
