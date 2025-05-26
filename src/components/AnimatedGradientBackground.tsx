"use client";
import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
}

export default function AnimatedGradientBackground({
  children
}: AnimatedGradientBackgroundProps) {
  return (
    <motion.div
      className="flex flex-col min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Base solid color */}
      <div className="absolute inset-0 bg-gray-900" />

      {/* Primary gradient with many stops */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(17, 24, 39, 1) 0%,
            rgba(19, 25, 40, 1) 2%,
            rgba(21, 26, 41, 1) 4%,
            rgba(23, 27, 42, 1) 6%,
            rgba(25, 28, 43, 1) 8%,
            rgba(27, 29, 44, 1) 10%,
            rgba(29, 30, 45, 1) 12%,
            rgba(31, 31, 46, 1) 14%,
            rgba(33, 32, 47, 1) 16%,
            rgba(35, 33, 48, 1) 18%,
            rgba(37, 34, 49, 1) 20%,
            rgba(39, 35, 50, 1) 22%,
            rgba(41, 36, 51, 1) 24%,
            rgba(43, 37, 52, 1) 26%,
            rgba(45, 38, 53, 1) 28%,
            rgba(47, 39, 54, 1) 30%,
            rgba(49, 40, 55, 1) 32%,
            rgba(51, 41, 56, 1) 34%,
            rgba(53, 42, 57, 1) 36%,
            rgba(55, 43, 58, 1) 38%,
            rgba(57, 44, 59, 1) 40%,
            rgba(59, 45, 60, 1) 42%,
            rgba(61, 46, 61, 1) 44%,
            rgba(63, 47, 62, 1) 46%,
            rgba(65, 48, 63, 1) 48%,
            rgba(67, 49, 64, 1) 50%,
            rgba(69, 50, 65, 1) 52%,
            rgba(71, 51, 66, 1) 54%,
            rgba(73, 52, 67, 1) 56%,
            rgba(75, 53, 68, 1) 58%,
            rgba(77, 54, 69, 1) 60%,
            rgba(79, 55, 70, 1) 62%,
            rgba(81, 56, 71, 1) 64%,
            rgba(83, 57, 72, 1) 66%,
            rgba(85, 58, 73, 1) 68%,
            rgba(87, 59, 74, 1) 70%,
            rgba(89, 60, 75, 1) 72%,
            rgba(91, 61, 76, 1) 74%,
            rgba(93, 62, 77, 1) 76%,
            rgba(95, 63, 78, 1) 78%,
            rgba(97, 64, 79, 1) 80%,
            rgba(99, 65, 80, 1) 82%,
            rgba(101, 66, 81, 1) 84%,
            rgba(103, 67, 82, 1) 86%,
            rgba(105, 68, 83, 1) 88%,
            rgba(107, 69, 84, 1) 90%,
            rgba(109, 70, 85, 1) 92%,
            rgba(111, 71, 86, 1) 94%,
            rgba(113, 72, 87, 1) 96%,
            rgba(115, 73, 88, 1) 98%,
            rgb(0, 0, 0) 100%
          )`
        }}
      />

      {/* Radial gradient overlay for extra smoothing */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(78, 0, 233, 0.1) 40%,
            rgba(93, 0, 255, 0.3) 100%
          )`
        }}
      />

      {/* Strong noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/noisy.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
          opacity: 0.4,
          mixBlendMode: "overlay"
        }}
        aria-hidden="true"
      />

      {/* CSS-based noise pattern as backup */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "soft-light"
        }}
        aria-hidden="true"
      />

      {/* Film grain effect */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.08,
          mixBlendMode: "overlay",
          background: `repeating-conic-gradient(
            from 0deg at 50% 50%,
            rgba(255,255,255,0) 0deg,
            rgba(255,255,255,0.01) 1deg,
            rgba(255,255,255,0) 2deg
          )`
        }}
      />

      {/* Animated shimmer for distraction */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 60%
          )`
        }}
        animate={{
          transform: ["translateX(-100%)", "translateX(100%)"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut"
        }}
      />

      {/* Dithering pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.05) 1px,
              rgba(255,255,255,0.05) 2px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.05) 1px,
              rgba(255,255,255,0.05) 2px
            )
          `,
          backgroundSize: "2px 2px"
        }}
      />

      {/* Content container */}
      <div className="relative z-20 backdrop-blur-sm">{children}</div>
    </motion.div>
  );
}