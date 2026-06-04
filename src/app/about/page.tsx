"use client";

import { motion } from "framer-motion";
import { vendors } from "@/lib/data";

const milestones = [
  { year: "2002", event: "Founded in Bangalore as a Cisco authorized training center" },
  { year: "2005", event: "Became authorized EC-Council training partner" },
  { year: "2010", event: "Expanded to CompTIA and Microsoft certifications" },
  { year: "2015", event: "Trained our 5,000th cybersecurity professional" },
  { year: "2020", event: "Launched virtual labs and remote training infrastructure" },
  { year: "2024", event: "Surpassed 10,000+ certified professionals" },
];

const values = [
  { title: "Excellence", desc: "We maintain the highest standards in training delivery, curriculum design, and student outcomes." },
  { title: "Innovation", desc: "We continuously adapt our programs to match the evolving threat landscape and technology stack." },
  { title: "Integrity", desc: "We are honest about what our programs can deliver and transparent about outcomes and expectations." },
  { title: "Impact", desc: "We measure success by the careers we transform and the organizations we help protect." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight text-white">
            Our Story
          </h1>
        </motion.div>

        {/* Narrative */}
        <motion.div
          className="mt-12 max-w-[700px] space-y-5 text-[#A1A1AA] text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>
            GIT Academy was founded in 2002 in Bangalore with a singular mission: to
            build the technical talent that India&apos;s growing IT industry desperately
            needed. What started as a Cisco networking training center has evolved into
            one of India&apos;s most respected cybersecurity academies.
          </p>
          <p>
            Over two decades, we&apos;ve trained over 10,000 professionals across
            networking, cybersecurity, cloud, and enterprise infrastructure. Our
            graduates work at companies like Infosys, Wipro, TCS, HCLTech, Accenture,
            and global cybersecurity firms.
          </p>
          <p>
            We&apos;re not an online course marketplace. We&apos;re an authorized
            training partner — every program is instructor-led by certified
            practitioners, backed by hands-on lab environments, and designed to produce
            measurable career outcomes.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-24">
          <h2 className="text-xl font-bold text-white">Timeline</h2>
          <div className="mt-8 relative">
            <div className="absolute left-3 top-3 bottom-3 w-px bg-[rgba(255,255,255,0.06)]" />
            <div className="space-y-6">
              {milestones.map((ms, i) => (
                <motion.div
                  key={ms.year}
                  className="flex gap-6 relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6] bg-[#09090B] flex items-center justify-center shrink-0 z-10">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  </div>
                  <div className="pb-2">
                    <span className="text-sm font-bold text-white">{ms.year}</span>
                    <p className="text-sm text-[#A1A1AA] mt-1">{ms.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <h2 className="text-xl font-bold text-white">Our Values</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-base font-semibold text-white">{v.title}</h3>
                <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mt-24">
          <h2 className="text-xl font-bold text-white mb-8">Authorized Partners</h2>
          <div className="flex flex-wrap gap-6">
            {vendors.map((v) => (
              <span key={v} className="text-xs font-medium text-[#52525B] tracking-widest uppercase">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
