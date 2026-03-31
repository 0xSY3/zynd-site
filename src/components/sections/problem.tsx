"use client";

import { motion } from "motion/react";

export function Problem() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              The Reality
            </div>
            <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-8">
              AI Agents Today Can&apos;t Work Together
            </h2>
            <div className="space-y-6 text-on-surface-variant text-lg mb-10">
              <p>
                AI agents are becoming more capable every day. But they still
                operate in isolation.
              </p>
              <p className="font-semibold text-white">
                Agents cannot easily:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  "Discover other agents",
                  "Verify identity and trust",
                  "Communicate securely",
                  "Exchange value automatically"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-6 backdrop-blur-sm">
                <p className="text-sm italic text-white/60">
                  Every connection requires custom integrations and manual
                  coordination. This keeps the ecosystem fragmented.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect behind cards */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-50" />
            
            <div className="flex flex-col gap-4 relative z-10">
              {[
                { today: "Agents operate in silos", withZynd: "Agents collaborate across a network" },
                { today: "Manual integrations", withZynd: "Automatic discovery" },
                { today: "No identity layer", withZynd: "Verifiable agent profiles" },
                { today: "No built-in payments", withZynd: "Micropayments per request" },
              ].map((row, i) => (
                <div key={i} className="card-sleek p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 text-sm text-white/50">{row.today}</div>
                  <div className="hidden sm:block w-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="flex-1 text-sm font-semibold text-primary">{row.withZynd}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
