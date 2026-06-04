"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { courses, type CourseLevel } from "@/lib/data";

const levelStyles: Record<CourseLevel, string> = {
  Beginner: "bg-[rgba(34,197,94,0.1)] text-[#22C55E]",
  Intermediate: "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]",
  Advanced: "bg-[rgba(234,179,8,0.1)] text-[#EAB308]",
  Expert: "bg-[rgba(239,68,68,0.1)] text-[#EF4444]",
};

export function CertEcosystem() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayCourses = courses.slice(0, 8);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
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
        className="mt-12 overflow-x-auto hide-scrollbar"
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
              className="w-[360px] flex-shrink-0 bg-[#18181B] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-0.5 transition-all duration-200 group"
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
            </motion.div>
          ))}

          {/* View all link */}
          <div className="w-[200px] flex-shrink-0 flex items-center justify-center">
            <Link
              href="/training"
              className="text-[#3B82F6] hover:text-[#60A5FA] text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            >
              View all programs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
