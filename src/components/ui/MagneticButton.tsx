"use client";
import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
export default function MagneticButton({ children, href, className = "" }: { children: ReactNode; href: string; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  return <motion.a href={href} className={`button ${className}`} animate={reduced ? { x: 0, y: 0 } : position} transition={{ type: "tween", duration: .25 }} onPointerMove={event => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ x: Math.max(-10, Math.min(10, (event.clientX - rect.left - rect.width / 2) * .12)), y: Math.max(-10, Math.min(10, (event.clientY - rect.top - rect.height / 2) * .12)) });
  }} onPointerLeave={() => setPosition({ x: 0, y: 0 })}>{children}</motion.a>;
}
