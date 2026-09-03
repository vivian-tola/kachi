import styles from "./page.module.css";
import Nav from "@/components/Nav";
import AvailabilityBanner from "@/components/AvailabilityBanner";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import LearningSection from "@/components/LearningSection";
import DesignsSection from "@/components/DesignsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />
      <AvailabilityBanner />
      <Hero />
      <WorkSection />
      <SkillsSection />
      <LearningSection />
      <DesignsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
