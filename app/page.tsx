import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import Advertisements from "./pages/Advertisements";
import { FeaturesSection } from "./pages/FeaturesSection";
import {BackgroundBeams} from "../components/ui/background-beams"

export default function Home() {
  return (
    <div className="relative">
      {/* Section with background beams */}
      <div className="relative">
        <BackgroundBeams />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <Advertisements />
        </div>
      </div>

      {/* Section without background beams */}
      <FeaturesSection />
    </div>
  );
}
