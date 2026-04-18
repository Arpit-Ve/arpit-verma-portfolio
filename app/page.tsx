import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import AchievementsSection from '@/components/AchievementsSection'
import CertificationsSection from '@/components/CertificationsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import PageLoader from '@/components/PageLoader'
import CursorSpotlight from '@/components/CursorSpotlight'

export default function Home() {
  return (
    <>
      <PageLoader />
      <CursorSpotlight />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 3 }}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <AchievementsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
