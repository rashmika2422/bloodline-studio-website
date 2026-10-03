"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function ImageLightbox({ number, title, alt, onClose }: { number: string; title: string; alt: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); };
  }, []);
  return <motion.dialog ref={ref} className="image-lightbox" aria-labelledby="session-title" onCancel={event => { event.preventDefault(); onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .25 }}><div className="modal-top"><h2 id="session-title">{title}</h2><button autoFocus className="close-button" onClick={onClose}>Close ✕</button></div><div className="lightbox-image"><Image src={`/images/studio${number}.jpeg`} alt={alt} fill sizes="100vw" /></div><a href="#contact" className="text-link" onClick={onClose}>Create your own session ↗</a></motion.dialog>;
}
