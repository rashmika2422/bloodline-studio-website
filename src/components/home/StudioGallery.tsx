"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealImage from "../ui/RevealImage";
const photos = [{ n: "02", alt: "Bloodline control room with monitors and keyboard", caption: "A space to find your frequency." }, { n: "03", alt: "Mixing desk lit by purple studio lights", caption: "Every detail. Every decibel." }, { n: "13", alt: "Vocalist recording at the studio microphone", caption: "Where the feeling becomes sound." }];
export default function StudioGallery() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { gsap.registerPlugin(ScrollTrigger); const mm = gsap.matchMedia(); mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => { gsap.utils.toArray<HTMLElement>("figure", ref.current).forEach((figure, i) => gsap.fromTo(figure, { y: i === 0 ? 30 : -25 }, { y: i === 0 ? -30 : 25, scrollTrigger: { trigger: figure, scrub: 1, start: "top bottom", end: "bottom top" } })); }, ref); return () => mm.revert(); }, []);
  return <section className="gallery-section" aria-label="Studio photographs"><div className="section-top gallery-heading"><p className="eyebrow">Inside Bloodline</p><span className="swipe-hint eyebrow">Swipe →</span></div><div className="editorial-gallery" ref={ref} tabIndex={0} aria-label="Swipe or use arrow keys to explore studio photographs">{photos.map((p, i) => <figure key={p.n}><RevealImage number={p.n} alt={p.alt} /><figcaption><span>0{i + 1}</span>{p.caption}</figcaption></figure>)}</div></section>;
}
