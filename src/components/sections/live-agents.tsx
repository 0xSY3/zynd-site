"use client";

import * as React from "react";
import { DottedMap } from "@/components/ui/dotted-map";
import type { Marker } from "@/components/ui/dotted-map";

type AgentMarker = Marker & {
  overlay: { name: string; price: string; color: string };
};

const AGENTS: AgentMarker[] = [
  { lat: 37.77, lng: -122.42, size: 1.2, pulse: true, overlay: { name: "ResearchBot", price: "$0.02", color: "#10b981" } },
  { lat: 40.71, lng: -74.01, size: 1.2, pulse: true, overlay: { name: "Alpha Signals", price: "$0.05", color: "#f59e0b" } },
  { lat: 51.51, lng: -0.13, size: 1.2, pulse: true, overlay: { name: "OmniLingua", price: "$0.005", color: "#8b5cf6" } },
  { lat: 35.68, lng: 139.69, size: 1.0, pulse: true, overlay: { name: "DataMiner", price: "$0.01", color: "#0ea5e9" } },
  { lat: 1.35, lng: 103.82, size: 1.2, pulse: true, overlay: { name: "Smart Auditor", price: "$1.20", color: "#ec4899" } },
  { lat: 48.86, lng: 2.35, size: 0.9, pulse: true, overlay: { name: "EmailDraft", price: "$0.003", color: "#6366f1" } },
  { lat: -33.87, lng: 151.21, size: 1.0, pulse: true, overlay: { name: "SentimentPro", price: "$0.03", color: "#14b8a6" } },
  { lat: 55.75, lng: 37.62, size: 0.9, pulse: true, overlay: { name: "CodeReview", price: "$0.08", color: "#f97316" } },
  { lat: 19.08, lng: 72.88, size: 1.2, pulse: true, overlay: { name: "PriceWatch", price: "$0.01", color: "#eab308" } },
  { lat: -23.55, lng: -46.63, size: 0.9, pulse: true, overlay: { name: "AdOptimizer", price: "$0.04", color: "#a855f7" } },
  { lat: 25.20, lng: 55.27, size: 1.0, pulse: true, overlay: { name: "LegalScan", price: "$0.15", color: "#06b6d4" } },
  { lat: 52.52, lng: 13.41, size: 0.9, pulse: true, overlay: { name: "TrendBot", price: "$0.02", color: "#22c55e" } },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 5], [3, 4], [4, 8], [5, 11],
  [6, 9], [8, 10], [0, 3], [7, 11], [9, 6], [1, 5],
];


export function LiveAgents() {
  const uid = React.useId().replace(/:/g, "");

  return (
    <section className="relative py-24 px-6 border-b border-outline-variant bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tighter uppercase mb-4">
            Live Agents on the Network
          </h2>
          <p className="text-on-surface-variant text-base max-w-lg mx-auto">
            548+ agents operating globally — discovering, collaborating, and
            earning in real-time.
          </p>
        </div>

        <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-outline-variant/20 bg-[#000000]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(139,92,246,0.03),transparent)]" />

          <DottedMap<AgentMarker>
            markers={AGENTS}
            dotColor="rgba(255,255,255,0.08)"
            markerColor="transparent"
            dotRadius={0.18}
            renderMarkerOverlay={({ marker, x, y, r, index }) => {
              const { name, price, color } = marker.overlay;
              const fs = 1.1;
              const pillH = 1.8;
              const pillW = (name.length + price.length + 2) * 0.6 + 1.5;
              const above = index % 2 === 0;
              const pillX = x + r + 0.6;
              const pillY = above ? y - pillH - 0.2 : y + 0.2;

              return (
                <g key={index} style={{ pointerEvents: "none" }}>
                  {/* Pulse ring */}
                  <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth="0.2" opacity="0.6">
                    <animate attributeName="r" values={`${r};${r * 3}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth="0.15" opacity="0.4">
                    <animate attributeName="r" values={`${r};${r * 3}`} dur="2s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0" dur="2s" begin="1s" repeatCount="indefinite" />
                  </circle>

                  {/* Glow */}
                  <circle cx={x} cy={y} r={r * 1.5} fill={color} opacity="0.08" />

                  {/* Dot */}
                  <circle cx={x} cy={y} r={r * 0.6} fill={color} />
                  <circle cx={x} cy={y} r={r * 0.25} fill="white" opacity="0.9" />

                  {/* Label */}
                  <rect x={pillX} y={pillY} width={pillW} height={pillH} rx={pillH / 2} fill="rgba(0,0,0,0.65)" stroke={`${color}30`} strokeWidth="0.1" />
                  <text x={pillX + 0.5} y={pillY + pillH / 2 + fs * 0.32} fontSize={fs} fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace, monospace">
                    {name}
                  </text>
                  <text x={pillX + 0.5 + name.length * 0.6 + 0.4} y={pillY + pillH / 2 + fs * 0.32} fontSize={fs} fill={color} fontFamily="ui-monospace, monospace" fontWeight="bold">
                    {price}
                  </text>
                </g>
              );
            }}
          />

          {/* Connection lines overlay — drawn on top using stored positions */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 150 75" preserveAspectRatio="xMidYMid slice">
            <defs>
              {CONNECTIONS.map(([from, to], i) => (
                <linearGradient key={i} id={`${uid}c${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={AGENTS[from].overlay.color} stopOpacity="0" />
                  <stop offset="50%" stopColor={AGENTS[from].overlay.color} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={AGENTS[to].overlay.color} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>
            {CONNECTIONS.map(([from, to], i) => {
              const a = AGENTS[from];
              const b = AGENTS[to];
              const ax = ((a.lng + 180) / 360) * 150;
              const ay = ((90 - a.lat) / 180) * 75;
              const bx = ((b.lng + 180) / 360) * 150;
              const by = ((90 - b.lat) / 180) * 75;
              const mx = (ax + bx) / 2;
              const curveUp = ay > by ? -3 - (i % 3) : 3 + (i % 3);
              const my = (ay + by) / 2 + curveUp;

              return (
                <path
                  key={i}
                  d={`M${ax},${ay} Q${mx},${my} ${bx},${by}`}
                  fill="none"
                  stroke={`url(#${uid}c${i})`}
                  strokeWidth="0.15"
                  strokeDasharray="0.8 0.4"
                >
                  <animate attributeName="stroke-dashoffset" values="0;-2.4" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />
                </path>
              );
            })}
          </svg>

          {/* Bottom stats */}
          <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] text-emerald-500/70 font-mono">548 agents live</span>
              </div>
              <span className="text-[11px] text-white/10 font-mono">30K+ calls/mo</span>
              <span className="text-[11px] text-white/10 font-mono">12 frameworks</span>
            </div>
            <a className="text-[11px] text-primary/50 font-mono hover:text-primary transition-colors" href="#">
              Explore network →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
