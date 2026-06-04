"use client";

import { motion } from "framer-motion";

const tracks = [
  {
    name: "Network Engineering",
    color: "#049FD9",
    steps: [
      { cert: "Network+", code: "N10-009", vendor: "CompTIA", duration: "40h" },
      { cert: "CCNA", code: "200-301", vendor: "Cisco", duration: "40h" },
      { cert: "ENCOR", code: "350-401", vendor: "Cisco", duration: "40h" },
      { cert: "CCIE Enterprise", code: "Lab", vendor: "Cisco", duration: "80h" },
    ],
  },
  {
    name: "Cybersecurity",
    color: "#D42027",
    steps: [
      { cert: "Security+", code: "SY0-701", vendor: "CompTIA", duration: "40h" },
      { cert: "CEH v12", code: "312-50", vendor: "EC-Council", duration: "40h" },
      { cert: "CySA+", code: "CS0-003", vendor: "CompTIA", duration: "40h" },
      { cert: "CPENT", code: "Practical", vendor: "EC-Council", duration: "40h" },
    ],
  },
  {
    name: "Cloud Security",
    color: "#00A4EF",
    steps: [
      { cert: "AZ-900", code: "AZ-900", vendor: "Microsoft", duration: "16h" },
      { cert: "AZ-104", code: "AZ-104", vendor: "Microsoft", duration: "32h" },
      { cert: "AZ-500", code: "AZ-500", vendor: "Microsoft", duration: "32h" },
      { cert: "AWS Security", code: "SCS-C02", vendor: "AWS", duration: "40h" },
    ],
  },
];

export default function CertificationsPage() {
  return (
    <div className="pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight text-white">
            Certification Pathways
          </h1>
          <p className="text-[#A1A1AA] mt-4 text-base leading-relaxed">
            Structured tracks that take you from foundation to expert. Each path builds
            on the previous certification.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {tracks.map((track, ti) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ti * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3
                className="text-lg font-bold mb-8"
                style={{ color: track.color }}
              >
                {track.name}
              </h3>

              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-3 top-3 bottom-3 w-px"
                  style={{ backgroundColor: `${track.color}20` }}
                />

                <div className="space-y-4">
                  {track.steps.map((step, si) => (
                    <div key={step.cert} className="flex gap-4 relative">
                      {/* Dot */}
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 bg-[#09090B] z-10"
                        style={{ borderColor: track.color }}
                      >
                        <span
                          className="text-[10px] font-bold"
                          style={{ color: track.color }}
                        >
                          {si + 1}
                        </span>
                      </div>

                      {/* Card */}
                      <div className="bg-[#18181B] rounded-xl border border-[rgba(255,255,255,0.06)] p-5 flex-1 hover:border-[rgba(255,255,255,0.12)] transition-colors duration-200">
                        <div className="text-xs text-[#71717A] uppercase tracking-wider">
                          {step.vendor}
                        </div>
                        <div className="text-base font-semibold text-white mt-1">
                          {step.cert}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-[#52525B] font-[family-name:var(--font-jetbrains)]">
                            {step.code}
                          </span>
                          <span className="text-xs text-[#52525B]">{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
