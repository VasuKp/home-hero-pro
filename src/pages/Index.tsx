import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryBar from "@/components/CategoryBar";
import PopularServices from "@/components/PopularServices";
import PersonalizedSection from "@/components/PersonalizedSection";
import ForYourHome from "@/components/ForYourHome";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProfessionals from "@/components/FeaturedProfessionals";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";

export default function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryBar />
      <PopularServices />
      <PersonalizedSection />
      <ForYourHome />
      <WhyChooseUs />
      <FeaturedProfessionals />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <MobileBottomCTA />
    </main>
  );
}
