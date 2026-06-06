"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Assess", desc: "We evaluate your team's current skill levels and identify gaps." },
  { num: "02", title: "Design", desc: "Custom curriculum tailored to your technology stack and objectives." },
  { num: "03", title: "Deliver", desc: "Expert-led training in your preferred format — on-site, VILT, or hybrid." },
  { num: "04", title: "Measure", desc: "Track progress with assessments, certifications, and ROI metrics." },
];

export default function CorporatePage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

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
            Enterprise Cybersecurity Training
          </h1>
          <p className="text-[#A1A1AA] mt-4 text-base leading-relaxed">
            Custom programs designed for your organization&apos;s unique security
            requirements and technology stack.
          </p>
        </motion.div>

        {/* Process */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="text-4xl font-bold text-[#27272A]">{step.num}</span>
              <h3 className="text-base font-semibold text-white mt-2">{step.title}</h3>
              <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 right-0 w-full h-px bg-[rgba(255,255,255,0.06)] translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          className="mt-24 bg-[#18181B] rounded-2xl border border-[rgba(255,255,255,0.06)] p-8 lg:p-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xl font-bold text-white">Request a briefing</h2>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Tell us about your team and we&apos;ll design a custom program.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#ff1a1a] focus:outline-none transition-colors duration-200"
              />
              <input
                type="email"
                placeholder="Work email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#ff1a1a] focus:outline-none transition-colors duration-200"
              />
            </div>
            <input
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#ff1a1a] focus:outline-none transition-colors duration-200"
            />
            <textarea
              placeholder="Tell us about your training needs"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#ff1a1a] focus:outline-none transition-colors duration-200 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-[#ff1a1a] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#ff3333] transition-colors duration-200"
            >
              Submit Request
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
