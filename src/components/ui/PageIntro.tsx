"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageIntro() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current!;
    let returning = false;
    try { returning = sessionStorage.getItem("bloodline-entered") === "true"; sessionStorage.setItem("bloodline-entered", "true"); } catch { /* Storage is optional. */ }
    if (returning || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.dataset.entryIntro = "true";
    const ctx = gsap.context(() => {
      gsap.set(element, { visibility: "visible" });
      gsap.timeline({ onComplete: () => { element.style.visibility = "hidden"; delete document.documentElement.dataset.entryIntro; } })
        .from(".entry-word", { y: 25, opacity: 0, duration: .35, ease: "power3.out" })
        .fromTo(".entry-line span", { scaleX: 0 }, { scaleX: 1, duration: .45, ease: "power2.inOut" }, "<")
        .to(element, { yPercent: -100, duration: .6, ease: "power4.inOut" }, "+=.05");
    }, ref);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => { if (media.matches) { ctx.revert(); element.style.visibility = "hidden"; } };
    media.addEventListener("change", stop);
    return () => { ctx.revert(); delete document.documentElement.dataset.entryIntro; media.removeEventListener("change", stop); };
  }, []);
  return <div ref={ref} className="page-intro" aria-hidden="true"><div className="entry-word">BLOODLINE<span className="eyebrow">Find your frequency.</span></div><div className="entry-line"><span /></div><span className="eyebrow entry-note">Independent sound / Infinite possibilities</span></div>;
}
