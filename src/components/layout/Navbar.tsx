"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const trainingLink = navLinks[0];
  const otherLinks = navLinks.slice(1);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090B]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <Image 
            src="/git-logo-100px.png" 
            alt="Git Academy Logo" 
            width={28} 
            height={28} 
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold text-white">GIT</span>
            <span className="text-lg font-light text-[#A1A1AA]">Academy</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Training with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTrainingOpen(true)}
            onMouseLeave={() => setTrainingOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-[#A1A1AA] hover:text-white transition-colors duration-200">
              {trainingLink.label}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  trainingOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {trainingOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-[#18181B] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 w-[420px] grid grid-cols-2 gap-1">
                  {trainingLink.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded-lg px-3 py-2.5 hover:bg-[#27272A] transition-colors duration-200 group"
                      onClick={() => setTrainingOpen(false)}
                    >
                      <div className="text-sm font-medium text-white group-hover:text-white">
                        {child.label}
                      </div>
                      <div className="text-xs text-[#71717A] mt-0.5">
                        {child.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {otherLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-[#A1A1AA] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex bg-[#3B82F6] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#60A5FA] transition-colors duration-200"
        >
          Enroll Now
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[#A1A1AA] hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#09090B] border-t border-[rgba(255,255,255,0.06)] z-40 overflow-y-auto">
          <div className="px-6 py-6 flex flex-col gap-1">
            {/* Training accordion */}
            <button
              className="flex items-center justify-between w-full py-3 text-base text-[#A1A1AA] hover:text-white transition-colors"
              onClick={() => setMobileTrainingOpen(!mobileTrainingOpen)}
            >
              Training
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileTrainingOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileTrainingOpen && (
              <div className="pl-4 pb-2 flex flex-col gap-1">
                {trainingLink.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="py-2 text-sm text-[#71717A] hover:text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}

            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-base text-[#A1A1AA] hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.06)]">
              <Link
                href="/contact"
                className="inline-flex bg-[#3B82F6] text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-[#60A5FA] transition-colors w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
