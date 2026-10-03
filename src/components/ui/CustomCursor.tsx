"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (hover: hover) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cursor = ref.current!;
      const label = cursor.querySelector("span")!;
      const x = gsap.quickTo(cursor, "x", { duration: .18, ease: "power2.out" });
      const y = gsap.quickTo(cursor, "y", { duration: .18, ease: "power2.out" });
      const gx = gsap.quickTo(glow.current, "x", { duration: 1.2 });
      const gy = gsap.quickTo(glow.current, "y", { duration: 1.2 });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        x(event.clientX); y(event.clientY); gx(event.clientX); gy(event.clientY);
        cursor.style.opacity = "1";
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
        label.textContent = target?.dataset.cursor || "";
        cursor.classList.toggle("has-label", !!target);
      };
      const hide = () => { cursor.style.opacity = "0"; };
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);
      return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", hide); window.removeEventListener("blur", hide); cursor.style.opacity = "0"; };
    }, ref);
    return () => mm.revert();
  }, []);
  return <><div ref={glow} className="ambient-glow" aria-hidden="true" /><div ref={ref} className="custom-cursor" aria-hidden="true"><span /></div></>;
}
