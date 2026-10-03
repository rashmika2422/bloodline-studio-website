"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import VideoModal from "../ui/VideoModal";

export default function Showreel() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const button = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const preview = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = preview.current!;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.src = "/videos/studio04.mp4";
      element.load();
      observer.disconnect();
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => { observer.disconnect(); element.pause(); element.removeAttribute("src"); element.load(); };
  }, []);
  return <section className="showreel" data-cursor="PLAY"><video ref={preview} className="showreel-preview" poster="/images/studio18.jpeg" muted playsInline preload="metadata" aria-hidden="true" onLoadedMetadata={event => {
    const element = event.currentTarget;
    if (Number.isFinite(element.duration)) element.currentTime = Math.min(4, element.duration * .35);
  }} /><div className="showreel-content"><p className="eyebrow">Less talking. More feeling.</p><h2 className="display">WATCH<br />THE STUDIO<br />IN MOTION.</h2><motion.button ref={button} className="play-button" aria-label="Watch the studio showreel" animate={reduced ? { x: 0, y: 0 } : position} transition={{ type: "tween", duration: .3 }} onPointerMove={event => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({ x: Math.max(-10, Math.min(10, (event.clientX - bounds.left - bounds.width / 2) * .12)), y: Math.max(-10, Math.min(10, (event.clientY - bounds.top - bounds.height / 2) * .12)) });
  }} onPointerLeave={() => setPosition({ x: 0, y: 0 })} whileTap={{ scale: reduced ? 1 : .96 }} onClick={() => setOpen(true)}><span>▶</span> Play film</motion.button></div><AnimatePresence>{open && <VideoModal onClose={() => setOpen(false)} />}</AnimatePresence></section>;
}
