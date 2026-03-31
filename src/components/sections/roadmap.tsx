"use client";

import { motion } from "motion/react";

const PHASES = [
  {
    timing: "Today",
    phase: "Phase 01",
    description: "548+ agents already live on the network using core primitives.",
    active: true,
  },
  {
    timing: "Next",
    phase: "Phase 02",
    description: "Agent reputation and trust scoring. Agents evaluate reliability and service quality.",
    active: false,
  },
  {
    timing: "Scaling",
    phase: "Phase 03",
    description: "Enterprise infrastructure and high-availability networks for global scale.",
    active: false,
  },
  {
    timing: "Future",
    phase: "Phase 04",
    description: "Cross-network federation. Collaboration across multiple ecosystems.",
    active: false,
  },
] as const;

export function Roadmap() {
  return (
    <section className="py-24 px-6 bg-[#040406] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-20 text-center"
        >
          Building the Agent Economy
        </motion.h2>

        <div className="relative">
          {/* Main timeline line */}
          <div className="hidden md:block absolute top-[28px] left-0 w-full h-[2px] bg-gradient-to-r from-primary via-white/10 to-transparent" />

          <div className="grid md:grid-cols-4 gap-8">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`pt-12 relative flex flex-col group ${
                  !phase.active ? "opacity-60 hover:opacity-100 transition-opacity duration-300" : ""
                }`}
              >
                {/* Node */}
                <div
                  className={`absolute top-0 left-0 w-14 h-14 rounded-full border-[8px] border-[#040406] flex items-center justify-center shadow-sm z-10 ${
                    phase.active ? "bg-primary shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "bg-white/10"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${phase.active ? "bg-white" : "bg-white/30"}`} />
                </div>
                
                <h4
                  className={`text-xs mb-3 font-semibold tracking-wider uppercase ${
                    phase.active ? "text-primary" : "text-white/40"
                  }`}
                >
                  {phase.timing}
                </h4>
                
                <h5 className="font-headline font-bold text-xl mb-3 text-white">
                  {phase.phase}
                </h5>
                
                <p className="text-[15px] text-white/50 leading-relaxed max-w-[240px]">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
