import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Vision } from "@/components/sections/vision";
import { HowItWorks } from "@/components/sections/how-it-works";
import { AgentEconomy } from "@/components/sections/agent-economy";
import { StartBuilding } from "@/components/sections/start-building";
import { UseCases } from "@/components/sections/use-cases";
import { Stats } from "@/components/sections/stats";
import { Roadmap } from "@/components/sections/roadmap";
import { Community } from "@/components/sections/community";
import { Footer } from "@/components/sections/footer";
import { Seamless } from "@/components/sections/seamless";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { AnimationProvider } from "@/components/animation-provider";

export default function Home() {
  return (
    <AnimationProvider>
      <div className="bg-video-wrap">
        <div className="bg-video-overlay" />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="bg-video"
          poster="/assets/images/video-poster.jpg"
        >
          <source src="/assets/videos/background-video.webm" type="video/webm" />
          <source src="/assets/videos/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <Navbar />
      <Hero />
      <Seamless />
      <Problem />
      <Vision />
      <HowItWorks />
      <AgentEconomy />
      <StartBuilding />
      <UseCases />
      <Stats />
      <Roadmap />
      <Community />
      <FAQ />
      <FinalCTA />
      <Footer />
    </AnimationProvider>
  );
}
