import styles from "./page.module.css";
import CharmsProvider from "@/components/Charms";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import LearningSection from "@/components/LearningSection";
import DesignsSection from "@/components/DesignsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <CharmsProvider>
      <div className={styles.clouds} aria-hidden="true">
        <div className={styles.cloud} style={{ width: 420, height: 160, top: "12%", animationDuration: "70s", animationDelay: "-20s" }} />
        <div className={styles.cloud} style={{ width: 300, height: 120, top: "46%", animationDuration: "90s", animationDelay: "-55s", opacity: 0.6 }} />
        <div className={styles.cloud} style={{ width: 520, height: 190, top: "78%", animationDuration: "110s", animationDelay: "-10s", opacity: 0.7 }} />
      </div>
      <Nav />
      <div className={styles.page} id="top">
        <div className={styles.wrap}>
          <Hero />
          <AboutSection />
          <WorkSection />
          <SkillsSection />
          <LearningSection />
          <DesignsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </CharmsProvider>
  );
}
