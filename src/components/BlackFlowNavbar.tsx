import { motion } from "framer-motion";
import { RedHatDisplay } from "@/styles/fonts";

// Navigation link configuration
const navLinks = [
	{ href: "#features", label: "Features" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#contact", label: "Contact" },
	{ href: "#test", label: "test" },
];

export default function BlackFlowNavbar() {
	return (
		/* Navbar entrance animation - scales and fades in */
		<motion.nav
			initial={{ scale: 0.7, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				type: "tween",
				duration: 0.5,
				ease: "backOut",
			}}
			className="flex items-center justify-between px-8 py-2"
		>
			{/* Logo section */}
			<div
				className={`${RedHatDisplay.className} font-bold text-4xl antialiased md:subpixel-antialiased relative`}
			>
				<span className="relative">
					<span className="bg-radial from-purple-900 to-indigo-500 text-transparent bg-clip-text">
						Blackflow
					</span>
				</span>
			</div>

			{/* Navigation links */}
			<ul className="flex space-x-8 text-white text-lg">
				{navLinks.map((link) => (
					<li key={link.href} className="relative">
						{/* Link container with hover state management */}
                        <motion.a
                            href={link.href}
                            className="relative inline-block cursor-pointer px-3 pb-1 pt-2 hover:text-[rgb(255, 255, 255)]"
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                        >
                            {/* Link text */}
                            <span className="relative z-10">{link.label}</span>

                            {/* Underline animation element */}
                            <motion.span
                                className="absolute left-0 -bottom-[2px] w-full h-[1px] bg-[rgb(124,58,237)] rounded z-0"
                                variants={{
                                    rest: { scaleX: 0 }, // Hidden state
                                    hover: { scaleX: 1 }, // Visible state on hover
                                }}
                                transition={{
                                    type: "tween",
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1], // Custom easing for smooth animation
                                }}
                                style={{ originX: 0.5 }} // Animate from center outwards
                            />
                        </motion.a>
					</li>
				))}
			</ul>
		</motion.nav>
	);
}