"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.motion) return;
      const travel = context.conditions.desktop ? 32 : 8;
      gsap.utils.toArray<HTMLElement>(".kinetic-line", ref.current).forEach((line, index) => {
        gsap.fromTo(line, { color: index === 0 ? "#f3f2ed" : "#484846", x: index % 2 ? travel : -travel }, { color: "#f3f2ed", x: 0, ease: "none", scrollTrigger: { trigger: line, start: "top 90%", end: "top 45%", scrub: .7 } });
      });
    }, ref);
    return () => mm.revert();
  }, []);
  return <section ref={ref} id="studio" className="section intro"><div className="section-top"><p className="eyebrow">01 / The studio</p><span className="eyebrow muted">Built for the feeling</span></div><h2 className="display intro-title"><span className="kinetic-line">WE DON’T</span><span className="kinetic-line">JUST RECORD</span><span className="kinetic-line">MUSIC.</span><span className="kinetic-line intro-offset">WE BUILD</span><span className="kinetic-line intro-offset">SOUND.</span></h2><div className="intro-copy"><span className="small-cross">✳</span><p>Good music starts with a feeling. We give it a space, a sound, and the attention it deserves. Come with an idea. Leave with something that feels like you.</p><a className="text-link" href="#experience">Step inside ↗</a></div></section>;
}
