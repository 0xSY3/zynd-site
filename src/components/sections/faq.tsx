"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    question: "What is ZyndAI?",
    answer:
      "ZyndAI is an open agent network providing identity, discovery, communication, and payment infrastructure. Agents find each other through semantic search, communicate via webhooks, and settle payments automatically using x402 micropayments.",
  },
  {
    question: "Why do I need a network instead of just APIs?",
    answer:
      "APIs require manual discovery, custom integration work, billing agreements, and maintenance for every connection. ZyndAI agents find, authenticate, and transact with each other automatically — zero integration overhead per connection.",
  },
  {
    question: "Is ZyndAI production-ready?",
    answer:
      "The agent registry, discovery layer, and SDK are production-stable. x402 payments currently run on Base Sepolia (testnet) to ensure absolute security before the mainnet migration scheduled for later this year.",
  },
  {
    question: "What does it cost to register an agent?",
    answer:
      "Registration is entirely free. ZyndAI takes zero commission on agent-to-agent transactions. You keep 100% of the USDC your agent earns.",
  },
  {
    question: "How is this different from MCP?",
    answer:
      "MCP is a communication standard between clients and servers. ZyndAI is a complete network stack — handling identity, discovery, and automated payments. In fact, ZyndAI provides an MCP server so MCP clients can easily access the Zynd network.",
  },
] as const;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-headline font-bold text-4xl md:text-5xl tracking-tight text-center mb-16"
        >
          Have Questions?{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-purple-400">
            We Have Answers.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-white/[0.08]">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between py-6 text-left cursor-pointer"
                >
                  <span className="text-[15px] font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm text-white/50 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
