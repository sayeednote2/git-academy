"use client";


import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { courses, type CourseLevel } from "@/lib/data";
import { MagicCard } from "@/components/ui/MagicCard";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

const levelStyles: Record<CourseLevel, string> = {
  Beginner: "bg-[rgba(34,197,94,0.1)] text-[#22C55E]",
  Intermediate: "bg-[rgba(59,130,246,0.1)] text-[#ff1a1a]",
  Advanced: "bg-[rgba(234,179,8,0.1)] text-[#EAB308]",
  Expert: "bg-[rgba(239,68,68,0.1)] text-[#EF4444]",
};

export function CertEcosystem() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayCourses = courses.slice(0, 8);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current) {
        // If scrolling horizontally (e.g. trackpad), let it be
        if (e.deltaX !== 0) return;
        
        const container = scrollRef.current;
        
        // Determine if we are at the boundaries
        const isAtLeft = container.scrollLeft === 0;
        const isAtRight = Math.abs(container.scrollWidth - container.clientWidth - container.scrollLeft) < 1;

        // If scrolling up at left edge or scrolling down at right edge, let the page scroll vertically
        if ((isAtLeft && e.deltaY < 0) || (isAtRight && e.deltaY > 0)) {
          return;
        }

        // Otherwise, convert vertical scroll to horizontal
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AuroraBackground className="bg-transparent" showRadialGradient={true} />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium">
            Training Programs
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mt-4 text-white">
            Industry-leading certifications
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="mt-12 overflow-x-auto hide-scrollbar relative z-10"
      >
        <div className="flex gap-6 px-6 lg:px-[max(1.5rem,calc((100vw-1200px)/2+3rem))]">
          {displayCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[360px] flex-shrink-0 group"
            >
              <MagicCard 
                gradientColor={course.vendorColor}
                gradientOpacity={0.15}
                className="p-8 transition-transform duration-200"
              >
                <span
                  className="text-xs uppercase tracking-wider font-medium"
                  style={{ color: course.vendorColor }}
                >
                  {course.vendor}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">{course.title}</h3>
                <p className="text-sm text-[#A1A1AA] mt-3 leading-relaxed line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                      levelStyles[course.level]
                    }`}
                  >
                    {course.level}
                  </span>
                  <span className="text-xs text-[#71717A]">{course.duration}</span>
                  {course.certCode && (
                    <span className="text-xs text-[#52525B] font-mono">
                      {course.certCode}
                    </span>
                  )}
                </div>
              </MagicCard>
            </motion.div>
          ))}

          {/* View all link */}
          <div className="w-[200px] flex-shrink-0 flex items-center justify-center">
            <Link
              href="/training"
              className="text-[#ff1a1a] hover:text-[#ff3333] text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            >
              View all programs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
