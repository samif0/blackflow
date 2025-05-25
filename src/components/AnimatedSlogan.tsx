"use client";
import { motion } from "framer-motion";

interface AnimatedSloganProps {
  text: string;
  className?: string;
}

export default function AnimatedSlogan({ text, className }: AnimatedSloganProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "tween", 
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={`text-center ${className || ""}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <h1 className="h1">
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  );
}