"use client";

import { useEffect, useRef } from "react";

type TypingTextProps = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

export default function TypingText({ phrases, typingSpeed = 85, deletingSpeed = 45, pauseDuration = 1400 }: TypingTextProps) {
  const root = useRef<HTMLSpanElement>(null);
  const output = useRef<HTMLSpanElement>(null);
  const phraseKey = phrases.join("\u0000");

  useEffect(() => {
    const words = phraseKey.split("\u0000").filter(Boolean);
    if (!words.length) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let index = 0;
    let length = 0;
    let deleting = false;
    let visible = false;
    const stop = () => clearTimeout(timer);
    const tick = () => {
      if (!visible || document.hidden || media.matches) return;
      const phrase = words[index];
      length += deleting ? -1 : 1;
      output.current!.textContent = phrase.slice(0, length);
      let delay = deleting ? deletingSpeed : typingSpeed;
      if (!deleting && length === phrase.length) { deleting = true; delay = pauseDuration; }
      else if (deleting && length === 0) { deleting = false; index = (index + 1) % words.length; delay = 250; }
      timer = setTimeout(tick, Math.max(20, delay));
    };
    const resume = () => {
      stop();
      if (media.matches) { output.current!.textContent = words[0]; return; }
      if (visible && !document.hidden) timer = setTimeout(tick, 200);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    observer.observe(root.current!);
    media.addEventListener("change", resume);
    document.addEventListener("visibilitychange", resume);
    return () => { stop(); observer.disconnect(); media.removeEventListener("change", resume); document.removeEventListener("visibilitychange", resume); };
  }, [phraseKey, typingSpeed, deletingSpeed, pauseDuration]);

  return <span ref={root} className="typing-text"><span className="sr-only">{phrases.join(" ")}</span><span aria-hidden="true"><span ref={output}>{phrases[0]}</span><span className="typing-cursor">_</span></span></span>;
}
