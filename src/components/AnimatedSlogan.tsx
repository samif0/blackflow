"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedSloganProps {
  slogans: string[];
  className?: string;
}
export default function AnimatedSlogan({ slogans, className }: AnimatedSloganProps) {
  const [current, setCurrent] = useState(0);

  const words = slogans[current].split(" ");

  // Cycle slogans every 10 seconds and let AnimatePresence handle transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slogans.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slogans.length]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.04,
        when: "beforeChildren"
      },
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`text-center ${className || ""}`}>
      <AnimatePresence mode="wait">
        <motion.h1
          key={current}
          className="h1"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${current}-${index}`}
              variants={child}
              style={{
                display: "inline-block",
                marginRight: "0.25em",
                whiteSpace: "nowrap"
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
