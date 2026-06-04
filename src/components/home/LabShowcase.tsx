"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { labEnvironments } from "@/lib/data";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { DotPattern } from "@/components/ui/DotPattern";

export function LabShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const resetTerminal = useCallback((index: number) => {
    setVisibleLines([]);
    setIsTyping(true);
    const commands = labEnvironments[index].commands;
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex < commands.length) {
        setVisibleLines((prev) => [...prev, commands[lineIndex]]);
        lineIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = resetTerminal(activeIndex);
    return cleanup;
  }, [activeIndex, resetTerminal]);

  const colorLine = (line: string) => {
    if (!line) return "text-[#71717A]";
    if (line.startsWith("$") || line.startsWith("Router") || line.startsWith("PA-VM") || line.startsWith("FortiGate") || line.startsWith("analyst"))
      return "text-[#A1A1AA]";
    if (line.startsWith("[ALERT]") || line.startsWith("[FINDING]"))
      return "text-[#EAB308]";
    if (line.startsWith("[+]") || line.startsWith("[ACTION]"))
      return "text-[#22C55E]";
    if (line.startsWith("[*]"))
      return "text-[#3B82F6]";
    if (line.startsWith("meterpreter") || line.startsWith("msf"))
      return "text-[#EF4444]";
    return "text-[#71717A]";
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DotPattern
          width={24}
          height={24}
          cx={1}
          cy={1}
          cr={1}
          className="opacity-30 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium">
            Virtual Labs
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mt-4 text-white">
            Your proving ground
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid lg:grid-cols-12 gap-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Terminal */}
          <div className="lg:col-span-8 relative rounded-xl lg:rounded-r-none p-[1px] overflow-hidden bg-[rgba(255,255,255,0.06)]">
            <BorderBeam size={400} duration={12} colorFrom="#3B82F6" colorTo="transparent" />
            <div className="bg-[#18181B] rounded-[11px] lg:rounded-r-none h-full w-full overflow-hidden relative z-10 flex flex-col">
              {/* Title bar */}
              <div className="h-10 bg-[#27272A] flex shrink-0 items-center justify-between px-4 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              </div>
              <span className="text-xs text-[#71717A] font-[family-name:var(--font-jetbrains)]">
                {labEnvironments[activeIndex].name}
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-6 min-h-[300px] font-[family-name:var(--font-jetbrains)] text-sm">
              {visibleLines.map((line, i) => (
                <div key={i} className={`${colorLine(line)} leading-7`}>
                  {line}
                </div>
              ))}
              {isTyping && (
                <span className="text-[#3B82F6] terminal-cursor">█</span>
              )}
            </div>
          </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 bg-[#18181B] lg:bg-transparent border border-[rgba(255,255,255,0.06)] lg:border-l-0 rounded-xl lg:rounded-l-none p-2 lg:p-3">
            <div className="flex flex-col">
              {labEnvironments.map((lab, i) => (
                <button
                  key={lab.name}
                  onClick={() => setActiveIndex(i)}
                  className={`text-left py-3 px-4 rounded-lg text-sm transition-all duration-200 ${
                    i === activeIndex
                      ? "text-white bg-[#27272A] border-l-2 border-[#3B82F6]"
                      : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
                  }`}
                >
                  {lab.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#71717A] mt-4 px-4 leading-relaxed">
              {labEnvironments[activeIndex].description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
