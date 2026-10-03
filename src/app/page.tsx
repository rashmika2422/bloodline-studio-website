import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Marquee from "@/components/home/Marquee";
import StudioGallery from "@/components/home/StudioGallery";
import StudioExperience from "@/components/home/StudioExperience";
import MediaOverlay from "@/components/home/MediaOverlay";
import Services from "@/components/home/Services";
import Projects from "@/components/home/Projects";
import Showreel from "@/components/home/Showreel";
import SoundSection from "@/components/home/SoundSection";
import BookingCTA from "@/components/home/BookingCTA";
import Contact from "@/components/home/Contact";
import StickyBooking from "@/components/mobile/StickyBooking";
import PageIntro from "@/components/ui/PageIntro";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import GradientTransition from "@/components/ui/GradientTransition";
import CinematicSections from "@/components/ui/CinematicSections";

export default function Home() {
  return (
    <main>
      <PageIntro />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <Marquee />
        <StudioGallery />
        <GradientTransition />
        <StudioExperience />
        <MediaOverlay />
        <Services />
        <Projects />
        <Showreel />
        <GradientTransition tone="blue" />
        <SoundSection />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
      <StickyBooking />
      <CustomCursor />
      <CinematicSections />
    </main>
  );
}
