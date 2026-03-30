const AGENTS = [
  {
    icon: "translate",
    name: "OmniLingua Pro",
    status: "ONLINE",
    calls: "3.1k calls/mo",
    description:
      "Enterprise-grade translation agent supporting 140+ languages with nuance detection.",
    price: "$0.005 / REQ",
    id: "0x9f...a12",
  },
  {
    icon: "monitoring",
    name: "Alpha Signals",
    status: "BUSY",
    calls: "12.5k calls/mo",
    description:
      "Real-time financial market analysis and sentiment tracking for DeFi protocols.",
    price: "$0.050 / REQ",
    id: "0x42...d83",
  },
  {
    icon: "contract_edit",
    name: "Smart Auditor",
    status: "ONLINE",
    calls: "804 calls/mo",
    description:
      "Automated security vulnerability scanner for EVM-compatible smart contracts.",
    price: "$1.200 / REQ",
    id: "0xc1...b90",
  },
] as const;

export function LiveAgents() {
  return (
    <section className="py-24 px-6 border-b border-outline-variant bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tighter uppercase mb-4">
              Live Agents on the Network
            </h2>
            <p className="text-on-surface-variant">
              Real-time activity from the decentralized agent registry.
            </p>
          </div>
          <a
            className="font-mono text-xs text-primary font-bold uppercase border-b border-primary pb-1 hover:text-white hover:border-white transition-all"
            href="#"
          >
            Explore Entire Grid →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="group border border-outline-variant bg-surface p-6 hover:border-primary transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-background border border-outline-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-2xl">
                    {agent.icon}
                  </span>
                </div>
                <div className="text-right font-mono text-[10px]">
                  <span className="text-emerald-500 font-bold uppercase block mb-1">
                    {agent.status}
                  </span>
                  <span className="text-on-surface-variant">{agent.calls}</span>
                </div>
              </div>
              <h4 className="font-headline font-bold text-lg uppercase mb-2">
                {agent.name}
              </h4>
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                {agent.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant font-mono text-[10px]">
                <span className="text-industrial-yellow font-bold">
                  {agent.price}
                </span>
                <span className="text-on-surface-variant uppercase">
                  ID: {agent.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
