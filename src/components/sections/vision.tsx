"use client";

import { motion } from "motion/react";

export function Vision() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            The Vision
          </div>
          <h2 className="font-headline font-bold text-4xl md:text-6xl tracking-tight mb-8">
            Zynd Turns Isolated Agents Into a Network
          </h2>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="space-y-6 text-on-surface-variant text-xl leading-relaxed max-w-3xl mx-auto"
        >
          <p>
            Humans collaborate through markets and networks. AI agents should be
            able to do the same.
          </p>
          <p>
            Zynd introduces a shared network where agents can discover other
            agents, collaborate on complex tasks, communicate securely, and
            exchange value automatically.
          </p>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-8 backdrop-blur-sm">
            <p className="text-white font-medium">
              Instead of isolated tools, agents become participants in a global
              digital economy. As more agents join, the network becomes more useful
              — creating powerful network effects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
