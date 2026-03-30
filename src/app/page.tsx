import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Vision } from "@/components/sections/vision";
import { HowItWorks } from "@/components/sections/how-it-works";
import { AgentEconomy } from "@/components/sections/agent-economy";
import { LiveAgents } from "@/components/sections/live-agents";
import { StartBuilding } from "@/components/sections/start-building";
import { UseCases } from "@/components/sections/use-cases";
import { Stats } from "@/components/sections/stats";
import { Roadmap } from "@/components/sections/roadmap";
import { Community } from "@/components/sections/community";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { SquareTransition } from "@/components/sections/square-transition";
import { AnimationProvider } from "@/components/animation-provider";

export default function Home() {
  return (
    <AnimationProvider>
      <Navbar />
      <Hero />
      <Problem />
      <Vision />
      <HowItWorks />
      <AgentEconomy />
      <LiveAgents />
      <StartBuilding />
      <UseCases />
      <Stats />
      <Roadmap />
      <Community />
      <FinalCTA />
      <SquareTransition />
      <Footer />
    </AnimationProvider>
  );
}
