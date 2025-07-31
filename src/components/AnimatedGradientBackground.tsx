"use client";
import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
}

export default function AnimatedGradientBackground({ children }: AnimatedGradientBackgroundProps) {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/noisy.png')] opacity-20 mix-blend-overlay" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
