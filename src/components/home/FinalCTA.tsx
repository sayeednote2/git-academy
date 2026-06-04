"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Particles } from "@/components/ui/Particles";

export function FinalCTA() {
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles quantity={150} staticity={40} color="#3B82F6" />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight text-white">
            The threat landscape
            <br />
            won&apos;t wait.
          </h2>
          <p className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight text-[#71717A] mt-1">
            Neither should you.
          </p>
          <p className="text-[#A1A1AA] mt-6 text-base">
            Join the next generation of cybersecurity professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/training"
              className="bg-[#3B82F6] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#60A5FA] transition-colors duration-200"
            >
              Start Your Mission
            </Link>
            <Link
              href="/contact"
              className="border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] rounded-lg px-6 py-3 text-sm font-medium hover:text-white hover:border-[rgba(255,255,255,0.24)] transition-all duration-200"
            >
              Talk to an Advisor
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
