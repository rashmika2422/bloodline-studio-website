"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import VideoModal from "../ui/VideoModal";
import StudioImage from "../ui/StudioImage";

export default function Showreel() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const button = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  return <section className="showreel" data-cursor="PLAY"><StudioImage number="18" alt="Atmospheric blue lighting in the Bloodline studio" sizes="100vw" /><div className="showreel-content"><p className="eyebrow">Less talking. More feeling.</p><h2 className="display">WATCH<br />THE STUDIO<br />IN MOTION.</h2><motion.button ref={button} className="play-button" aria-label="Watch the studio showreel" animate={reduced ? { x: 0, y: 0 } : position} transition={{ type: "tween", duration: .3 }} onPointerMove={event => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({ x: Math.max(-10, Math.min(10, (event.clientX - bounds.left - bounds.width / 2) * .12)), y: Math.max(-10, Math.min(10, (event.clientY - bounds.top - bounds.height / 2) * .12)) });
  }} onPointerLeave={() => setPosition({ x: 0, y: 0 })} whileTap={{ scale: reduced ? 1 : .96 }} onClick={() => setOpen(true)}><span>▶</span> Play film</motion.button></div><AnimatePresence>{open && <VideoModal onClose={() => setOpen(false)} />}</AnimatePresence></section>;
}
