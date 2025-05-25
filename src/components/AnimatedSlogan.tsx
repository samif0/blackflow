"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

interface AnimatedSloganProps {
  text: string;
  className?: string;
}

export default function AnimatedSlogan({ text, className }: AnimatedSloganProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;
      containerRef.current.style.visibility = "visible";
      const { words } = splitText(
        containerRef.current.querySelector("h1")!
      );
      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "tween", // or "spring", "inertia"
          duration: 2.75,
          delay: stagger(0.15),
        }
      );
    });
  }, [text]);

  return (
    <div className={`text-center ${className || ""}`} ref={containerRef} style={{ visibility: "hidden" }}>
      <h1 className="h1">{text}</h1>
    </div>
  );
}