"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function VideoModal({ onClose }: { onClose: () => void }) {
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
  const duration = reduced ? 0 : .35;
  return <motion.dialog ref={ref} className="video-modal" aria-labelledby="showreel-title" initial={{ opacity: 0, clipPath: reduced ? "none" : "inset(12% 0 12% 0)" }} animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }} exit={{ opacity: 0, clipPath: reduced ? "none" : "inset(8% 0 8% 0)" }} transition={{ duration, ease: [.22, 1, .36, 1] }} onCancel={event => { event.preventDefault(); onClose(); }}><div className="modal-top"><h2 id="showreel-title" className="eyebrow">Bloodline / In motion</h2><button autoFocus className="close-button" onClick={onClose} aria-label="Close studio showreel">Close ✕</button></div><motion.div className="modal-video-stage" initial={{ opacity: 0, scale: reduced ? 1 : .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduced ? 1 : .97 }} transition={{ duration, delay: reduced ? 0 : .08 }}><video src="/videos/studio04.mp4" poster="/images/studio14.jpeg" controls autoPlay={!reduced} muted playsInline preload="metadata" /></motion.div><p className="eyebrow muted">A glimpse inside the studio</p></motion.dialog>;
}
