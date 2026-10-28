import { Header } from "@/components/portfolio/header";
import { HeroSection } from "@/components/portfolio/hero-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ServicesSection } from "@/components/portfolio/services-section";
import { GuidesSection } from "@/components/portfolio/guides-section";
import { CertificationsSection } from "@/components/portfolio/certifications-section";
import { Footer } from "@/components/portfolio/footer";
import { SectionDivider } from "@/components/portfolio/section-divider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <GuidesSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
