"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TypingEffect({ phrases = [] }: { phrases: string[] }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentFullPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && currentText === currentFullPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      const nextText = isDeleting
        ? currentFullPhrase.substring(0, currentText.length - 1)
        : currentFullPhrase.substring(0, currentText.length + 1);

      const typingSpeed = isDeleting ? 50 : 100;
      timeout = setTimeout(() => setCurrentText(nextText), typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phrases, currentPhraseIndex]);

  return (
    <span className="inline-flex items-center min-w-[2ch]">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[4px] h-[0.9em] bg-current ml-[2px]"
      />
    </span>
  );
}
