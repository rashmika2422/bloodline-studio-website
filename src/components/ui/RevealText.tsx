"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function RevealText({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current).forEach(line => {
        gsap.fromTo(line, { y: 60, opacity: 0, filter: "blur(8px)", rotationX: -10 }, { y: 0, opacity: 1, filter: "blur(0px)", rotationX: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: line, start: "top 95%", end: "top 50%", scrub: 1 } });
      });
    }, ref);
    return () => mm.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
