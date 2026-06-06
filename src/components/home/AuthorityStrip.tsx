"use client";

import { motion } from "framer-motion";
import { vendors } from "@/lib/data";
import { DotPattern } from "@/components/ui/DotPattern";

export function AuthorityStrip() {
  // Duplicate array so it can loop seamlessly
  const scrollItems = [...vendors, ...vendors, ...vendors];

  return (
    <section className="py-12 border-y border-[rgba(255,255,255,0.06)] relative overflow-hidden bg-[#09090B]">
      <div className="absolute inset-0 z-0">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="opacity-50 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"
        />
      </div>

      {/* Left/Right Fade Masks to make it smoothly enter/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-r from-[#09090B] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-l from-[#09090B] to-transparent pointer-events-none" />

      <div className="max-w-full mx-auto relative z-10 overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap w-max items-center"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {scrollItems.map((vendor, i) => (
            <div key={`${vendor}-${i}`} className="flex items-center px-10 shrink-0">
              <span 
                className="text-lg md:text-xl font-bold tracking-wider uppercase text-[#ff1a1a] drop-shadow-[0_0_15px_rgba(255,26,26,0.6)]"
              >
                {vendor}
              </span>
              <div className="w-2 h-2 rounded-full bg-[#ff1a1a] opacity-40 ml-20 drop-shadow-[0_0_8px_rgba(255,26,26,0.8)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
