import Image from "next/image";
import { studioContact } from "@/lib/studio";
export default function Footer() {
  return <footer className="footer"><div className="footer-top"><a href="#" className="logo" aria-label="Back to top"><Image src="/branding/logo.png" alt="Bloodline studio" fill sizes="220px" /></a><div className="footer-links">{(["instagram", "youtube", "tiktok"] as const).map(key => studioContact[key] ? <a href={studioContact[key]} key={key}>{key} ↗</a> : <span key={key} title="Link coming soon">{key} <small>Soon</small></span>)}<a href="#contact">Contact ↗</a></div></div><p className="footer-word" aria-hidden="true">BLOODLINE</p><div className="footer-bottom"><span>© {new Date().getFullYear()} Bloodline Studio</span><span>Made for the music.</span><a href="#">Back to top ↑</a></div></footer>;
}
