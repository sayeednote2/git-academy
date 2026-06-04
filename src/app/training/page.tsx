"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { courses, type CourseLevel } from "@/lib/data";
import type { Metadata } from "next";

const filterVendors = ["All", "Cisco", "EC-Council", "CompTIA", "Microsoft", "AWS", "Fortinet", "Palo Alto"];

const levelStyles: Record<CourseLevel, string> = {
  Beginner: "bg-[rgba(34,197,94,0.1)] text-[#22C55E]",
  Intermediate: "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]",
  Advanced: "bg-[rgba(234,179,8,0.1)] text-[#EAB308]",
  Expert: "bg-[rgba(239,68,68,0.1)] text-[#EF4444]",
};

export default function TrainingPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? courses : courses.filter((c) => c.vendor === active);

  return (
    <div className="pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Hero */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight text-white">
            Training Programs
          </h1>
          <p className="text-[#A1A1AA] mt-4 text-base leading-relaxed">
            Over 200 authorized certification programs across networking,
            cybersecurity, cloud, and enterprise infrastructure.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          {filterVendors.map((vendor) => (
            <button
              key={vendor}
              onClick={() => setActive(vendor)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active === vendor
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#18181B] text-[#A1A1AA] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] hover:text-white"
              }`}
            >
              {vendor}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#18181B] rounded-xl border border-[rgba(255,255,255,0.06)] p-6 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span
                  className="text-xs uppercase tracking-wider font-medium"
                  style={{ color: course.vendorColor }}
                >
                  {course.vendor}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{course.title}</h3>
                <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${levelStyles[course.level]}`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-[#71717A]">{course.duration}</span>
                  {course.certCode && (
                    <span className="text-xs text-[#52525B] font-[family-name:var(--font-jetbrains)]">
                      {course.certCode}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
