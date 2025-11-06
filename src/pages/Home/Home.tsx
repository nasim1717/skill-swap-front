import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";
import StatesSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import CtaSection from "./CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* <StatesSection /> */}
      <FeaturesSection />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Home;
