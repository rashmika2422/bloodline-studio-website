"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// A single animation scope for static server-rendered section markers and copy.
export default function CinematicSections() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Fade in section top markers
      gsap.utils.toArray<HTMLElement>(".section-top > .eyebrow", document.getElementById("main")).forEach(marker => {
        gsap.from(marker, { y: 30, opacity: 0, letterSpacing: "0.4em", duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: marker, start: "top 90%", once: true } });
      });
      // Fade in h2 headers
      gsap.utils.toArray<HTMLElement>("h2:not(.hero-title)", document.getElementById("main")).forEach(header => {
        gsap.from(header, { y: 60, opacity: 0, rotationX: -15, transformOrigin: "bottom center", duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: header, start: "top 85%", once: true } });
      });
      // Stagger project captions
      gsap.utils.toArray<HTMLElement>(".project-grid figcaption", document.getElementById("main")).forEach(caption => {
        gsap.from(caption, { y: 30, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: caption, start: "top 90%", once: true } });
      });
      // Reveal studio images with scale
      gsap.utils.toArray<HTMLElement>(".studio-image img", document.getElementById("main")).forEach(img => {
        gsap.fromTo(img.parentElement, 
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, 
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.6, ease: "power4.inOut", scrollTrigger: { trigger: img.parentElement, start: "top 90%", once: true } }
        );
        gsap.fromTo(img, 
          { scale: 1.3, filter: "brightness(0.5)" }, 
          { scale: 1, filter: "brightness(1)", duration: 2, ease: "power3.out", scrollTrigger: { trigger: img.parentElement, start: "top 90%", once: true } }
        );
      });
      // Stagger service rows
      gsap.utils.toArray<HTMLElement>(".service-row", document.getElementById("main")).forEach((row, i) => {
        gsap.from(row, { y: 30, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 90%", once: true } });
      });
      // Fade in contact elements
      gsap.utils.toArray<HTMLElement>(".contact-links, .contact-form", document.getElementById("main")).forEach(el => {
        gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    });
    return () => mm.revert();
  }, []);
  return null;
}
