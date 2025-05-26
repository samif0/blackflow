"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedSloganProps {
  slogans: string[];
  className?: string;
}
// TODO: Fix animation when slogan is changing!
 
export default function AnimatedSlogan({ slogans, className }: AnimatedSloganProps) {
  const [current, setCurrent] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const words = slogans[current].split(" ");

  // Repeat animation every 10 seconds, cycling slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setAnimationKey((k) => k + 1);
        setCurrent((c) => (c + 1) % slogans.length);
        setIsVisible(true);
      }, 500); // Wait for exit animation to complete
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
        {isVisible && (
          <motion.h1
            key={animationKey}
            className="h1"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {words.map((word, index) => (
              <motion.span
                key={`${animationKey}-${index}`}
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
        )}
      </AnimatePresence>
    </div>
  );
}