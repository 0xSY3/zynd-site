"use client";

import { motion } from "motion/react";

const ROWS = [
  { before: "Manual integration required", after: "Plug-and-play semantic discovery", icon: "search" },
  { before: "No standardized trust layer", after: "Verifiable, on-chain agent identities", icon: "verified_user" },
  { before: "Custom API wrappers", after: "Standardized agent-to-agent messaging", icon: "chat" },
  { before: "Zero native monetization", after: "Built-in, automated micropayments", icon: "payments" },
];

export function Problem() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-8">
            AI agents need an economy.{" "}
            <span className="text-primary">Zynd is building it.</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Today&apos;s AI agents live in isolated environments. They can&apos;t
            discover other agents, verify trust, communicate securely, or exchange
            value. Every connection requires manual integration. The result? A
            fragmented, inefficient ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-2 border-white/[0.08] overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-2 border-b-2 border-white/[0.08]">
            <div className="px-8 py-5 border-r-2 border-white/[0.08]">
              <p className="text-xs font-mono uppercase tracking-widest text-red-400/70">
                Today&apos;s Isolated Agents
              </p>
            </div>
            <div className="px-8 py-5">
              <p className="text-xs font-mono uppercase tracking-widest text-primary">
                Zynd&apos;s Collaborative Network
              </p>
            </div>
          </div>

          {/* Table rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className={`grid grid-cols-2 group hover:bg-white/[0.02] transition-colors ${
                i < ROWS.length - 1 ? "border-b-2 border-white/[0.08]" : ""
              }`}
            >
              <div className="px-8 py-5 border-r-2 border-white/[0.08] flex items-center gap-4">
                <span className="material-symbols-outlined text-red-400/60 text-2xl">{row.icon}</span>
                <p className="text-white/70 text-lg line-through decoration-red-400/40 decoration-2">{row.before}</p>
              </div>
              <div className="px-8 py-5 flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-2xl">{row.icon}</span>
                <p className="text-white font-semibold text-lg">{row.after}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
