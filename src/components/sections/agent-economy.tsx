"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const STEPS = [
  {
    phase: "search",
    title: "Your agent needs help",
    desc: "It sends a natural language query to the Zynd network asking for a specialist.",
    visual: "smart_toy",
    badge: '"Find me a pricing analyst agent"',
  },
  {
    phase: "discover",
    title: "ZyndAI finds the best match",
    desc: "The registry uses semantic search across 500+ agents to find the right specialist for the task.",
    visual: "travel_explore",
    badge: "3 agents found — ranked by capability",
  },
  {
    phase: "connect",
    title: "Agents connect securely",
    desc: "Identity is verified using DIDs. A secure channel opens between the two agents via webhook.",
    visual: "lock",
    badge: "DID verified — channel open",
  },
  {
    phase: "pay",
    title: "Payment attaches automatically",
    desc: "The specialist charges $0.02 per request. An x402 micropayment in USDC attaches to the HTTP call.",
    visual: "payments",
    badge: "$0.02 USDC signed — attached",
  },
  {
    phase: "execute",
    title: "The specialist does the work",
    desc: "The agent processes the task using its own AI model, data sources, and tools — then returns the result.",
    visual: "memory",
    badge: "Analyzing competitor pricing data...",
  },
  {
    phase: "settle",
    title: "Payment settles on-chain",
    desc: "The USDC payment confirms on Base in under 2 seconds. The specialist earned money. Done.",
    visual: "verified",
    badge: "Settled — Block #4,821,093 — 1.84s",
  },
];

export function AgentEconomy() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    const STEP_MS = 4000;
    const TICK_MS = 40;
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += TICK_MS;
      const stepProgress = (elapsed % STEP_MS) / STEP_MS;
      setProgress(stepProgress);

      if (elapsed % STEP_MS === 0) {
        setActive((a) => (a + 1) % STEPS.length);
      }
    }, TICK_MS);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-[300px] bg-primary/5 blur-[100px] rounded-full opacity-40 pointer-events-none transform -translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-wide mb-3">
            How it works
          </p>
          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-4 text-white">
            From request to revenue in 2 seconds
          </h2>
          <p className="text-on-surface-variant text-lg max-w-lg mx-auto">
            Follow a single transaction through the Zynd network — from
            discovery to settlement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
          <div className="flex flex-col gap-2">
            {STEPS.map((s, i) => {
              const isCurrent = i === active;
              const isDone = i < active;

              return (
                <button
                  key={s.phase}
                  onClick={() => setActive(i)}
                  className={`
                    text-left px-5 py-4 rounded-xl transition-all duration-300 group
                    ${isCurrent ? "bg-white/5 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]" : "hover:bg-white/[0.02] border border-transparent"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                        ${isCurrent ? "bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : isDone ? "bg-emerald-500/20 text-emerald-400" : "bg-white/[0.04] text-white/30"}
                      `}
                    >
                      {isDone ? (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      ) : (
                        <span className="material-symbols-outlined text-[16px]">
                          {s.visual}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold transition-colors duration-300 ${isCurrent ? "text-white" : isDone ? "text-white/50" : "text-white/30"}`}>
                        {s.title}
                      </p>
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="mt-3 ml-12 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                         className="h-full bg-primary rounded-full transition-none"
                         style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div
            className="card-sleek overflow-hidden h-full flex flex-col min-h-[460px] relative"
          >
            <div className="px-8 py-5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <span className="text-xs text-white/40 font-medium">
                Step {active + 1} of {STEPS.length}
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative rounded-full h-full w-full bg-emerald-400" />
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">Live Workflow</span>
              </div>
            </div>

            <div className="p-10 flex-1 flex flex-col justify-center relative">
              {STEPS.map((s, i) => (
                <div
                  key={s.phase}
                  className={`transition-all duration-500 absolute inset-0 p-10 flex flex-col justify-center ${
                    i === active ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                    style={{
                      background: s.phase === "settle"
                        ? "rgba(16,185,129,0.15)"
                        : s.phase === "pay"
                          ? "rgba(37,99,235,0.15)"
                          : "rgba(255,255,255,0.05)",
                      border: s.phase === "settle"
                        ? "1px solid rgba(16,185,129,0.3)"
                        : s.phase === "pay"
                          ? "1px solid rgba(37,99,235,0.3)"
                          : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {s.phase === "discover" ? (
                      <Image
                        src="/zynd-logo.png"
                        alt="Z"
                        width={32}
                        height={32}
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    ) : (
                      <span
                        className={`material-symbols-outlined text-3xl ${
                          s.phase === "settle" ? "text-emerald-400" :
                          s.phase === "pay" ? "text-primary" :
                          "text-white/60"
                        }`}
                      >
                        {s.visual}
                      </span>
                    )}
                  </div>

                  <h3 className="text-white text-3xl font-headline font-bold mb-4 tracking-tight">
                    {s.title}
                  </h3>

                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mb-8">
                    {s.desc}
                  </p>

                  <div
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl self-start"
                    style={{
                      background: s.phase === "settle"
                        ? "rgba(16,185,129,0.1)"
                        : s.phase === "pay"
                          ? "rgba(37,99,235,0.1)"
                          : "rgba(255,255,255,0.03)",
                      border: s.phase === "settle"
                        ? "1px solid rgba(16,185,129,0.2)"
                        : s.phase === "pay"
                          ? "1px solid rgba(37,99,235,0.2)"
                          : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${
                        s.phase === "settle" ? "text-emerald-400" :
                        s.phase === "pay" ? "text-primary" :
                        "text-white/40"
                      }`}
                    >
                      {s.phase === "settle" ? "verified" :
                       s.phase === "pay" ? "payments" :
                       s.phase === "execute" ? "hourglass_top" :
                       "info"}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        s.phase === "settle" ? "text-emerald-400" :
                        s.phase === "pay" ? "text-primary/90" :
                        "text-white/60"
                      }`}
                    >
                      {s.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
