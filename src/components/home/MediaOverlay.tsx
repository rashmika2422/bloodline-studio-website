"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import studioRoom from "../../../public/images/studio01.jpeg";

export default function MediaOverlay() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: desktop ? "bottom top" : "bottom 25%", scrub: .8 } });
      tl.fromTo(".media-overlay-shade", { opacity: .25 }, { opacity: .95, duration: 1.5 })
        .fromTo(".media-overlay-copy", { y: desktop ? 70 : 20, opacity: 0 }, { y: 0, opacity: 1, duration: .5 }, .15);
      if (desktop) tl.to(".media-overlay-copy", { opacity: 0, y: -30, duration: .4 }, 1.1);
      gsap.fromTo(".media-overlay-visual img", { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    }, ref);
    return () => mm.revert();
  }, []);
  return <section ref={ref} className="media-overlay"><div className="media-overlay-sticky"><div className="studio-image media-overlay-visual"><Image src={studioRoom} alt="Bloodline studio's recording desk and signature wall logo" fill sizes="100vw" placeholder="blur" /></div><div className="media-overlay-shade" /><div className="media-overlay-copy"><p className="eyebrow">A room for the sound in your head</p><h2 className="display">YOUR SOUND<br />DESERVES<br />A ROOM<br className="mobile-break" /> LIKE THIS.</h2><a href="#contact" className="text-link">Make yourself at home ↗︎</a></div><span className="media-overlay-note eyebrow">Built for the music. Ready for you.</span></div></section>;
}
