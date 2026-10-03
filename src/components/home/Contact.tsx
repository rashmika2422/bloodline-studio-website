"use client";
import { useState, type FormEvent } from "react";
import { services, studioContact } from "@/lib/studio";
export default function Contact() {
  const [status, setStatus] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!studioContact.email) { setStatus("Online booking is coming soon. Contact details will be available here shortly. Your enquiry has not been sent."); return; }
    const data = new FormData(e.currentTarget);
    const body = ["Name", "Email", "Phone", "Service", "Message"].map(k => `${k}: ${data.get(k)}`).join("\n");
    window.location.href = `mailto:${studioContact.email}?subject=${encodeURIComponent("Studio session enquiry")}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app will open with your enquiry. Send it there to contact the studio.");
  }
  return <section id="contact" className="section contact"><div><p className="eyebrow">06 / Let’s connect</p><h2 className="display">TELL US<br />YOUR IDEA.</h2><p className="contact-intro">A first track. A new direction. A sound you can’t get out of your head. We’d love to hear it.</p><div className="contact-links">{([{ label: "WhatsApp", value: studioContact.whatsapp, prefix: "https://wa.me/" }, { label: "Instagram", value: studioContact.instagram, prefix: "" }, { label: "Phone", value: studioContact.phone, prefix: "tel:" }]).map(item => item.value ? <a key={item.label} href={`${item.prefix}${item.value}`}>{item.label} ↗</a> : <p key={item.label}>{item.label}<span>Details coming soon</span></p>)}</div></div><form onSubmit={submit} className="contact-form"><label>Name<input name="Name" autoComplete="name" placeholder="Your name" required maxLength={120} /></label><label>Email<input name="Email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>Phone <span className="muted">(optional)</span><input name="Phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label><label>Service<select name="Service" defaultValue="" required><option value="" disabled>What are you working on?</option>{services.map(s => <option key={s.name}>{s.name}</option>)}</select></label><label className="full-field">Message<textarea name="Message" rows={3} placeholder="A little about your project…" required maxLength={5000} /></label><button className="button full-field" type="submit">{studioContact.email ? "Prepare enquiry" : "Check booking availability"}<span>↗</span></button><p className="form-note full-field" role="status">{status || (studioContact.email ? "Enquiries open in your email app." : "Online booking opens soon. This form does not send enquiries yet.")}</p></form></section>;
}
