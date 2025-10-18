import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import {BackgroundBeams} from "../components/ui/background-beams"

export default function Home() {
  return (
    <div className="relative">
      <BackgroundBeams />
      <div className="absolute inset-0  z-0"></div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
