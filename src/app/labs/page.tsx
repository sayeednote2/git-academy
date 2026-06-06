"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Server, Clock, Wifi, Monitor, FileCheck } from "lucide-react";

const features = [
  { icon: Clock, title: "24/7 Access", desc: "Lab environments available around the clock via secure VPN connection." },
  { icon: Server, title: "Real Hardware", desc: "Cisco routers, firewalls, and switches — not simulated environments." },
  { icon: Shield, title: "Guided Scenarios", desc: "Step-by-step attack and defense scenarios with real-world context." },
  { icon: Wifi, title: "VPN Access", desc: "Connect from anywhere with enterprise-grade VPN infrastructure." },
  { icon: Monitor, title: "Enterprise Grade", desc: "Environments mirror production networks at Fortune 500 companies." },
  { icon: FileCheck, title: "Practice Exams", desc: "Certification-aligned practice tests integrated into lab workflows." },
];

export default function LabsPage() {
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
            Virtual Labs
          </h1>
          <p className="text-[#A1A1AA] mt-4 text-base leading-relaxed">
            Hands-on environments with real hardware and software. Practice attacks,
            build defenses, and master the tools professionals use daily.
          </p>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          className="mt-16 bg-[#18181B] rounded-xl border border-[rgba(255,255,255,0.06)] overflow-hidden max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-10 bg-[#27272A] flex items-center px-4 gap-2 border-b border-[rgba(255,255,255,0.06)]">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="p-6 font-[family-name:var(--font-jetbrains)] text-sm space-y-1">
            <div className="text-[#A1A1AA]">$ ssh student@lab.gitacademy.com</div>
            <div className="text-[#71717A]">Welcome to GIT Academy Lab Environment</div>
            <div className="text-[#71717A]">Connected to: SOC-LAB-01 (Bangalore)</div>
            <div className="text-[#71717A]">Available environments: 5</div>
            <div className="text-[#A1A1AA]">$ lab --list</div>
            <div className="text-[#22C55E]">[1] SOC Environment — SIEM, Log Analysis</div>
            <div className="text-[#22C55E]">[2] Penetration Testing — Full Scope</div>
            <div className="text-[#22C55E]">[3] Cloud Security — AWS/Azure/GCP</div>
            <div className="text-[#22C55E]">[4] Network Defense — Cisco/Palo Alto</div>
            <div className="text-[#22C55E]">[5] Malware Analysis — Sandbox RE</div>
            <div className="text-[#A1A1AA]">$ lab --connect 1</div>
            <div className="text-[#ff1a1a]">[*] Initializing SOC environment...</div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="p-6"
            >
              <feature.icon className="w-5 h-5 text-[#ff1a1a] mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-flex bg-[#ff1a1a] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#ff3333] transition-colors duration-200"
          >
            Request Lab Access
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
