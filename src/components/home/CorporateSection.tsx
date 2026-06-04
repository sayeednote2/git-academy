"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  "Custom curriculum tailored to your technology stack",
  "Flexible delivery — VILT, on-site, or hybrid",
  "ROI measurement and progress tracking",
  "100% customizable to your team's skill level",
];

export function CorporateSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="bg-[#18181B] rounded-2xl p-8 lg:p-12 border border-[rgba(255,255,255,0.06)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left */}
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium">
                Enterprise
              </span>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight leading-tight mt-4 text-white">
                Custom training for your team.
              </h2>
              <p className="text-[#A1A1AA] text-sm mt-4 leading-relaxed">
                We&apos;ve designed and delivered cybersecurity programs for teams at
                India&apos;s leading enterprises.
              </p>
              <Link
                href="/corporate"
                className="inline-flex mt-6 bg-[#3B82F6] text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-[#60A5FA] transition-colors duration-200"
              >
                Request a Briefing →
              </Link>
            </div>

            {/* Right */}
            <div className="lg:col-span-7 flex items-center">
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                    <span className="text-[#A1A1AA] text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
