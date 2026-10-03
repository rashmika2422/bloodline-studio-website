"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StudioImage from "./StudioImage";

type Props = { number: string; alt: string; sizes?: string; className?: string };
export default function RevealImage(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 92%", once: true } })
        .fromTo(ref.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: .85, ease: "power3.inOut" })
        .fromTo(ref.current!.querySelector("img"), { scale: 1.12 }, { scale: 1, duration: 1.1, ease: "power3.out" }, "<");
    }, ref);
    return () => mm.revert();
  }, []);
  return <div ref={ref} className="reveal-image"><StudioImage {...props} /></div>;
}
