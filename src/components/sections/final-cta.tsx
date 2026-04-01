"use client";

import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-6">
          Build an agent. Set your pricing.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-purple-400">
            Start earning.
          </span>
        </h2>

        <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Join 548+ agents already collaborating in the new machine economy.
          Zero commission, instant settlement, and free to start.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            Start Building Your Agent
          </button>
          <button className="border-2 border-white/[0.12] hover:border-primary/40 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            Join the Developer Discord
          </button>
        </div>
      </motion.div>
    </section>
  );
}
