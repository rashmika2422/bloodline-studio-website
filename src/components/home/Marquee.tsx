"use client";

import { useEffect, useRef, useState } from "react";

const text = "RECORDING — MIXING — MASTERING — PRODUCTION — CREATIVE SESSIONS — ";
export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { ref.current?.classList.toggle("offscreen", !entry.isIntersecting); });
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={`marquee ${paused ? "is-paused" : ""}`} aria-label="Recording, mixing, mastering, production and creative sessions"><div className="marquee-track" aria-hidden="true"><span>{text}</span><span>{text}</span></div><button className="marquee-toggle" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Resume" : "Pause"} moving type</button></section>;
}
