export default function SoundSection() {
  return <section className="section sound"><div className="section-top"><p className="eyebrow">05 / Our sound</p><span className="eyebrow muted">Audio showcase coming soon</span></div><h2 className="display">FEEL EVERY<br />FREQUENCY.</h2><div className="waveform" aria-hidden="true">{Array.from({ length: 90 }, (_, i) => <span key={i} style={{ height: `${12 + Math.abs(Math.sin(i * .43) * Math.cos(i * .12)) * 88}%` }} />)}</div><p className="sound-note">Something worth listening to is on its way.</p></section>;
}
