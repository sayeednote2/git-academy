"use client";

import { motion } from "framer-motion";
import { trainers } from "@/lib/data";
import { AnimatedGridPattern } from "@/components/ui/AnimatedGridPattern";

export function TrainerSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.15}
          duration={3}
          repeatDelay={1}
          className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium">
            Expert Instructors
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mt-4 text-white">
            Learn from elite operators
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {trainers.map((trainer, i) => (
            <div
              key={trainer.name}
              className={`py-8 px-6 ${
                i < trainers.length - 1
                  ? "border-r border-[rgba(255,255,255,0.06)]"
                  : ""
              } ${i < 2 ? "max-lg:border-b max-lg:border-[rgba(255,255,255,0.06)]" : ""} ${
                i % 2 === 0 ? "max-lg:border-r" : "max-lg:border-r-0"
              }`}
            >
              <div className="text-lg font-semibold text-white">
                {trainer.name}
              </div>
              <div className="text-sm text-[#A1A1AA] mt-1">{trainer.title}</div>

              <div className="w-8 h-px bg-[#3B82F6] mt-4 mb-4" />

              <div className="flex flex-col gap-1.5">
                {trainer.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="text-xs font-[family-name:var(--font-jetbrains)] text-[#71717A] uppercase tracking-wider"
                  >
                    {cert}
                  </span>
                ))}
              </div>

              <div className="text-sm text-[#52525B] mt-4">
                {trainer.experience}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
