"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { blogPosts as basePosts } from "@/lib/data";

const allPosts = [
  ...basePosts,
  {
    id: "4",
    title: "Zero Trust Architecture: Implementation Guide for Indian Enterprises",
    slug: "zero-trust-architecture",
    excerpt: "A practical framework for implementing Zero Trust in Indian enterprise environments, from identity-first security to micro-segmentation.",
    category: "Enterprise",
    date: "2026-05-10",
    readTime: "10 min",
  },
  {
    id: "5",
    title: "Cloud Security Certifications: AWS vs Azure vs GCP",
    slug: "cloud-security-certifications",
    excerpt: "Comparing the top cloud security certifications — which platform offers the best career ROI in 2026?",
    category: "Career Guides",
    date: "2026-05-05",
    readTime: "7 min",
  },
  {
    id: "6",
    title: "SOC Analyst Day in the Life: What to Expect",
    slug: "soc-analyst-day",
    excerpt: "An inside look at what SOC analysts actually do — from morning triage to incident response and threat hunting.",
    category: "Industry Trends",
    date: "2026-04-28",
    readTime: "5 min",
  },
];

const categories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allPosts : allPosts.filter((p) => p.category === active);

  return (
    <div className="pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight text-white">
            Insights
          </h1>
          <p className="text-[#A1A1AA] mt-4 text-base max-w-lg">
            Analysis, guides, and perspectives on cybersecurity careers, certifications,
            and the evolving threat landscape.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-[#ff1a1a] text-white"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#18181B] rounded-xl border border-[rgba(255,255,255,0.06)] p-6 hover:border-[rgba(255,255,255,0.12)] transition-colors duration-200 group cursor-pointer"
            >
              <span className="text-xs px-2 py-0.5 rounded-md bg-[rgba(59,130,246,0.1)] text-[#ff1a1a] font-medium">
                {post.category}
              </span>
              <h2 className="text-lg font-semibold text-white mt-3 leading-snug group-hover:text-[#ff3333] transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 mt-4 text-xs text-[#52525B]">
                <span>{new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
