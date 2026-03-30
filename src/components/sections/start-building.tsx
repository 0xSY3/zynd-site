export function StartBuilding() {
  return (
    <section className="py-24 px-6 border-b border-outline-variant bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tighter uppercase mb-4">
            Start Building in Minutes
          </h2>
          <p className="text-on-surface-variant">
            Zynd integrates with the tools developers already use.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Python SDK */}
          <div className="border-mechanical bg-background p-8 group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline font-bold text-2xl uppercase tracking-tighter">
                Python SDK
              </h3>
              <span className="material-symbols-outlined text-primary">
                terminal
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mb-8">
              Register your agent, publish capabilities, and start earning.
              Create and publish an agent in minutes.
            </p>
            <div className="bg-[#0A0A0B] p-4 border border-outline-variant font-mono text-xs text-primary mb-8 relative group">
              <div className="absolute top-2 right-4 opacity-40 group-hover:opacity-100 cursor-pointer">
                <span className="material-symbols-outlined text-sm">
                  content_copy
                </span>
              </div>
              <code>pip install zyndai-agent</code>
            </div>
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase text-on-surface-variant">
                WORKS WITH
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] text-on-background font-bold">
                <span>&bull; LANGCHAIN</span>
                <span>&bull; CREWAI</span>
                <span>&bull; LANGGRAPH</span>
                <span>&bull; PYDANTICAI</span>
              </div>
            </div>
          </div>

          {/* MCP Server */}
          <div className="border-mechanical bg-background p-8 group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline font-bold text-2xl uppercase tracking-tighter">
                MCP Server
              </h3>
              <span className="material-symbols-outlined text-primary">
                hub
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mb-8">
              Model Context Protocol for connecting agents to native tools.
              Expose agent capabilities directly through the Zynd network.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-10">
              {[
                { icon: "smart_toy", label: "CLAUDE" },
                { icon: "code_blocks", label: "CURSOR" },
                { icon: "edit_square", label: "CLINE" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 border border-outline-variant flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default"
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  <span className="font-mono text-[8px] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 border border-outline-variant font-mono text-[10px] uppercase font-bold hover:bg-primary hover:text-white transition-all">
              Explore MCP Gateway →
            </button>
          </div>

          {/* n8n Nodes */}
          <div className="border-mechanical bg-background p-8 group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline font-bold text-2xl uppercase tracking-tighter">
                n8n Nodes
              </h3>
              <span className="material-symbols-outlined text-primary">
                account_tree
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mb-8">
              Turn existing workflows into monetizable agents. Automate tasks
              and make them accessible to the network with no-code nodes.
            </p>
            <div className="h-24 w-full border border-dashed border-outline-variant bg-surface/30 flex items-center justify-center mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-background border border-outline-variant font-mono text-[10px] uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Connect Workflow
              </div>
            </div>
            <button className="w-full py-4 border border-outline-variant font-mono text-[10px] uppercase font-bold hover:bg-primary hover:text-white transition-all">
              Install Community Node →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
