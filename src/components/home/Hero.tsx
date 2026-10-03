"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";
import TypingText from "../ui/TypingText";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (video.current) {
      video.current.defaultPlaybackRate = 0.6;
      video.current.playbackRate = 0.6;
    }
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => { video.current?.pause(); });
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const delay = document.documentElement.dataset.entryIntro === "true" ? .7 : 0;
      gsap.timeline({ delay, defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { y: 15, opacity: 0, duration: .45 })
        .from(".hero-word", { yPercent: 110, skewY: 5, opacity: .2, letterSpacing: "-.015em", duration: .8, stagger: .1 }, "-=.2")
        .from(".hero-actions", { y: 20, opacity: 0, duration: .55 }, "-=.4")
        .from(".hero-bottom", { opacity: 0, duration: .5 }, "-=.3");
      gsap.to(".hero-scroll-content", { y: -45, scale: .95, opacity: .2, transformOrigin: "left center", ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 15%", scrub: .7 } });
      gsap.to(".hero-transition", { opacity: .9, yPercent: -15, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .7 } });
    }, root);
    mm.add("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const element = root.current!;
      const title = element.querySelector<HTMLElement>(".hero-title")!;
      const titleX = gsap.quickTo(title, "x", { duration: .8 });
      const videoX = gsap.quickTo(video.current, "x", { duration: 1 });
      const move = (e: PointerEvent) => { const x = e.clientX / window.innerWidth - .5; titleX(x * 12); videoX(x * -16); };
      const leave = () => { titleX(0); videoX(0); };
      element.addEventListener("pointermove", move); element.addEventListener("pointerleave", leave);
      return () => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); };
    }, root);
    let inView = false;
    const syncVideo = () => {
      const element = video.current;
      if (!element) return;
      if (!inView || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches || element.dataset.paused === "true") element.pause();
      else void element.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncVideo(); }, { threshold: .1 });
    observer.observe(root.current!);
    document.addEventListener("visibilitychange", syncVideo);
    return () => { mm.revert(); observer.disconnect(); document.removeEventListener("visibilitychange", syncVideo); };
  }, []);

  useEffect(() => {
    const section = root.current!;
    const line = section.querySelector<HTMLElement>(".hero-line")!;
    const content = section.querySelector<HTMLElement>(".hero-content")!;
    const update = () => {
      let bottom = line.offsetHeight;
      let element: HTMLElement | null = line;
      while (element && element !== section) {
        bottom += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      section.style.setProperty("--hero-video-end", `${bottom}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(section);
    observer.observe(content);
    observer.observe(line);
    update();
    return () => observer.disconnect();
  }, []);

  return <section ref={root} className="hero" aria-label="Bloodline recording studio">
    <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/images/studio03.jpeg" className="hero-video" aria-hidden="true" onPlay={() => setPaused(false)} onPause={() => setPaused(true)}>
      <source src="/videos/studio03.mp4" type="video/mp4" />
    </video>
    <div className="hero-shade" /><div className="hero-atmosphere" /><div className="hero-transition" />
    <div className="hero-content"><div className="hero-scroll-content">
      <p className="eyebrow hero-eyebrow"><span className="status-dot" /> Bloodline studio / <TypingText phrases={["RECORD.", "CREATE.", "MIX.", "MASTER.", "REPEAT."]} /></p>
      <h1 className="hero-title">
        <span className="hero-line"><span className="hero-word">MAKE SOME</span></span>
        <span className="hero-line"><span className="hero-word hero-noise"><TypingText phrases={["NOISE."]} typingSpeed={130} deletingSpeed={80} pauseDuration={2200} /></span></span>
      </h1>
      <div className="hero-actions"><MagneticButton href="#contact">Book a session <span>↗︎</span></MagneticButton><a className="text-link" href="#studio">Explore studio <span>↓︎</span></a><p>A space for your sound.<br />A place to make it yours.</p></div>
    </div></div>
    <div className="hero-side-note eyebrow" aria-hidden="true">Sound without compromise / Vol. 01</div>
    <div className="hero-bottom"><span>Independent sound. Infinite possibilities.</span><a href="#studio" className="scroll-cue">Scroll to feel it <span>↓︎</span></a><button className="video-control" onClick={() => { const element = video.current; if (!element) return; if (!element.paused) { element.dataset.paused = "true"; element.pause(); } else { element.dataset.paused = "false"; void element.play().catch(() => {}); } }}>{paused ? "Play" : "Pause"} background</button></div>
  </section>;
}
