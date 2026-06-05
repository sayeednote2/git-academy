"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RetroGrid } from "@/components/ui/RetroGrid";

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "2002", numericValue: 2002, suffix: "", label: "Founded" },
  { value: "95%", numericValue: 95, suffix: "%", label: "Pass Rate" },
  { value: "200+", numericValue: 200, suffix: "+", label: "Programs" },
  { value: "24/7", numericValue: 24, suffix: "/7", label: "Lab Access" },
];

function AnimatedCounter({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const start = 0;
    const end = stat.numericValue;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, stat.numericValue]);

  return (
    <div ref={ref} className="text-3xl font-bold text-white tabular-nums">
      {isInView ? `${count}${stat.suffix}` : "0"}
    </div>
  );
}

export function WhySection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <RetroGrid angle={65} className="opacity-40" />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — Story */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium">
              About
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mt-4 text-white">
              The command center for cybersecurity careers.
            </h2>
            <div className="mt-6 space-y-4 text-[#A1A1AA] text-base leading-relaxed max-w-lg">
              <p>
                Since 2002, GIT Academy has operated from Bangalore as an authorized
                training partner for the world&apos;s leading technology vendors. We don&apos;t
                just teach certifications — we build the technical foundation that
                transforms careers.
              </p>
              <p>
                Our approach is hands-on, instructor-led, and relentlessly practical.
                Every program is designed around real-world scenarios, delivered by
                practitioners who&apos;ve spent decades in enterprise security, not just
                in classrooms.
              </p>
            </div>
          </motion.div>

          {/* Right — Animated Counters */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-6 ${
                    i < stats.length - 1 ? "border-b border-[rgba(255,255,255,0.06)]" : ""
                  }`}
                >
                  <AnimatedCounter stat={stat} />
                  <div className="text-sm text-[#71717A] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
