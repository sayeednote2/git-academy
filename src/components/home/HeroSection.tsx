"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { WordFadeIn } from "@/components/ui/WordFadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Dynamic import with SSR disabled — renders immediately on client, no lazy/Suspense needed
const HeroShield = dynamic(
  () => import("@/components/three/HeroShield").then((mod) => mod.HeroShield),
  {
    ssr: false,
    loading: () => <ShieldFallback />,
  }
);

// SVG fallback for mobile / SSR / loading
function ShieldFallback() {
  return (
    <svg
      width="300"
      height="350"
      viewBox="0 0 300 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[200px] h-[230px] sm:w-[250px] sm:h-[290px] lg:w-[300px] lg:h-[350px]"
    >
      <path
        d="M150 10 L280 60 L280 180 Q280 280 150 340 Q20 280 20 180 L20 60 Z"
        stroke="#ff1a1a"
        strokeWidth="1.5"
        fill="none"
        className="shield-draw"
      />
      <path
        d="M150 40 L255 80 L255 175 Q255 260 150 310 Q45 260 45 175 L45 80 Z"
        stroke="#ff1a1a"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
        className="shield-draw"
        style={{ animationDelay: "1s" }}
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Left — Typography */}
          <div className="lg:col-span-7 relative z-10">
            <div className="flex flex-col">
              <WordFadeIn 
                words="YOUR MISSION STARTS HERE" 
                className="text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.04em] text-white block mb-6"
                delay={0.15} 
              />
              <div className="flex flex-col text-2xl md:text-3xl font-semibold leading-[1.3] text-[#A1A1AA]">
                <span>Accelerate your mastery in</span>
                <span className="text-[#ff1a1a]">
                  <TypingEffect phrases={["IT Certifications", "Cisco Networking", "Cyber Security", "Cloud Computing", "Ethical Hacking"]} />
                </span>
                <span>with real-world interactive labs.</span>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-[#A1A1AA] max-w-md mt-8 leading-relaxed"
            >
              We prepare the defenders the digital world needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <MagneticButton strength={0.25}>
                <Link
                  href="/training"
                  className="bg-[#ff1a1a] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#ff3333] transition-colors duration-200 inline-block"
                >
                  Explore Programs
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link
                  href="/certifications"
                  className="border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] rounded-lg px-6 py-3 text-sm font-medium hover:text-white hover:border-[rgba(255,255,255,0.24)] transition-all duration-200 inline-block"
                >
                  View Certifications
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — 3D Shield (desktop) / SVG Shield (mobile) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:-ml-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="w-full"
            >
              {/* Desktop: 3D Shield */}
              <div className="hidden lg:block">
                <HeroShield />
              </div>
              {/* Mobile: SVG Shield */}
              <div className="lg:hidden flex justify-center">
                <ShieldFallback />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
