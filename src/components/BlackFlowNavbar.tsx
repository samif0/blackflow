import { motion } from "framer-motion";
import { RedHatDisplay } from "@/styles/fonts";
import RgbBorder from "./WaveRainbowButton";
import WaveRainbowButton from "./WaveRainbowButton";

const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#solutions", label: "Solutions" },
  { href: "#resources", label: "Resources" },
  { href: "#enterprise", label: "Enterprise" },
  { href: "#docs", label: "Docs" },
  { href: "#pricing", label: "Pricing" },
];

export default function BlackFlowNavbar() {
  return (
    <motion.nav
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: "backOut",
      }}
      className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-black"
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={"/blackflow-logo.png"} height={35} width={35}></img>
        <span
          className={`${RedHatDisplay.className} text-white font-semibold text-3xl tracking-tight`}
        >
          Blackflow
        </span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-sm text-white">
        {navLinks.map((link) => (
          <li key={link.href} className="relative">
            <motion.a
              href={link.href}
              className="relative inline-block px-1 py-1 hover:text-white"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <span className="relative z-10">{link.label}</span>
              <motion.span
                className="absolute left-0 -bottom-[2px] w-full h-[1px] bg-white rounded z-0"
                variants={{
                  rest: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{
                  type: "tween",
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{ originX: 0.5 }}
              />
            </motion.a>
          </li>
        ))}
      </ul>

      {/* Right-side Buttons */}
      <div className="flex items-center space-x-3 text-sm">
        <button className="px-4 py-1 border border-gray-300 rounded-md text-white hover:text-white hover:border-white">
          Log In
        </button>
        <WaveRainbowButton />
      </div>
    </motion.nav>
  );
}
