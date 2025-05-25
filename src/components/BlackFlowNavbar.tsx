"use client";
import { RedHatDisplay } from '../styles/fonts';
import { motion } from "framer-motion";

export default function BlackFlowNavbar() {
  return (
    <motion.nav
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: "backOut"
      }}
      className="flex items-center justify-between px-8 py-4 bg-black bg-opacity-70 backdrop-blur-md"
    >
      <div className={`${RedHatDisplay.className} font-bold text-white text-4xl antialiased 
          md:subpixel-antialiased text-shadow-lg text-shadow-emerald-700`}>
        BlackFlow
      </div>
      <ul className="flex space-x-8 text-white text-lg">
        <li>
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
        </li>
        <li>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </li>
      </ul>
    </motion.nav>
  );
}