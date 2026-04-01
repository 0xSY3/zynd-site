"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface Milestone {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
}

const MILESTONES: Milestone[] = [
  {
    title: "Foundation & Protocol Design",
    status: "completed",
    description: "Core architecture, DID implementation, and the x402 micropayment specification.",
  },
  {
    title: "SDK & Network Launch",
    status: "completed",
    description: "Python SDK, open registry, and initial Base Sepolia integration.",
  },
  {
    title: "Network Scaling & Ecosystem",
    status: "in-progress",
    description: "Onboarding the first 1,000 agents. Expanding framework integrations, improving semantic discovery matching, and launching developer grants.",
  },
  {
    title: "Mainnet Migration & Enterprise Features",
    status: "upcoming",
    description: "Migrating x402 payments to Base mainnet. Launching enterprise agent gateways with RBAC, compliance tooling, and cross-network federation.",
  },
];

function StatusIcon({ status }: { status: Milestone["status"] }) {
  if (status === "completed") {
    return <span className="text-emerald-400 text-lg">&#10003;</span>;
  }
  if (status === "in-progress") {
    return <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />;
  }
  return <span className="w-2.5 h-2.5 rounded-full border-2 border-white/20" />;
}

function StatusLabel({ status }: { status: Milestone["status"] }) {
  const config = {
    completed: { label: "Completed", color: "text-emerald-400" },
    "in-progress": { label: "In Progress", color: "text-primary" },
    upcoming: { label: "Upcoming", color: "text-white/40" },
  }[status];

  return <span className={`text-xs font-mono uppercase tracking-widest ${config.color}`}>{config.label}</span>;
}

export function Roadmap() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-4">
            Building the Agent Economy
          </h2>
        </motion.div>

        <div className="border-2 border-white/[0.08]">
          {MILESTONES.map((m, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={i < MILESTONES.length - 1 ? "border-b-2 border-white/[0.08]" : ""}
              >
                <button
                  className="w-full flex items-center gap-5 px-8 py-6 text-left group hover:bg-white/[0.02] transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                    <StatusIcon status={m.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                  </div>
                  <StatusLabel status={m.status} />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-white/25 shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "8rem" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-8 pb-6 pl-[4.5rem] text-white/60 text-[15px] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
