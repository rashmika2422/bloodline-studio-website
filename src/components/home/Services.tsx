"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/studio";
import StudioImage from "../ui/StudioImage";

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const removers = Array.from(ref.current!.querySelectorAll<HTMLElement>(".service-item")).map(row => {
        const preview = row.querySelector<HTMLElement>(".service-preview")!;
        const x = gsap.quickTo(preview, "x", { duration: .4 });
        const y = gsap.quickTo(preview, "y", { duration: .4 });
        const move = (event: PointerEvent) => { const bounds = row.getBoundingClientRect(); x(Math.max(-12, Math.min(12, (event.clientX - bounds.left - bounds.width / 2) * .035))); y(Math.max(-8, Math.min(8, (event.clientY - bounds.top - bounds.height / 2) * .08))); };
        const leave = () => { x(0); y(0); };
        row.addEventListener("pointermove", move); row.addEventListener("pointerleave", leave);
        return () => { row.removeEventListener("pointermove", move); row.removeEventListener("pointerleave", leave); };
      });
      return () => removers.forEach(remove => remove());
    }, ref);
    return () => mm.revert();
  }, []);
  return <section id="services" ref={ref} className="section services"><div className="section-top"><p className="eyebrow">03 / What we do</p><span className="eyebrow muted">Your vision. Our craft.</span></div><h2 className="display">FROM IDEA<br />TO REPEAT.</h2><div className="service-list">{services.map((service, i) => <div className="service-item" key={service.name}><details className="service-row" onToggle={() => ScrollTrigger.refresh()}><summary><span className="eyebrow muted">0{i + 1}</span><h3>{service.name}</h3><span className="service-description">{service.description}</span><span className="service-arrow">↗︎</span></summary><div className="service-detail"><StudioImage number={service.image} alt={`${service.name} session at Bloodline studio`} sizes="(max-width: 767px) 90vw, 40vw" /><div><p>{service.description}</p><a className="text-link" href="#contact">Let’s make it happen ↗︎</a></div></div></details><div className="service-preview" aria-hidden="true"><StudioImage number={service.image} alt="" sizes="240px" /></div></div>)}</div></section>;
}
