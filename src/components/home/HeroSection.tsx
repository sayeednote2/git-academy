"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/FlickeringGrid";
import { WordFadeIn } from "@/components/ui/WordFadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Lazy-load 3D shield (heavy — only on desktop)
const HeroShield = lazy(() =>
  import("@/components/three/HeroShield").then((mod) => ({
    default: mod.HeroShield,
  }))
);

// SVG fallback for mobile / SSR
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
        stroke="#3B82F6"
        strokeWidth="1.5"
        fill="none"
        className="shield-draw"
      />
      <path
        d="M150 40 L255 80 L255 175 Q255 260 150 310 Q45 260 45 175 L45 80 Z"
        stroke="#3B82F6"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
        className="shield-draw"
        style={{ animationDelay: "1s" }}
      />
      <rect
        x="125"
        y="145"
        width="50"
        height="45"
        rx="4"
        stroke="#3B82F6"
        strokeWidth="1.5"
        fill="none"
        className="shield-draw"
        style={{ animationDelay: "1.5s" }}
      />
      <path
        d="M135 145 L135 125 Q135 105 150 105 Q165 105 165 125 L165 145"
        stroke="#3B82F6"
        strokeWidth="1.5"
        fill="none"
        className="shield-draw"
        style={{ animationDelay: "1.8s" }}
      />
      <circle
        cx="150"
        cy="163"
        r="5"
        stroke="#3B82F6"
        strokeWidth="1.5"
        fill="none"
        className="shield-draw"
        style={{ animationDelay: "2.1s" }}
      />
      <line
        x1="150"
        y1="168"
        x2="150"
        y2="178"
        stroke="#3B82F6"
        strokeWidth="1.5"
        className="shield-draw"
        style={{ animationDelay: "2.3s" }}
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FlickeringGrid color="#3B82F6" squareSize={4} gridGap={6} maxOpacity={0.15} />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Left — Typography */}
          <div className="lg:col-span-7 relative z-10">
            <div className="flex flex-col">
              <WordFadeIn 
                words="YOUR MISSION STARTS HERE" 
                className="text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] text-white block"
                delay={0.15} 
              />
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
                  className="bg-[#3B82F6] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#60A5FA] transition-colors duration-200 inline-block"
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
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full"
            >
              {/* Desktop: 3D Shield */}
              <div className="hidden lg:block">
                <Suspense fallback={<ShieldFallback />}>
                  <HeroShield />
                </Suspense>
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
