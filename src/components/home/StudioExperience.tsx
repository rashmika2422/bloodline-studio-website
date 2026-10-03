"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StudioImage from "../ui/StudioImage";

const rooms = [
  { n: "07", title: "Control room", subtitle: "Find your frequency", alt: "Blue-lit audio workstation and studio monitors" },
  { n: "15", title: "Vocal space", subtitle: "Let your voice lead", alt: "Artist wearing headphones at a recording microphone" },
  { n: "09", title: "Production", subtitle: "Build something original", alt: "Producer working on music at the studio desk" },
  { n: "10", title: "Recording session", subtitle: "Capture the moment", alt: "Artists collaborating during a vocal session" },
  { n: "16", title: "The experience", subtitle: "Better, together", alt: "A group of artists together in the studio" },
];

export default function StudioExperience() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const active = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const progressElement = progress.current!;
    const activeElement = active.current!;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - ref.current!.clientWidth), ease: "none",
        scrollTrigger: {
          trigger: ref.current, pin: true, scrub: .8, start: "top top",
          end: () => `+=${track.current!.scrollWidth - ref.current!.clientWidth}`, invalidateOnRefresh: true,
          onUpdate: self => { progressElement.style.transform = `scaleX(${self.progress})`; activeElement.textContent = String(Math.min(5, Math.floor(self.progress * 5) + 1)).padStart(2, "0"); },
        },
      });
      trigger.current = tween.scrollTrigger!;
      gsap.utils.toArray<HTMLElement>(".experience-track figcaption", ref.current).slice(1).forEach(caption => {
        gsap.from(caption, { y: 20, opacity: .25, duration: .5, scrollTrigger: { trigger: caption, containerAnimation: tween, start: "left 90%", end: "left 60%", scrub: true } });
      });
      return () => { trigger.current = null; progressElement.style.transform = "scaleX(0)"; activeElement.textContent = "01"; };
    }, ref);
    const element = track.current!;
    let drag: { x: number; scroll: number; pointer: number } | null = null;
    const down = (event: PointerEvent) => {
      if (!trigger.current || event.pointerType !== "mouse" || event.button !== 0) return;
      drag = { x: event.clientX, scroll: window.scrollY, pointer: event.pointerId };
      element.setPointerCapture(event.pointerId);
      element.classList.add("is-dragging");
    };
    const move = (event: PointerEvent) => {
      if (!drag || !trigger.current) return;
      const top = Math.min(trigger.current.end, Math.max(trigger.current.start, drag.scroll + drag.x - event.clientX));
      window.scrollTo({ top, behavior: "instant" });
    };
    const up = () => { if (drag && element.hasPointerCapture(drag.pointer)) element.releasePointerCapture(drag.pointer); drag = null; element.classList.remove("is-dragging"); };
    element.addEventListener("pointerdown", down); element.addEventListener("pointermove", move); element.addEventListener("pointerup", up); element.addEventListener("pointercancel", up);
    const onScroll = () => {
      if (trigger.current) return;
      const distance = element.scrollWidth - element.clientWidth;
      const value = distance > 0 ? element.scrollLeft / distance : 0;
      progressElement.style.transform = `scaleX(${value})`;
      activeElement.textContent = String(Math.min(5, Math.floor(value * 5) + 1)).padStart(2, "0");
    };
    element.addEventListener("scroll", onScroll, { passive: true });
    return () => { up(); element.removeEventListener("pointerdown", down); element.removeEventListener("pointermove", move); element.removeEventListener("pointerup", up); element.removeEventListener("pointercancel", up); element.removeEventListener("scroll", onScroll); mm.revert(); };
  }, []);
  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (!trigger.current || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const self = trigger.current;
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : Math.min(1, Math.max(0, self.progress + (event.key === "ArrowRight" ? .25 : -.25)));
    window.scrollTo({ top: self.start + next * (self.end - self.start), behavior: "smooth" });
  }
  return <section id="experience" ref={ref} className="experience"><div className="section-top"><p className="eyebrow">02 / Find your space</p><span className="eyebrow muted">Different rooms. One creative energy.</span></div><h2 className="display">GET INTO IT.</h2><div ref={track} className="experience-track" data-cursor="DRAG" tabIndex={0} onKeyDown={navigate} aria-label="Explore five studio spaces using left and right arrow keys"><span className="sr-only">On desktop, scroll down to move through the studio. On touch devices, swipe horizontally.</span>{rooms.map((room, i) => <figure key={room.n}><div className="experience-panel"><StudioImage number={room.n} alt={room.alt} sizes="(max-width: 1023px) 85vw, 65vw" /><span className="panel-number" aria-hidden="true">0{i + 1}</span></div><figcaption><div><p className="eyebrow muted">{room.subtitle}</p><h3>{room.title}</h3></div><span>↗</span></figcaption></figure>)}</div><div className="experience-footer"><span className="eyebrow"><span ref={active}>01</span> / 05</span><div className="experience-progress"><span ref={progress} /></div><span className="eyebrow"><span className="desktop-scroll-label">Scroll to explore ↓</span><span className="swipe-hint">Swipe to explore →</span></span></div></section>;
}
