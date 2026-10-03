"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { studioContact } from "@/lib/studio";

const links = [
  { label: "Studio", id: "studio" }, { label: "Services", id: "services" },
  { label: "Work", id: "work" }, { label: "Contact", id: "contact" },
];

function MobileMenu({ close }: { close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => { if (media.matches) close(); };
    media.addEventListener("change", resize);
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); media.removeEventListener("change", resize); };
  }, [close]);
  return <motion.dialog ref={ref} className="mobile-menu" aria-label="Navigation menu" onCancel={event => { event.preventDefault(); close(); }} initial={{ opacity: 0, clipPath: reduced ? "none" : "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, clipPath: reduced ? "none" : "inset(0 0 100% 0)" }} transition={{ duration: reduced ? 0 : .4, ease: [.76, 0, .24, 1] }}>
    <div className="menu-top"><span className="eyebrow">Bloodline / Menu</span><button autoFocus className="close-button" onClick={close}>Close ✕</button></div>
    <nav aria-label="Mobile navigation">{links.map((link, i) => <motion.a key={link.id} href={`#${link.id}`} onClick={close} initial={{ y: reduced ? 0 : 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : .4, delay: reduced ? 0 : .15 + i * .07 }}><span className="eyebrow">0{i + 1}</span>{link.label}<span>↗</span></motion.a>)}</nav>
    <div className="menu-socials">{(["instagram", "youtube", "tiktok"] as const).map(key => studioContact[key] ? <a key={key} href={studioContact[key]}>{key} ↗</a> : <span key={key}>{key}<small>Coming soon</small></span>)}</div>
    <a href="#contact" className="button" onClick={close}>Book a session ↗</a><p className="eyebrow muted">Make something that moves you.</p>
  </motion.dialog>;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; header.current?.classList.toggle("is-scrolled", window.scrollY > 60); };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); };
  }, []);
  return <><a href="#main" className="skip-link">Skip to content</a><header ref={header} className="navbar"><a href="#" className="logo" aria-label="Bloodline studio home"><Image src="/branding/logo.png" alt="Bloodline" fill sizes="90px" preload /></a><nav aria-label="Main navigation">{links.map(link => <a href={`#${link.id}`} key={link.id}>{link.label}</a>)}</nav><a href="#contact" className="nav-book">Book session ↗</a><button className={`hamburger ${open ? "is-open" : ""}`} aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(true)}><span /><span /></button></header><AnimatePresence>{open && <MobileMenu close={close} />}</AnimatePresence></>;
}
