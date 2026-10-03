import MagneticButton from "../ui/MagneticButton";
import RevealText from "../ui/RevealText";
export default function BookingCTA() {
  return <section className="section booking"><p className="eyebrow">Your next chapter starts here</p><RevealText><h2 className="display"><span data-reveal>READY TO</span><span data-reveal>RECORD?</span></h2></RevealText><MagneticButton href="#contact" className="booking-button">Book your session <span>↗</span></MagneticButton><p>Bring your ideas. We’ll bring the energy.</p></section>;
}
