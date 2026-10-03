"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import RevealImage from "../ui/RevealImage";
import ImageLightbox from "../ui/ImageLightbox";

const sessions = [
  { n: "04", title: "Voice. Meet possibility.", label: "At the microphone", alt: "Singer performing into a microphone wearing studio headphones" },
  { n: "11", title: "Better, together.", label: "Creative collaboration", alt: "Two artists working together at the vocal microphone" },
  { n: "08", title: "Keep the energy.", label: "Behind the sessions", alt: "Artists capturing a moment together in the studio" },
];
export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const session = selected === null ? null : sessions[selected];
  return <section id="work" className="section projects"><div className="section-top"><p className="eyebrow">04 / In good company</p><span className="eyebrow muted">Real people. Real sessions.</span></div><h2 className="display">SOUND HAS<br />A HUMAN SIDE.</h2><div className="project-grid">{sessions.map((project, i) => <figure key={project.n}><button className="project-image-button" data-cursor="VIEW" onClick={() => setSelected(i)} aria-label={`View session photograph: ${project.title}`}><RevealImage number={project.n} alt={project.alt} /><span className="project-view eyebrow">View session ↗︎</span></button><figcaption><p className="eyebrow muted">Session journal / 0{i + 1}</p><h3>{project.title}<span className="project-title-arrow" aria-hidden="true"> ↗︎</span></h3><p>{project.label}</p></figcaption></figure>)}</div><AnimatePresence>{session && <ImageLightbox number={session.n} title={session.title} alt={session.alt} onClose={() => setSelected(null)} />}</AnimatePresence></section>;
}
