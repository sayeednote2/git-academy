"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", inquiry: "", message: "",
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.h1
          className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Get in Touch
        </motion.h1>

        <div className="grid lg:grid-cols-12 gap-12 mt-12">
          {/* Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#18181B] rounded-xl border border-[rgba(255,255,255,0.06)] p-8">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#3B82F6] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#3B82F6] focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#3B82F6] focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Company (optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#3B82F6] focus:outline-none transition-colors"
                  />
                </div>
                <select
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  className="w-full bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm focus:border-[#3B82F6] focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="text-[#52525B]">Inquiry type</option>
                  <option value="individual">Individual Training</option>
                  <option value="corporate">Corporate Training</option>
                  <option value="certifications">Certifications</option>
                  <option value="labs">Lab Access</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#09090B] border border-[rgba(255,255,255,0.06)] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#52525B] focus:border-[#3B82F6] focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#3B82F6] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#60A5FA] transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Phone</h3>
                <a href="tel:+919972177745" className="text-[#A1A1AA] text-sm hover:text-white transition-colors">
                  +91 99721 77745
                </a>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Email</h3>
                <a href="mailto:info@gitinfo.com" className="text-[#A1A1AA] text-sm hover:text-white transition-colors">
                  info@gitinfo.com
                </a>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Address</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  Jayanagar 4th Block,<br />
                  Bengaluru, Karnataka 560041<br />
                  India
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Hours</h3>
                <p className="text-[#A1A1AA] text-sm">
                  Mon – Sat: 9:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-[700px]">
          <h2 className="text-xl font-bold text-white">Common Questions</h2>
          <div className="mt-6">
            {faqs.slice(0, 3).map((faq, i) => (
              <div key={i} className="border-b border-[rgba(255,255,255,0.06)]">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-medium text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#71717A] shrink-0 transition-transform duration-200 ${openFAQ === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[#A1A1AA] pb-5 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
