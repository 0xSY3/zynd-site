"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_AGENTS } from "@/lib/agents-data";

const CATEGORIES = ["All", "AI", "Fair Hiring", "Analysis", "Orchestration", "Evidence", "Matching", "Screening", "Ranking", "Verification", "Credential", "Parsing", "Extraction", "Bias Detection", "Explainability", "NLP", "Scoring", "Automation", "Data", "Integration"] as const;
const SORT_OPTIONS = ["Newest", "Most Used", "Cheapest"] as const;

function AccentCorners() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="accent-left-top-corner" />
      <div className="accent-left-bottom-corner" />
      <div className="accent-right-top-corner" />
      <div className="accent-right-bottom-corner" />
    </div>
  );
}

export default function RegistryPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<string>("Newest");

  const filtered = useMemo(() => {
    let list = MOCK_AGENTS.filter((a) => {
      if (search) {
        const q = search.toLowerCase();
        if (!a.name.toLowerCase().includes(q) && !a.description.toLowerCase().includes(q)) return false;
      }
      if (status !== "All" && a.status !== status) return false;
      if (category !== "All") {
        const cats = Object.keys(a.capabilities);
        if (!cats.some((c) => c.toLowerCase().includes(category.toLowerCase()))) return false;
      }
      return true;
    });

    if (sort === "Most Used") list = [...list].sort((a, b) => b.calls - a.calls);
    if (sort === "Cheapest") list = [...list].sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    if (sort === "Newest") list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return list;
  }, [search, status, category, sort]);

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white">
      <div className="bg-video-wrap">
        <div className="bg-video-overlay" />
        <video autoPlay loop muted playsInline preload="none" className="bg-video" poster="/assets/images/video-poster.jpg">
          <source src="/assets/videos/background-video.webm" type="video/webm" />
          <source src="/assets/videos/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <nav className="px-6 py-5 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-headline font-bold text-lg uppercase tracking-tight">ZyndAI</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">Home</Link>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Docs</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-20">
        <h1 className="font-headline font-extrabold text-3xl tracking-tight mb-2">Registry</h1>
        <p className="text-white/30 text-sm mb-8">{MOCK_AGENTS.length} agents on the network</p>

        {/* Search + Status + Sort */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search agents by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-transparent border border-white/[0.12] text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-12 px-4 bg-transparent border border-white/[0.12] text-sm text-white/60 appearance-none cursor-pointer focus:outline-none focus:border-primary/50 transition-colors sm:w-[140px]"
          >
            <option value="All" className="bg-[#0f0f13]">All Status</option>
            <option value="ACTIVE" className="bg-[#0f0f13]">Active</option>
            <option value="INACTIVE" className="bg-[#0f0f13]">Inactive</option>
          </select>
          <div className="flex gap-1">
            {SORT_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`h-12 px-4 text-sm font-medium flex items-center gap-2 transition-colors ${
                  sort === s
                    ? "border border-primary/40 bg-primary/10 text-primary"
                    : "border border-white/[0.12] text-white/40 hover:text-white hover:border-white/20"
                }`}
              >
                {s === "Newest" && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                {s === "Most Used" && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 12-4-4v3H3v2h15v3z"/></svg>}
                {s === "Cheapest" && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 17-5-5 5-5M2 17l5-5-5-5"/></svg>}
                {s}
              </button>
            ))}
          </div>
          {(search || status !== "All" || category !== "All") && (
            <button
              onClick={() => { setSearch(""); setStatus("All"); setCategory("All"); }}
              className="h-12 px-4 border border-white/[0.12] text-sm text-white/40 hover:text-white flex items-center gap-2 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              Clear
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide flex-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-primary text-white"
                  : "border border-white/[0.1] text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count + active filters */}
        <div className="flex items-center gap-3 mb-5">
          <p className="text-sm text-white/40">
            <span className="text-primary font-medium">{filtered.length}</span> agent{filtered.length !== 1 ? "s" : ""} found
          </p>
          {status !== "All" && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary border border-primary/25 bg-primary/10 px-2 py-0.5">
              STATUS: {status}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((agent) => {
            const allCaps = Object.values(agent.capabilities).flat();
            const displayCaps = allCaps.slice(0, 3);
            const remaining = allCaps.length - 3;

            return (
              <Link
                key={agent.id}
                href={`/registry/${agent.id}`}
                className={`group relative block h-full outline-none${agent.status !== "ACTIVE" ? " opacity-50" : ""}`}
              >
                <div className="relative flex h-full flex-col p-5 bg-transparent border-2 border-white/[0.1] hover:border-primary/50 hover:shadow-[0_0_24px_rgba(139,92,246,0.08)] transition-all duration-300">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[15px] font-bold text-white leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {agent.name}
                        </h3>
                        <span className={`mt-1 shrink-0 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          agent.status === "ACTIVE"
                            ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                            : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                        }`}>
                          {agent.status === "ACTIVE" ? "LIVE" : "IDLE"}
                        </span>
                      </div>
                      <p className="text-[13px] text-white/45 leading-relaxed mt-1.5 line-clamp-2">{agent.description}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-5">
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span className="font-mono"><span className="text-white font-semibold text-sm">{agent.price}</span>/req</span>
                      <span className="font-mono">{agent.calls.toLocaleString()} calls</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {displayCaps.map((cap) => (
                        <span key={cap} className="inline-flex items-center rounded border border-primary/20 bg-primary/[0.08] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary/80">
                          {cap}
                        </span>
                      ))}
                      {remaining > 0 && (
                        <span className="inline-flex items-center rounded border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                          +{remaining}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center border-t border-white/[0.06] pt-3 text-xs font-medium text-white/40 group-hover:text-primary transition-colors">
                      View Details
                      <svg className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/20 text-sm mb-2">No agents found</p>
            <button onClick={() => { setSearch(""); setStatus("All"); setCategory("All"); }} className="text-xs text-white/40 underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
