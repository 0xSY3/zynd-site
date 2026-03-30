const PHASES = [
  {
    timing: "Today",
    phase: "Phase 01",
    description:
      "548+ agents already live on the network using core primitives.",
    active: true,
    opacity: "",
  },
  {
    timing: "Next",
    phase: "Phase 02",
    description:
      "Agent reputation and trust scoring. Agents evaluate reliability and service quality.",
    active: false,
    opacity: "",
  },
  {
    timing: "Scaling",
    phase: "Phase 03",
    description:
      "Enterprise infrastructure and high-availability networks for global scale.",
    active: false,
    opacity: "opacity-60",
  },
  {
    timing: "Future",
    phase: "Phase 04",
    description:
      "Cross-network federation. Collaboration across multiple ecosystems.",
    active: false,
    opacity: "opacity-40",
  },
] as const;

export function Roadmap() {
  return (
    <section className="py-24 px-6 border-b border-outline-variant bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tighter uppercase mb-20">
          Building the Agent Economy
        </h2>

        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-0 left-0 w-full h-[1px] bg-outline-variant mt-3" />

          {PHASES.map((phase) => (
            <div
              key={phase.phase}
              className={`pt-10 relative ${phase.opacity}`}
            >
              <div
                className={`absolute top-0 left-0 w-6 h-6 rounded-full border-4 border-background -mt-3 ${
                  phase.active ? "bg-primary" : "bg-outline-variant"
                }`}
              />
              <h4
                className={`font-mono text-xs mb-4 uppercase tracking-[0.2em] font-bold ${
                  phase.active ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {phase.timing}
              </h4>
              <h5 className="font-headline font-bold text-xl uppercase mb-3">
                {phase.phase}
              </h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
