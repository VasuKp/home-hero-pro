import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProfessionals from "@/components/FeaturedProfessionals";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import MobileCTA from "@/components/MobileCTA";

export default function Index() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <HowItWorks />
      <FeaturedProfessionals />
      <TrustStats />
      <Testimonials />
      <CTASection />
      <Footer />
      <MobileCTA />
    </main>
  );
}
