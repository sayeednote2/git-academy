"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { careerOutcomes } from "@/lib/data";
import { Meteors } from "@/components/ui/Meteors";

export function CareerOutcomes() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Meteors number={20} />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium">
            Career Outcomes
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mt-4 text-white">
            From student to defender
          </h2>
        </motion.div>

        <div className="mt-12 space-y-8">
          {careerOutcomes.map((outcome, i) => (
            <motion.div
              key={outcome.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center"
            >
              {/* Before */}
              <div className="bg-[#18181B] rounded-xl p-6 border border-[rgba(255,255,255,0.06)] opacity-60">
                <div className="text-sm text-[#71717A] mb-1">Before</div>
                <div className="text-lg font-semibold text-[#A1A1AA]">
                  {outcome.name}
                </div>
                <div className="text-sm text-[#71717A] mt-1">
                  {outcome.before.role}
                </div>
                <div className="text-sm text-[#52525B] mt-0.5">
                  {outcome.before.salary}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-[#3B82F6]">
                  <div className="hidden md:block w-8 h-px bg-[#3B82F6]" />
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* After */}
              <div className="bg-[#18181B] rounded-xl p-6 border border-[rgba(255,255,255,0.06)] border-l-2 border-l-[#3B82F6]">
                <div className="text-sm text-[#3B82F6] mb-1">After</div>
                <div className="text-lg font-semibold text-white">
                  {outcome.name}
                </div>
                <div className="text-sm text-[#A1A1AA] mt-1">
                  {outcome.after.role}
                </div>
                <div className="text-sm text-white font-medium mt-0.5">
                  {outcome.after.salary}
                </div>
                <div className="flex gap-2 mt-3">
                  {outcome.after.certs.map((cert) => (
                    <span
                      key={cert}
                      className="text-xs px-2 py-0.5 rounded-md bg-[rgba(59,130,246,0.1)] text-[#3B82F6] font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-[#52525B] mt-3">
                  {outcome.program}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
