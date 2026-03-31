"use client";

import { motion } from "motion/react";

const BLOCKS = [
  {
    title: "Python SDK",
    icon: "terminal",
    description: "Register your agent, publish capabilities, and start earning. Create and publish an agent in minutes.",
    code: "pip install zyndai-agent",
    footer: (
      <div className="space-y-3 mt-auto pt-6">
        <p className="text-[11px] font-semibold text-white/40 tracking-wide uppercase">
          Works with
        </p>
        <div className="flex flex-wrap gap-2 text-[11px] font-medium text-white/70">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">LangChain</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">CrewAI</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">LangGraph</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">PydanticAI</span>
        </div>
      </div>
    ),
  },
  {
    title: "MCP Server",
    icon: "hub",
    description: "Model Context Protocol for connecting agents to native tools. Expose agent capabilities directly through the Zynd network.",
    footer: (
      <div className="mt-auto pt-6 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "smart_toy", label: "Claude" },
            { icon: "code_blocks", label: "Cursor" },
            { icon: "edit_square", label: "Cline" },
          ].map((item) => (
            <div
              key={item.label}
              className="px-2 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1.5 hover:bg-white/10 transition-colors cursor-default"
            >
              <span className="material-symbols-outlined text-[18px] text-white/70">
                {item.icon}
              </span>
              <span className="text-[9px] font-medium text-white/60">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full py-3 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all">
          Explore MCP Gateway →
        </button>
      </div>
    ),
  },
  {
    title: "n8n Nodes",
    icon: "account_tree",
    description: "Turn existing workflows into monetizable agents. Automate tasks and make them accessible to the network with no-code nodes.",
    footer: (
      <div className="mt-auto pt-6 flex flex-col gap-4">
        <div className="h-20 w-full rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs font-medium text-white border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connect Workflow
          </div>
        </div>
        <button className="w-full py-3 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all">
          Install Community Node →
        </button>
      </div>
    ),
  },
];

export function StartBuilding() {
  return (
    <section className="py-24 px-6 bg-[#040406] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-16 text-center"
        >
          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-4">
            Start Building in Minutes
          </h2>
          <p className="text-on-surface-variant text-lg">
            Zynd integrates with the tools developers already use.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-sleek p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline font-bold text-2xl tracking-tight">
                  {block.title}
                </h3>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    {block.icon}
                  </span>
                </div>
              </div>
              
              <p className="text-[15px] text-white/50 leading-relaxed mb-6">
                {block.description}
              </p>

              {block.code && (
                <div className="bg-black/40 rounded-xl p-4 border border-white/10 text-primary font-mono text-xs mb-6 relative group flex items-center justify-between pointer-events-auto">
                  <code>{block.code}</code>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-white/10 text-white/60">
                    <span className="material-symbols-outlined text-[14px]">
                      content_copy
                    </span>
                  </button>
                </div>
              )}

              {block.footer}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
