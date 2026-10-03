"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GradientTransition({ tone = "violet" }: { tone?: "violet" | "blue" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(ref.current, { opacity: .25 }, { opacity: .8, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom center", scrub: .8 } });
    }, ref);
    return () => mm.revert();
  }, []);
  return <div ref={ref} className={`gradient-transition ${tone}`} aria-hidden="true" />;
}
