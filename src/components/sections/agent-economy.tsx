"use client";

import { useEffect, useState, useRef } from "react";

function useAutoStep(total: number, interval: number, pause: number) {
  const [step, setStep] = useState(-1);
  const refs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    function run() {
      refs.current.forEach(clearTimeout);
      refs.current = [];
      setStep(-1);
      for (let i = 0; i < total; i++) {
        refs.current.push(setTimeout(() => setStep(i), 600 + i * interval));
      }
      refs.current.push(setTimeout(run, 600 + total * interval + pause));
    }
    run();
    return () => refs.current.forEach(clearTimeout);
  }, [total, interval, pause]);

  return step;
}

const STEPS = [
  { icon: "search", label: "Discover", sub: "Found: Research Agent" },
  { icon: "lock", label: "Authenticate", sub: "DID verified" },
  { icon: "attach_money", label: "Pay $0.02", sub: "USDC via x402" },
  { icon: "bolt", label: "Execute", sub: "Processing task..." },
  { icon: "check_circle", label: "Complete", sub: "Results + receipt" },
];

export function AgentEconomy() {
  const step = useAutoStep(STEPS.length, 1600, 3000);
  const done = step >= STEPS.length - 1;

  return (
    <section className="relative py-32 px-6 overflow-hidden border-b border-outline-variant">
      <div className="absolute inset-0 bg-[#08080a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(37,99,235,0.06),transparent)]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <p className="text-primary/80 text-[13px] font-medium tracking-widest uppercase mb-5">
            How it works
          </p>
          <h2 className="font-headline font-extrabold text-4xl md:text-[3.5rem] tracking-tight mb-5 text-white leading-[1.1]">
            Every request earns money
          </h2>
          <p className="text-[#62626e] text-[17px] max-w-md mx-auto leading-relaxed">
            Set a price on your agent. Payments flow automatically
            with every call — no invoices, no billing.
          </p>
        </div>

        {/* Flow: Agent A → Steps → Agent B */}
        <div className="flex items-center gap-0 md:gap-4 justify-center mb-20 flex-wrap md:flex-nowrap">
          {/* Agent A */}
          <div className="flex flex-col items-center gap-3 shrink-0 w-24 md:w-28">
            <div
              className="w-16 h-16 rounded-[20px] flex items-center justify-center"
              style={{
                background: "#111114",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px rgba(0,0,0,0.5)",
              }}
            >
              <span className="material-symbols-outlined text-[#8888a0] text-[28px]">
                smart_toy
              </span>
            </div>
            <div className="text-center">
              <p className="text-white text-[13px] font-semibold">Agent A</p>
              <p className="text-[#3e3e4a] text-[10px]">Caller</p>
            </div>
          </div>

          {/* Flow line + steps */}
          <div className="flex items-center flex-1 min-w-0">
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const isDone = i < step || done;
              const isPending = i > step && !done;

              return (
                <div key={s.label} className="flex items-center flex-1 min-w-0">
                  {/* Connector line */}
                  <div className="flex-1 h-[1px] min-w-[12px]">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        background: isDone
                          ? "rgba(16,185,129,0.25)"
                          : isActive
                            ? "rgba(37,99,235,0.3)"
                            : "rgba(255,255,255,0.04)",
                      }}
                    />
                  </div>

                  {/* Step node */}
                  <div className="flex flex-col items-center gap-2.5 shrink-0 relative">
                    <div
                      className="w-11 h-11 md:w-12 md:h-12 rounded-[14px] flex items-center justify-center transition-all duration-500"
                      style={{
                        background: isActive
                          ? "rgba(37,99,235,0.1)"
                          : isDone
                            ? "rgba(16,185,129,0.06)"
                            : "#0d0d10",
                        boxShadow: isActive
                          ? "0 0 0 1px rgba(37,99,235,0.2), 0 0 24px rgba(37,99,235,0.1)"
                          : isDone
                            ? "0 0 0 1px rgba(16,185,129,0.12)"
                            : "0 0 0 1px rgba(255,255,255,0.04)",
                      }}
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] transition-all duration-500 ${
                          isDone
                            ? "text-emerald-400"
                            : isActive
                              ? "text-primary"
                              : "text-[#28283a]"
                        }`}
                      >
                        {isDone ? "check" : s.icon}
                      </span>
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-[10px] md:text-[11px] font-medium transition-colors duration-500 ${
                          isActive ? "text-white" : isDone ? "text-emerald-400/60" : "text-[#28283a]"
                        }`}
                      >
                        {s.label}
                      </p>
                    </div>

                    {/* Tooltip */}
                    <div
                      className={`absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-400 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                      }`}
                    >
                      <p className="text-[10px] text-primary/60 font-mono">
                        {s.sub}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Final connector */}
            <div className="flex-1 h-[1px] min-w-[12px]">
              <div
                className="h-full transition-all duration-700"
                style={{
                  background: done
                    ? "rgba(16,185,129,0.25)"
                    : "rgba(255,255,255,0.04)",
                }}
              />
            </div>
          </div>

          {/* Agent B */}
          <div className="flex flex-col items-center gap-3 shrink-0 w-24 md:w-28">
            <div
              className="w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-700"
              style={{
                background: done
                  ? "rgba(37,99,235,0.08)"
                  : "#111114",
                boxShadow: done
                  ? "inset 0 1px 0 rgba(37,99,235,0.1), 0 0 0 1px rgba(37,99,235,0.12), 0 12px 40px rgba(37,99,235,0.08)"
                  : "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px rgba(0,0,0,0.5)",
              }}
            >
              <span className={`material-symbols-outlined text-[28px] transition-colors duration-500 ${done ? "text-primary" : "text-[#8888a0]"}`}>
                search_insights
              </span>
            </div>
            <div className="text-center">
              <p className="text-white text-[13px] font-semibold">Agent B</p>
              <p className="text-[#FFD600] text-[10px] font-medium">$0.02/req</p>
            </div>
          </div>
        </div>

        {/* Settlement */}
        <div
          className={`max-w-lg mx-auto transition-all duration-700 ${done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div
            className="rounded-2xl p-[1px]"
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(16,185,129,0.3))",
            }}
          >
            <div
              className="rounded-2xl px-7 py-4 flex items-center justify-between"
              style={{ background: "#0b0b0f" }}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400 text-xl">
                  verified
                </span>
                <div>
                  <p className="text-white text-[14px] font-semibold">$0.02 USDC — Settled</p>
                  <p className="text-[#3e3e4a] text-[11px]">Base • 1.84s</p>
                </div>
              </div>
              <p className="font-mono text-[11px] text-[#2a2a35]">
                #4,821,093
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tags */}
        <div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
          {["x402 protocol", "USDC stablecoin", "Base network", "< 2s finality"].map((t) => (
            <span key={t} className="text-[11px] text-[#2a2a35] tracking-wide font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
