import { getSiteData } from "@/lib/data";
import {
  AboutSection,
  ContactSection,
  FooterSection,
  HeroSection,
  PortfolioSection,
  ServicesSection
} from "@/components/sections/SiteSections";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <main>
      <HeroSection />
      <AboutSection profile={data.profile} skills={data.skills} />
      <ServicesSection services={data.services} />
      <PortfolioSection projects={data.projects} />
      <ContactSection contact={data.contact} />
      <FooterSection />
    </main>
  );
}
