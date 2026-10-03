"use client";

import { useEffect, useRef } from "react";

export default function StickyBooking() {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    if (!hero || !contact || !footer) return;
    const visible = new Set<Element>();
    const update = () => {
      const hidden = visible.size > 0 || hero.getBoundingClientRect().bottom > 104;
      const element = ref.current;
      if (!element) return;
      element.classList.toggle("is-hidden", hidden);
      element.tabIndex = hidden ? -1 : 0;
      element.setAttribute("aria-hidden", String(hidden));
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.target !== hero) { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); } });
      update();
    }, { rootMargin: "-104px 0px 0px 0px" });
    observer.observe(hero); observer.observe(contact); observer.observe(footer);
    update();
    return () => observer.disconnect();
  }, []);
  return <a ref={ref} href="#contact" className="sticky-booking is-hidden" tabIndex={-1} aria-hidden="true">Book a session <span>↗</span></a>;
}
