"use client";
import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
}

export default function AnimatedGradientBackground({ children }: AnimatedGradientBackgroundProps) {
  return (
    <motion.div 
      className="flex flex-col min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="bg-gray-100 absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600"
        animate={{
          background: [
            // ...your animated backgrounds if any...
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: "url('/noisy.png')",
          backgroundRepeat: "repeat",
          opacity: 0.99,
          mixBlendMode: "overlay"
        }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-20 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  );
}